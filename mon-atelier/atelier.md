# Mon atelier de motion design

## Avancement
- [x] Étape 1 · Skills rangés : installer-atelier, analyse-image, decoupage-reference, fal-ai
      (dans ~/.claude/skills/ et, en copie, dans .claude/skills/ du dépôt)
- [x] Étape 2 · Node.js : v22.22.0 déjà présent, rien à installer
- [x] Étape 3 · Projet Remotion `mon-atelier` (modèle Blank, TypeScript, Remotion 4.0.534), `npm install` fait,
      composition `MyComp` réglée à 60 images par seconde (1280×720, 120 images = 2 s)
- [x] Étape 4 · Test final : studio démarré, image fixe rendue (`out/test.png`)

## Bon à savoir
- Installation faite dans une session cloud (Linux) : le réseau y bloque le téléchargement du navigateur de Remotion,
  on utilise donc le Chromium déjà présent (`--browser-executable=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell`).
  Sur ton Mac ou ton PC, Remotion le télécharge tout seul : cette option n'y sert à rien.
- ffmpeg : celui de Remotion (`npx remotion ffmpeg`, `npx remotion ffprobe`), pas d'installation à part.
- Python : pas installé, seulement quand un cours le demandera.
