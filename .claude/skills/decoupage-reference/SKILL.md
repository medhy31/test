---
name: decoupage-reference
description: Découper une vidéo de référence (motion design) IMAGE PAR IMAGE avant toute copie ou adaptation « à refaire pour X » : planches de toutes les images, fiche objet par objet (d'où il vient, où il va, comment il change, ce qui le déclenche), table des événements numérotés. À charger dès que l'élève donne une vidéo à recopier, avant de proposer le plan.
---

# Découper une référence image par image

L'élève n'est pas développeur : tu lances tout toi-même et tu lui montres les planches.
Pourquoi : en regardant une référence au pas de 0,2 s ou sur quelques images clés, on rate des mouvements entiers (une
flèche qui quitte un bouton et devient le curseur, une carte qui se floute pendant que le fond passe au gris, un texte qui
défile, une main qui balaie…). Règle : **aucun plan proposé sans ce découpage**.

## 1. Extraire toutes les images
```bash
~/.claude/skills/decoupage-reference/scripts/planches.sh <video> <dossier> [w:h:x:y] [pas] [par_planche]
```
- Recadrer sur le rendu (enlever l'interface Instagram, les bandeaux « Final Render », le chronogramme).
- Garder la cadence d'origine (30 i/s pour un Reel). Pas = 1 pour les passages rapides, 2 au plus ailleurs.
- Lire TOUTES les planches (50 images chacune). Ne jamais conclure sur un échantillon.

## 2. Fiche objet par objet
Pour CHAQUE objet visible (carte, bouton, icône, texte, curseur/main, fond, flou, lumière), noter :
| Question | Exemple |
|---|---|
| Image d'entrée et d'où il vient (bord, intérieur d'un autre objet, flou, fondu) | la flèche sort de la pastille bleue (186) |
| Trajet (direction, courbe, vitesse : départ doux / pic / freinage) | monte, part en haut à droite, arc vers la gauche, redescend sous la pilule |
| Transformations (taille, rotation, flou, couleur, texte qui s'écrit ou défile) | la pilule rétrécit de ~15 % pendant le trajet |
| Ce qui le déclenche / ce qu'il déclenche | le clic (226-230) transforme la pilule en widget |
| Image de sortie et vers où (bord, fondu, se change en un autre objet) | devient le petit widget (232-238) |
Le fond aussi : couleur image par image (blanc → gris → noir en N images = transition, pas une coupe).

## 3. Table des événements
Une ligne par événement, numéro d'image de début et de fin, dans l'ordre. C'est elle qui devient le plan et la partition
des sons. Mesurer les tailles et positions (boîte englobante, luminance) avec ffmpeg / Python quand c'est utile.

## 4. Vérifier avant d'envoyer
- Relire les planches en cherchant ce que la table NE contient PAS (un objet qui bouge sans ligne = oubli).
- Pour la copie : animatique à côté de la référence, même cadence, et comparer image par image.

Voir aussi : le skill « Créer sa vidéo » de chaque cours.
