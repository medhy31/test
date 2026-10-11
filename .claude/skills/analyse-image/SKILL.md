---
name: analyse-image
description: Analyser une vidéo IMAGE PAR IMAGE, en entier, comme si on la regardait en feuilletant les pages d'un livre - TOUTES les images, quelle que soit la durée (1 minute à 30 images par seconde = 1 800 images ; 30 secondes = 900). À utiliser dès que l'élève donne une vidéo à analyser, à recopier ou à refaire à la perfection, AVANT toute proposition. L'élève n'est pas développeur - tu fais tout, tu lui montres le résultat.
---

# Analyser une vidéo image par image

## La règle (non négociable)
Tu analyses **chaque image** de la vidéo. Jamais un échantillon, jamais « une image toutes les 0,2 s », jamais
« les images clés ». Nombre d'images = durée × cadence :
| Durée | 30 images par seconde | 60 images par seconde |
|---|---|---|
| 15 s | 450 | 900 |
| 30 s | 900 | 1 800 |
| 1 min | 1 800 | 3 600 |
Tu ne proposes **aucun plan, aucune copie, aucune conclusion** avant d'avoir lu toutes les planches. Si la vidéo est
longue, c'est long : c'est le prix d'une copie parfaite. Dis-le à l'élève et continue.

L'élève n'est pas développeur : tu lances tout toi-même, tu lui parles simplement et tu lui montres ce que tu vois.

## 1. Préparer la vidéo
- Demande à l'élève de mettre la vidéo dans son dossier de travail (s'il ne l'a pas déjà fait).
- **Enregistrement d'écran d'un Reel ou d'un TikTok** : la vidéo d'origine tourne en **30 images par seconde** même si
  l'enregistrement est en 60 (chaque image apparaît deux fois). Lis-la à 30. Recadre pour ne garder que la vidéo
  (enlève l'interface de l'appli : barre du haut, boutons, légende) : repère le cadre sur une image, puis passe le
  recadrage `largeur:hauteur:x:y`.
- Une vidéo rendue (MP4 exporté) : garde sa cadence d'origine.

## 2. Feuilleter : toutes les images
```bash
~/.claude/skills/analyse-image/scripts/feuilleter.sh <video> analyse/<nom> [cadence] [recadrage]
```
Le script extrait **toutes** les images (`images/`), les range en **planches de 60** (2 s à 30 i/s, lecture de gauche à
droite puis de haut en bas : `planches/`), fait **une pelure d'oignon par seconde** (`oignon/` : toutes les images de la
seconde superposées, les plus récentes plus visibles) et écrit la **liste de lecture** `lecture.md`.
Vérifie que le nombre d'images annoncé = durée × cadence. Si ce n'est pas le cas, cherche pourquoi avant de continuer.

## 3. Lire comme un film
Pour **chaque** planche, dans l'ordre, sans en sauter une :
1. Ouvre la planche et lis-la comme les pages d'un livre qu'on fait défiler vite : qu'est-ce qui bouge, d'où à où ?
2. Ouvre la pelure d'oignon des secondes concernées : trajets (traînées), vitesse (traînée longue = rapide, image
   nette = arrêt), mouvements de caméra (tout glisse ensemble = c'est la caméra qui bouge).
3. Coche la planche dans `lecture.md` et écris dessous, avec les numéros d'image :
   - les **objets** (texte, mot, lettre, carte, image, icône, forme, fond) : d'où ils arrivent, leur trajet, comment ils
     changent (taille, rotation, flou, couleur), où et comment ils sortent ;
   - la **caméra** : poussée, recul, glissement, rotation, secousse, ou immobile ;
   - les **transitions** entre deux scènes (coupe, fondu, volet, flou, zoom) et leur durée en images ;
   - le **rythme** : sur quelle image tombe chaque événement fort.
Quand une planche va trop vite pour comprendre, agrandis le passage : ouvre les images une par une dans `images/`.

## 4. La table des événements
Une fois **toutes** les planches cochées : une ligne par événement, dans l'ordre, avec l'image de début et l'image de
fin, l'objet, ce qui se passe, la courbe (départ doux, freinage, rebond). C'est le plan exact de la vidéo à refaire.
Montre à l'élève un résumé simple (5 à 10 phrases) avant de te lancer.

## 5. Refaire et comparer, image par image
Après avoir fabriqué la copie, compare-la à la référence, côte à côte, à la même cadence :
```bash
~/.claude/skills/analyse-image/scripts/comparer.sh <reference> <copie> analyse/<nom>-comparaison [cadence]
```
Lis **toutes** les planches de comparaison (référence à gauche, copie à droite) et corrige chaque écart (position,
moment, vitesse, taille, couleur). Recommence jusqu'à ce que les deux se superposent.

## Outils
- `feuilleter.sh` et `comparer.sh` utilisent ffmpeg ; s'il n'est pas installé, ils prennent celui de Remotion (les lancer
  depuis le dossier du projet Remotion).
- Une minute de vidéo = environ 1 800 images ≈ 150 Mo dans `analyse/` : supprime ce dossier quand la vidéo est finie
  (demande d'abord à l'élève).
