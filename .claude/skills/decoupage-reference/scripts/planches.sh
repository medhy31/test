#!/bin/bash
# Découpe une vidéo de référence en planches IMAGE PAR IMAGE (aucun saut de 0,2 s).
# Usage : planches.sh <video> <dossier_sortie> [recadrage ffmpeg "w:h:x:y"] [pas=1] [par_planche=50]
# Sortie : <dossier>/images/r_0001.png… (toutes les images, cadence d'origine) et <dossier>/planches/pXXXX-YYYY.jpg
# (10 colonnes, lecture gauche → droite puis haut → bas ; le nom donne la 1re et la dernière image, numérotées depuis 0).
set -e
V="$1"; O="$2"; C="${3:-}"; PAS="${4:-1}"; N="${5:-50}"
mkdir -p "$O/images" "$O/planches"
F="null"; [ -n "$C" ] && F="crop=$C"
# ffmpeg installé, sinon celui de Remotion (à lancer depuis le dossier du projet Remotion)
ff() { if command -v ffmpeg >/dev/null 2>&1; then ffmpeg "$@"; else npx --no-install remotion ffmpeg "$@"; fi; }
ff -v error -y -i "$V" -vf "$F" "$O/images/r_%04d.png"
TOTAL=$(ls "$O/images" | wc -l | tr -d ' ')
echo "images : $TOTAL"
i=0
while [ $i -lt $TOTAL ]; do
  fin=$(( i + PAS * (N - 1) )); [ $fin -ge $TOTAL ] && fin=$(( TOTAL - 1 ))
  T=$(mktemp -d); k=0
  for n in $(seq $i $PAS $fin); do cp "$O/images/r_$(printf %04d $((n+1))).png" "$T/t_$(printf %03d $k).png"; k=$((k+1)); done
  ff -v error -y -i "$T/t_%03d.png" -vf "scale=250:-1,tile=10x$(( (k + 9) / 10 ))" -frames:v 1 "$O/planches/p$(printf %04d $i)-$(printf %04d $fin).jpg"
  rm -rf "$T"; i=$(( fin + PAS ))
done
ls "$O/planches"
