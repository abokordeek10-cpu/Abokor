# Trend-Scout (n8n)

Jeden Morgen um 6:00 sucht Claude im Internet nach neuen GTA-6-Themen (Reddit, YouTube, TikTok, X, Rockstar) und schreibt das **Morgen-Briefing** nach dem Skill `gta6-trend-recherche`. Das Briefing steht auf einer eigenen Seite, die du im Browser öffnest.

## Einrichten
1. In n8n: oben links **+** → Workflow → drei Punkte **…** → **Import from File** → `trend-scout-workflow.json`.
2. Prüfen, dass bei „Claude recherchiert“ und „Claude macht weiter“ der Zugang **Anthropic API** ausgewählt ist (gibt es schon von der Abora-Demo).
3. **Speichern** und oben rechts **Publish** (aktivieren).
4. Die Briefing-Seite: doppelt auf den Knoten **„Briefing-Seite“** klicken → **Production URL** kopieren und als Lesezeichen speichern.

**Hinweis:** Das Briefing wird nur bei einem **aktiven** Workflow gespeichert (n8n speichert die Daten bei Testläufen nicht). Das erste Briefing kommt also morgen um 6:00. Wenn du es heute schon sehen willst: im Editor auf **„Jetzt starten“** klicken und das Ergebnis im letzten Knoten ansehen.

**Kosten:** ein Briefing mit bis zu 15 Websuchen grob 0,20–1,00 € (Schätzung; Websuche kostet extra pro Suche). Ausgabenlimit in der Claude Console setzen.
