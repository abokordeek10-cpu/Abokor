#!/usr/bin/env python3
"""
Clip-Agent: macht aus einer Stream-Aufnahme fertige Hochkant-Clips (9:16) mit Untertiteln.

  python clipper.py aufnahme.mkv
  python clipper.py aufnahme.mkv --anzahl 10 --transkription elevenlabs
  python clipper.py aufnahme.mkv --ohne-ki            (ohne Claude, nur nach Lautstärke)

Ablauf:
  1. Ton herausziehen
  2. Laute Momente finden (Lachen, Schreien, Jubel)
  3. Gesprochenes in Text umwandeln (Whisper lokal, kostenlos, oder ElevenLabs)
  4. Claude sucht die besten Momente aus (Regeln aus dem Skill hook-und-clip-regeln)
  5. Jeder Moment wird zweimal geschnitten: TikTok-Version (über 60 s) und Kurz-Version (30–60 s)
  6. freigabe.html: alle Clips mit Titel, Bildunterschrift und Hashtags zum Freigeben

Schlüssel kommen nur aus Umgebungsvariablen: ANTHROPIC_API_KEY, ELEVENLABS_API_KEY.
"""
import argparse, json, math, os, re, shutil, subprocess, sys, html
from pathlib import Path

HIER = Path(__file__).resolve().parent
MODELL = "claude-opus-5-5"


# ───────────────────────── Hilfen ─────────────────────────
def lauf(cmd, **kw):
    r = subprocess.run(cmd, capture_output=True, text=True, **kw)
    if r.returncode != 0:
        raise SystemExit(f"Fehler bei: {' '.join(map(str, cmd))}\n{r.stderr[-2000:]}")
    return r


def zeit(s):
    s = max(0, int(round(s)))
    return f"{s // 3600:02d}:{s % 3600 // 60:02d}:{s % 60:02d}"


def sekunden(t):
    if isinstance(t, (int, float)):
        return float(t)
    teile = [float(x) for x in str(t).strip().split(":")]
    while len(teile) < 3:
        teile.insert(0, 0)
    return teile[0] * 3600 + teile[1] * 60 + teile[2]


def dauer(video):
    r = lauf(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "json", str(video)])
    return float(json.loads(r.stdout)["format"]["duration"])


# ───────────────────────── 1+2: Ton und laute Momente ─────────────────────────
def ton_ausziehen(video, ziel):
    lauf(["ffmpeg", "-y", "-v", "error", "-i", str(video), "-vn", "-ac", "1", "-ar", "16000", str(ziel)])


def lautstaerke_pro_sekunde(wav):
    """RMS-Lautstärke (dB) pro Sekunde."""
    r = subprocess.run(
        ["ffmpeg", "-v", "error", "-i", str(wav), "-af",
         "asetnsamples=16000,astats=metadata=1:reset=1,ametadata=print:key=lavfi.astats.Overall.RMS_level:file=-",
         "-f", "null", "-"], capture_output=True, text=True)
    werte = []
    for zeile in r.stdout.splitlines():
        if "RMS_level=" in zeile:
            v = zeile.split("=", 1)[1]
            werte.append(-90.0 if v in ("-inf", "inf", "nan") else float(v))
    return werte


def laute_momente(db, anzahl=30, abstand=20):
    """Sekunden mit deutlich höherer Lautstärke als üblich (geglättet über 3 s)."""
    if not db:
        return []
    glatt = [sum(db[max(0, i - 1):i + 2]) / len(db[max(0, i - 1):i + 2]) for i in range(len(db))]
    mittel = sum(glatt) / len(glatt)
    streu = math.sqrt(sum((x - mittel) ** 2 for x in glatt) / len(glatt)) or 1.0
    kandidaten = sorted(((x - mittel) / streu, i) for i, x in enumerate(glatt))[::-1]
    gewaehlt = []
    for z, i in kandidaten:
        if z < 1.0 or len(gewaehlt) >= anzahl:
            break
        if all(abs(i - j) >= abstand for _, j in gewaehlt):
            gewaehlt.append((round(z, 2), i))
    return sorted(gewaehlt, key=lambda x: x[1])


def chat_spitzen(chat_datei, anzahl=20, fenster=30):
    """Optional: CSV/Text mit einem Zeitstempel pro Chat-Nachricht (Sekunden oder hh:mm:ss in Spalte 1)."""
    if not chat_datei:
        return []
    zeiten = []
    for zeile in Path(chat_datei).read_text(encoding="utf-8", errors="ignore").splitlines():
        feld = re.split(r"[;,\t]", zeile.strip())[0] if zeile.strip() else ""
        try:
            zeiten.append(sekunden(feld))
        except ValueError:
            continue
    if not zeiten:
        return []
    eimer = {}
    for t in zeiten:
        eimer[int(t // fenster)] = eimer.get(int(t // fenster), 0) + 1
    beste = sorted(eimer.items(), key=lambda x: -x[1])[:anzahl]
    return sorted((k * fenster, n) for k, n in beste)


# ───────────────────────── 3: Transkription ─────────────────────────
def transkribieren(wav, art, modell, sprache):
    """Gibt Wörter zurück: [{"w": "Hallo", "s": 1.2, "e": 1.5}]"""
    if art == "keine":
        return []
    if art == "elevenlabs":
        import requests
        schluessel = os.environ.get("ELEVENLABS_API_KEY")
        if not schluessel:
            raise SystemExit("ELEVENLABS_API_KEY fehlt (Umgebungsvariable).")
        with open(wav, "rb") as f:
            r = requests.post("https://api.elevenlabs.io/v1/speech-to-text",
                              headers={"xi-api-key": schluessel},
                              data={"model_id": "scribe_v2", "language_code": sprache, "tag_audio_events": "true"},
                              files={"file": ("audio.wav", f, "audio/wav")}, timeout=3600)
        if r.status_code != 200:
            raise SystemExit(f"ElevenLabs-Fehler {r.status_code}: {r.text[:500]}")
        woerter = []
        for w in r.json().get("words", []):
            if w.get("type") == "word":
                woerter.append({"w": w["text"].strip(), "s": float(w["start"]), "e": float(w["end"])})
            elif w.get("type") == "audio_event":
                woerter.append({"w": w["text"].strip(), "s": float(w["start"]), "e": float(w["end"]), "ereignis": True})
        return woerter
    # Standard: Whisper lokal (kostenlos). GPU wird genutzt, wenn vorhanden.
    try:
        from faster_whisper import WhisperModel
    except ImportError:
        raise SystemExit("faster-whisper fehlt: pip install faster-whisper   (oder --transkription elevenlabs)")
    try:
        m = WhisperModel(modell, device="cuda", compute_type="int8_float16")
    except Exception:
        m = WhisperModel(modell, device="cpu", compute_type="int8")
    segmente, _ = m.transcribe(str(wav), language=sprache, word_timestamps=True, vad_filter=True)
    woerter = []
    for seg in segmente:
        for w in seg.words or []:
            woerter.append({"w": w.word.strip(), "s": float(w.start), "e": float(w.end)})
        print(f"  … transkribiert bis {zeit(seg.end)}", end="\r")
    print()
    return woerter


def transkript_zeilen(woerter, pause=1.2, max_woerter=25):
    """Wörter zu Zeilen mit Zeitstempel zusammenfassen (für Claude)."""
    zeilen, aktuell = [], []
    for w in woerter:
        if aktuell and (w["s"] - aktuell[-1]["e"] > pause or len(aktuell) >= max_woerter):
            zeilen.append(aktuell)
            aktuell = []
        aktuell.append(w)
    if aktuell:
        zeilen.append(aktuell)
    return [f"[{zeit(z[0]['s'])}] " + " ".join(("(" + w["w"] + ")") if w.get("ereignis") else w["w"] for w in z)
            for z in zeilen]


# ───────────────────────── 4: Auswahl ─────────────────────────
SCHEMA = {
    "type": "object", "additionalProperties": False, "required": ["clips"],
    "properties": {"clips": {"type": "array", "items": {
        "type": "object", "additionalProperties": False,
        "required": ["lang_start", "lang_ende", "kurz_start", "kurz_ende", "titel", "hook_text",
                     "bildunterschrift", "hashtags", "warum", "bewertung", "spoiler"],
        "properties": {
            "lang_start": {"type": "string", "description": "hh:mm:ss, TikTok-Version 61-90 s"},
            "lang_ende": {"type": "string"},
            "kurz_start": {"type": "string", "description": "hh:mm:ss, Shorts/Reels-Version 30-60 s"},
            "kurz_ende": {"type": "string"},
            "titel": {"type": "string"},
            "hook_text": {"type": "string", "description": "max. 6 Wörter fürs Bild"},
            "bildunterschrift": {"type": "string"},
            "hashtags": {"type": "array", "items": {"type": "string"}},
            "warum": {"type": "string"},
            "bewertung": {"type": "integer", "description": "1 sehr stark, 2 gut, 3 okay"},
            "spoiler": {"type": "boolean"}}}}}}


def auswahl_mit_claude(laenge, laut, chat, zeilen, anzahl):
    try:
        import anthropic
    except ImportError:
        raise SystemExit("Paket anthropic fehlt: pip install anthropic   (oder --ohne-ki)")
    if not os.environ.get("ANTHROPIC_API_KEY"):
        raise SystemExit("ANTHROPIC_API_KEY fehlt (Umgebungsvariable), oder mit --ohne-ki starten.")
    regeln = (HIER.parent / "skills/eigene/hook-und-clip-regeln/SKILL.md").read_text(encoding="utf-8")
    system = (
        "Du bist der Clip-Agent eines deutschen GTA-6-Gaming-Streams (zwei Brüder: einer spielt, einer kommentiert). "
        "Du bekommst das Transkript mit Zeitstempeln, laute Momente (Lachen, Schreien, Jubel) und optional Chat-Spitzen. "
        f"Wähle die besten {anzahl} Momente für Kurzvideos. Halte dich streng an diese Regeln:\n\n{regeln}\n\n"
        "Zusätzlich: Jede TikTok-Version (lang) dauert 61 bis 90 Sekunden, jede Kurz-Version 30 bis 60 Sekunden und liegt "
        "innerhalb oder nahe der langen. Beginne 2 bis 3 Sekunden vor dem Höhepunkt-Anlauf, nicht mitten im Satz. "
        "Erfinde nichts, was nicht im Transkript steht. Markiere Story-Spoiler mit spoiler=true. Sortiere nach Bewertung.")
    nutzer = (
        f"Länge der Aufnahme: {zeit(laenge)}\n\n"
        "LAUTE MOMENTE (Zeit, Stärke):\n" + "\n".join(f"{zeit(i)} ({z})" for z, i in laut) + "\n\n" +
        ("CHAT-SPITZEN (Zeit, Nachrichten in 30 s):\n" + "\n".join(f"{zeit(t)} ({n})" for t, n in chat) + "\n\n" if chat else "") +
        "TRANSKRIPT:\n" + ("\n".join(zeilen) if zeilen else "(kein Transkript)"))
    client = anthropic.Anthropic()
    antwort = client.beta.messages.create(
        model=MODELL, max_tokens=16000,
        betas=["server-side-fallback-2026-07-01"], fallbacks="default",
        output_config={"effort": "medium", "format": {"type": "json_schema", "schema": SCHEMA}},
        system=system, messages=[{"role": "user", "content": nutzer}])
    if antwort.stop_reason == "refusal":
        raise SystemExit("Claude hat die Auswahl abgelehnt. Mit --ohne-ki erneut starten.")
    text = next(b.text for b in antwort.content if b.type == "text")
    return json.loads(text)["clips"]


def auswahl_ohne_ki(laenge, laut, chat, anzahl):
    """Einfach: die lautesten Momente (plus Chat-Spitzen), je ein Fenster drumherum."""
    punkte = [(z, i) for z, i in laut] + [(n / 10, t + 15) for t, n in chat]
    punkte.sort(reverse=True)
    clips, belegt = [], []
    for staerke, t in punkte:
        if len(clips) >= anzahl:
            break
        if any(abs(t - b) < 60 for b in belegt):
            continue
        belegt.append(t)
        ls, le = max(0, t - 35), min(laenge, t - 35 + 65)
        ks, ke = max(0, t - 15), min(laenge, t + 25)
        clips.append({"lang_start": zeit(ls), "lang_ende": zeit(le), "kurz_start": zeit(ks), "kurz_ende": zeit(ke),
                      "titel": f"Moment bei {zeit(t)}", "hook_text": "Das musst du sehen 😂",
                      "bildunterschrift": "Was hättest du gemacht? 👇", "hashtags": ["#gta6", "#gta6deutsch", "#gaming"],
                      "warum": f"lautester Moment (Stärke {staerke})", "bewertung": 2, "spoiler": False})
    return clips


# ───────────────────────── 5: Schneiden ─────────────────────────
def ass_zeit(s):
    s = max(0.0, s)
    return f"{int(s // 3600)}:{int(s % 3600 // 60):02d}:{s % 60:05.2f}"


def ass_text(t):
    return t.replace("\\", "").replace("{", "(").replace("}", ")").replace("\n", " ")


def untertitel_schreiben(datei, woerter, start, ende, hook):
    kopf = """[Script Info]
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Hook,Arial,78,&H00FFFFFF,&H00FFFFFF,&H00000000,&H64000000,1,0,0,0,100,100,0,0,1,6,2,8,60,60,230,1
Style: Text,Arial,74,&H00FFFFFF,&H0000C8FF,&H00000000,&H64000000,1,0,0,0,100,100,0,0,1,5,2,2,60,60,560,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""
    zeilen = [f"Dialogue: 1,{ass_zeit(0)},{ass_zeit(min(4.0, ende - start))},Hook,,0,0,0,,{ass_text(hook.upper())}"]
    im_clip = [w for w in woerter if w["s"] >= start and w["e"] <= ende and not w.get("ereignis")]
    gruppe = []
    for w in im_clip + [None]:
        if w is not None and (not gruppe or (len(gruppe) < 4 and w["s"] - gruppe[-1]["e"] < 0.6)):
            gruppe.append(w)
            continue
        if gruppe:
            s, e = gruppe[0]["s"] - start, gruppe[-1]["e"] - start + 0.15
            zeilen.append(f"Dialogue: 0,{ass_zeit(s)},{ass_zeit(e)},Text,,0,0,0,,{ass_text(' '.join(x['w'] for x in gruppe))}")
        gruppe = [w] if w is not None else []
    Path(datei).write_text(kopf + "\n".join(zeilen) + "\n", encoding="utf-8")


def schneiden(video, start, ende, ziel, woerter, hook, gpu):
    ordner = Path(ziel).parent
    ass = ziel.with_suffix(".ass")
    untertitel_schreiben(ass, woerter, start, ende, hook)
    bild = ("[0:v]split=2[a][b];"
            "[a]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,boxblur=24:2,eq=brightness=-0.12[hg];"
            "[b]scale=1080:-2[vg];"
            "[hg][vg]overlay=(W-w)/2:(H-h)/2,"
            f"subtitles={ass.name}[v]")
    enc = ["-c:v", "h264_nvenc", "-preset", "p5", "-cq", "21"] if gpu else ["-c:v", "libx264", "-preset", "veryfast", "-crf", "20"]
    lauf(["ffmpeg", "-y", "-v", "error", "-ss", f"{start:.2f}", "-t", f"{ende - start:.2f}", "-i", str(Path(video).resolve()),
          "-filter_complex", bild, "-map", "[v]", "-map", "0:a:0?", *enc, "-pix_fmt", "yuv420p", "-r", "30",
          "-af", "loudnorm=I=-14:TP=-1.5:LRA=11", "-c:a", "aac", "-b:a", "160k", "-movflags", "+faststart", ziel.name],
         cwd=ordner)
    ass.unlink(missing_ok=True)


# ───────────────────────── 6: Freigabe-Seite ─────────────────────────
def freigabe_seite(ordner, clips, quelle):
    karten = []
    for c in clips:
        e = lambda k: html.escape(str(c.get(k, "")))
        karten.append(f"""
<article><h2>#{c['nr']} · {e('titel')} <small>Bewertung {e('bewertung')}{' · ⚠️ SPOILER' if c.get('spoiler') else ''}</small></h2>
<div class="videos"><figure><video controls preload="metadata" src="{c['datei_lang']}"></video><figcaption>TikTok ({c['lang_s']} s)</figcaption></figure>
<figure><video controls preload="metadata" src="{c['datei_kurz']}"></video><figcaption>Shorts/Reels ({c['kurz_s']} s)</figcaption></figure></div>
<p><b>Hook im Bild:</b> {e('hook_text')}<br><b>Warum:</b> {e('warum')}<br><b>Stelle im Stream:</b> {e('lang_start')}–{e('lang_ende')}</p>
<p class="text">{e('bildunterschrift')}<br>{html.escape(' '.join(c.get('hashtags', [])))}</p></article>""")
    (Path(ordner) / "freigabe.html").write_text(f"""<!doctype html><html lang="de"><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>Freigabe Clips</title>
<style>body{{font-family:system-ui,sans-serif;background:#111;color:#eee;max-width:1100px;margin:auto;padding:16px}}
article{{background:#1c1c1c;border-radius:12px;padding:16px;margin:16px 0}}h2 small{{color:#aaa;font-weight:400;font-size:.8em}}
.videos{{display:flex;gap:12px;flex-wrap:wrap}}figure{{margin:0}}video{{height:480px;max-width:100%;border-radius:8px;background:#000}}
.text{{background:#000;padding:10px;border-radius:8px;white-space:pre-wrap}}</style>
<h1>Clips zur Freigabe</h1><p>Quelle: {html.escape(str(quelle))}. Nichts wird automatisch gepostet. Gute Clips selbst hochladen, Text kopieren.</p>
{''.join(karten)}</html>""", encoding="utf-8")


# ───────────────────────── Ablauf ─────────────────────────
def main():
    ap = argparse.ArgumentParser(description="Clip-Agent für den GTA-6-Stream")
    ap.add_argument("video")
    ap.add_argument("--aus", help="Ausgabeordner (Standard: clips_<Dateiname>)")
    ap.add_argument("--anzahl", type=int, default=8)
    ap.add_argument("--transkription", choices=["whisper", "elevenlabs", "keine"], default="whisper")
    ap.add_argument("--whisper-modell", default="small")
    ap.add_argument("--sprache", default="de")
    ap.add_argument("--chat", help="optional: Chat-Log mit Zeitstempel pro Nachricht")
    ap.add_argument("--ohne-ki", action="store_true", help="ohne Claude, nur laute Momente")
    ap.add_argument("--gpu", action="store_true", help="mit NVIDIA-Grafikkarte schneiden (NVENC)")
    a = ap.parse_args()

    for prog in ("ffmpeg", "ffprobe"):
        if not shutil.which(prog):
            raise SystemExit(f"{prog} fehlt. Windows: winget install Gyan.FFmpeg  ·  Linux: sudo apt-get install -y ffmpeg")
    video = Path(a.video)
    if not video.exists():
        raise SystemExit(f"Datei nicht gefunden: {video}")
    ordner = Path(a.aus or f"clips_{video.stem}")
    ordner.mkdir(parents=True, exist_ok=True)

    laenge = dauer(video)
    print(f"1/5 Ton herausziehen ({zeit(laenge)}) …")
    wav = ordner / "ton.wav"
    ton_ausziehen(video, wav)
    print("2/5 Laute Momente suchen …")
    laut = laute_momente(lautstaerke_pro_sekunde(wav))
    chat = chat_spitzen(a.chat)
    print(f"    {len(laut)} laute Momente, {len(chat)} Chat-Spitzen")
    print(f"3/5 Transkription ({a.transkription}) …")
    woerter = transkribieren(wav, a.transkription, a.whisper_modell, a.sprache)
    zeilen = transkript_zeilen(woerter)
    (ordner / "transkript.txt").write_text("\n".join(zeilen), encoding="utf-8")
    print(f"    {len(woerter)} Wörter")
    print("4/5 Beste Momente auswählen …")
    clips = auswahl_ohne_ki(laenge, laut, chat, a.anzahl) if a.ohne_ki else auswahl_mit_claude(laenge, laut, chat, zeilen, a.anzahl)
    print(f"5/5 {len(clips)} Clips schneiden …")
    fertig = []
    for nr, c in enumerate(clips, 1):
        try:
            ls, le = sekunden(c["lang_start"]), sekunden(c["lang_ende"])
            ks, ke = sekunden(c["kurz_start"]), sekunden(c["kurz_ende"])
        except (ValueError, KeyError):
            print(f"    Clip {nr}: ungültige Zeiten, übersprungen")
            continue
        le, ke = min(le, laenge), min(ke, laenge)
        if le - ls < 10 or ke - ks < 10:
            print(f"    Clip {nr}: zu kurz, übersprungen")
            continue
        c["nr"] = nr
        c["datei_lang"], c["datei_kurz"] = f"clip{nr:02d}_tiktok.mp4", f"clip{nr:02d}_kurz.mp4"
        c["lang_s"], c["kurz_s"] = round(le - ls), round(ke - ks)
        print(f"    Clip {nr}: {c['titel']} ({c['lang_s']} s / {c['kurz_s']} s)")
        schneiden(video, ls, le, ordner / c["datei_lang"], woerter, c["hook_text"], a.gpu)
        schneiden(video, ks, ke, ordner / c["datei_kurz"], woerter, c["hook_text"], a.gpu)
        fertig.append(c)
    (ordner / "clips.json").write_text(json.dumps(fertig, ensure_ascii=False, indent=2), encoding="utf-8")
    freigabe_seite(ordner, fertig, video.name)
    wav.unlink(missing_ok=True)
    print(f"\nFertig: {len(fertig)} Clips in {ordner}/  →  freigabe.html öffnen")


if __name__ == "__main__":
    main()
