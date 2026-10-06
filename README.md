# Sakura

Rundentimer mit automatischen Paarungen für BJJ- und Box-Training.
Läuft als installierbare Web-App (PWA) auf iPhone und Android, auch offline.

## Inhalt des Ordners

| Datei / Ordner | Wofür |
|---|---|
| `index.html` | Die komplette App |
| `manifest.webmanifest` | Name, Farben und Icons für die Installation |
| `sw.js` | Service Worker: speichert die App auf dem Handy, damit sie offline läuft |
| `icons/` | App-Icons (mit 桜) in allen Größen |
| `splash/` | Startbildschirme für die gängigen iPhone-Größen |
| `fonts/` | Schriften lokal eingebunden (Lizenzen liegen bei) |
| `.nojekyll` | Sagt GitHub Pages, dass die Dateien unverändert ausgeliefert werden sollen |

## 1. Auf GitHub Pages veröffentlichen

1. Bei [github.com](https://github.com) einloggen (oder kostenloses Konto anlegen).
2. Oben rechts **+ → New repository**.
   - Name: z. B. `sakura`
   - Sichtbarkeit: **Public** (GitHub Pages ist im kostenlosen Konto nur für öffentliche Repositories verfügbar)
   - **Create repository**
3. Im neuen Repository auf **uploading an existing file** klicken.
4. Den **Inhalt** dieses Ordners hineinziehen (nicht den Ordner selbst, sondern `index.html`, `sw.js`, die Unterordner usw.).
   - Hinweis: Die Datei `.nojekyll` ist versteckt. Falls sie beim Hochladen fehlt, ist das kein Problem.
5. Unten **Commit changes**.
6. **Settings → Pages**:
   - Source: **Deploy from a branch**
   - Branch: **main**, Ordner **/ (root)** → **Save**
7. Nach 1–2 Minuten steht oben auf derselben Seite die Adresse, z. B.
   `https://DEIN-NAME.github.io/sakura/`

## 2. Auf dem Handy installieren

**iPhone (Safari):**
1. Adresse in **Safari** öffnen (nicht in Chrome, sonst lässt sie sich nicht installieren).
2. Teilen-Symbol → **Zum Home-Bildschirm** → **Hinzufügen**.
3. Ab jetzt Sakura über das Icon öffnen, nicht über den Browser.

**Android (Chrome):**
1. Adresse in **Chrome** öffnen.
2. Menü (drei Punkte) → **App installieren** bzw. **Zum Startbildschirm hinzufügen**.

Nach dem ersten Öffnen funktioniert die App auch **ohne Internet**.

## 3. Vor dem ersten Training (Probelauf)

- Rundenzeit 0:30, Pause 0:15, drei Namen, Training starten.
- Prüfen: Glocke, 3-2-1-Piepen, Ansage der Paarungen in der Pause.
- iPhone: einmal mit Stummschalter auf lautlos testen.
- **Automatische Sperre** in den Handy-Einstellungen fürs Training auf **„Nie“** stellen.
  Bei ausgeschaltetem Display spielen Web-Apps auf dem iPhone keinen Ton ab.

## 4. Updates einspielen

1. Geänderte Dateien im Repository hochladen (gleiche Namen ersetzen die alten).
2. **Wichtig:** In `sw.js` die Versionsnummer erhöhen, z. B. `sakura-v1` → `sakura-v2`.
   Sonst behalten die Handys die alte, gespeicherte Version.
3. Auf dem Handy die App einmal öffnen, schließen und wieder öffnen. Dann ist das Update aktiv.

## Gut zu wissen

- **Die Namen bleiben auf dem Handy.** Die Adresse ist öffentlich, die Mitgliederliste aber nicht. Jedes Gerät hat seine eigene Liste.
- **Glockenton:** Falls die App später veröffentlicht oder verkauft wird, die Lizenz des Tons auf der Quellseite prüfen.
- **App Store später:** Diese Code-Basis lässt sich mit Capacitor als native App verpacken.
