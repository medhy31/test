#!/bin/bash
# Comparer la référence et ta copie IMAGE PAR IMAGE, côte à côte (référence à gauche, copie à droite), même cadence.
# Usage : comparer.sh <reference> <copie> <dossier_sortie> [images_par_seconde=30]
# Sortie : <dossier>/c_00001-00030.jpg… : 30 paires par planche (1 s à 30 i/s), 6 colonnes de paires.
set -e
R="$1"; C="$2"; O="$3"; FPS="${4:-30}"
ff() { if command -v ffmpeg >/dev/null 2>&1; then ffmpeg "$@"; else npx --no-install remotion ffmpeg "$@"; fi; }
rm -rf "$O"; mkdir -p "$O/paires"
ff -v error -y -i "$R" -i "$C" -filter_complex "[0:v]fps=$FPS,scale=-2:400[a];[1:v]fps=$FPS,scale=-2:400[b];[a][b]hstack=shortest=1" "$O/paires/x_%05d.png"
TOTAL=$(ls "$O/paires" | wc -l | tr -d ' '); i=1
while [ $i -le $TOTAL ]; do
  fin=$(( i + 29 )); [ $fin -gt $TOTAL ] && fin=$TOTAL
  ff -v error -y -start_number $i -i "$O/paires/x_%05d.png" -frames:v $(( fin - i + 1 )) -vf "scale=-2:300,tile=6x5:padding=6:color=white" -frames:v 1 -q:v 3 "$O/c_$(printf %05d $i)-$(printf %05d $fin).jpg"
  i=$(( fin + 1 ))
done
rm -rf "$O/paires"
echo "$TOTAL paires comparées → $(ls "$O"/c_*.jpg | wc -l | tr -d ' ') planches dans $O"
