#!/bin/bash
# Feuilleter une vidéo IMAGE PAR IMAGE, comme les pages d'un livre qu'on fait défiler : TOUTES les images, aucune sautée.
# Usage : feuilleter.sh <video> <dossier_sortie> [images_par_seconde] [recadrage w:h:x:y]
#   images_par_seconde : défaut = la cadence de la vidéo ; 30 pour un Reel / TikTok enregistré à l'écran
#   recadrage : pour garder seulement la vidéo dans un enregistrement d'écran (enlever l'interface de l'appli)
# Sortie :
#   <dossier>/images/i_00001.jpg…   toutes les images (durée × cadence : 1 min à 30 i/s = 1 800 images)
#   <dossier>/planches/p_00001-00060.jpg   60 images par planche (2 s à 30 i/s), 10 colonnes, lecture gauche → droite
#                                           puis haut → bas ; le nom donne la 1re et la dernière image
#   <dossier>/oignon/s_0001.jpg     une « pelure d'oignon » par seconde : toutes les images de la seconde superposées
#                                   (les plus récentes plus visibles) → trajets, vitesses et arrêts d'un coup d'œil
#   <dossier>/lecture.md            la liste de lecture : une case par planche, à cocher au fur et à mesure
set -e
V="$1"; O="$2"; FPS="$3"; CROP="$4"
[ -f "$V" ] || { echo "Vidéo introuvable : $V"; exit 1; }
# ffmpeg installé, sinon celui de Remotion (lancer depuis le dossier du projet Remotion)
ff() { if command -v ffmpeg >/dev/null 2>&1; then ffmpeg "$@"; else npx --no-install remotion ffmpeg "$@"; fi; }
fp() { if command -v ffprobe >/dev/null 2>&1; then ffprobe "$@"; else npx --no-install remotion ffprobe "$@"; fi; }
DUREE=$(fp -v error -show_entries format=duration -of default=nw=1:nk=1 "$V")
SOURCE=$(fp -v error -select_streams v:0 -show_entries stream=avg_frame_rate -of default=nw=1:nk=1 "$V")
SOURCE=$(awk -F/ '{ if ($2 > 0) printf "%.3f", $1 / $2; else print $1 }' <<< "$SOURCE")
[ -z "$FPS" ] && FPS=$(awk '{ printf "%d", $1 + 0.5 }' <<< "$SOURCE")
ATTENDU=$(awk -v d="$DUREE" -v f="$FPS" 'BEGIN { printf "%d", d * f + 0.5 }')
rm -rf "$O/images" "$O/planches" "$O/oignon"; mkdir -p "$O/images" "$O/planches" "$O/oignon"
F="fps=$FPS"; [ -n "$CROP" ] && F="$F,crop=$CROP"
ff -v error -y -i "$V" -vf "$F" -q:v 2 "$O/images/i_%05d.jpg"
TOTAL=$(ls "$O/images" | wc -l | tr -d ' ')
echo "durée $(printf '%.2f' "$DUREE") s · cadence de la vidéo $SOURCE i/s · lecture à $FPS i/s · $TOTAL images (attendu ≈ $ATTENDU)"
# planches de 60 images
N=60; i=1; LISTE=""
while [ $i -le $TOTAL ]; do
  fin=$(( i + N - 1 )); [ $fin -gt $TOTAL ] && fin=$TOTAL
  nom="p_$(printf %05d $i)-$(printf %05d $fin).jpg"
  ff -v error -y -start_number $i -i "$O/images/i_%05d.jpg" -frames:v $(( fin - i + 1 )) \
    -vf "scale=240:-2,tile=10x$(( (fin - i + 10) / 10 )):padding=4:color=black" -frames:v 1 -q:v 3 "$O/planches/$nom"
  LISTE="$LISTE- [ ] $nom · images $i à $fin · $(awk -v a=$i -v b=$fin -v f=$FPS 'BEGIN { printf "%.2f-%.2f s", (a - 1) / f, b / f }')
"
  i=$(( fin + 1 ))
done
# une pelure d'oignon par seconde (moyenne pondérée des images de la seconde)
P=""; for k in $(seq 1 $FPS); do P="$P $k"; done
ff -v error -y -framerate $FPS -i "$O/images/i_%05d.jpg" -vf "tmix=frames=$FPS:weights='$P',select='not(mod(n+1\,$FPS))',scale=540:-2" -fps_mode vfr -q:v 3 "$O/oignon/s_%04d.jpg"
NP=$(ls "$O/planches" | wc -l | tr -d ' ')
cat > "$O/lecture.md" <<FIN
# Lecture de $(basename "$V")
$TOTAL images à $FPS i/s, $NP planches de 60 images, $(ls "$O/oignon" | wc -l | tr -d ' ') pelures d'oignon (une par seconde).
Règle : TOUTES les planches sont lues, dans l'ordre, avant la moindre conclusion. Coche chaque planche une fois lue et
écris dessous ce qui s'y passe (objets, mouvements de caméra, transitions, numéros d'image).

$LISTE
FIN
echo "$NP planches à lire → $O/lecture.md"
