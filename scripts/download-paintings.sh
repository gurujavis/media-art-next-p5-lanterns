#!/bin/bash
set -euo pipefail

# Download public-domain paintings from Wikimedia Commons.
# Note: we use Special:FilePath which reliably redirects to the actual binary.

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/paintings"
mkdir -p "$OUT"
cd "$OUT"

UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"

fetch() {
  local file="$1"; shift
  local url="$1"; shift
  echo "- $file"
  curl -fL --retry 3 --retry-delay 1 -A "$UA" "$url" -o "$file"
  # Reject HTML error pages saved as .jpg
  if file "$file" | grep -qi "HTML"; then
    echo "ERROR: $file is not an image (download returned HTML)." >&2
    return 1
  fi
}

echo "Downloading public domain artworks to: $OUT"

fetch "starry-night.jpg" "https://commons.wikimedia.org/wiki/Special:FilePath/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg?width=800"
fetch "great-wave.jpg" "https://commons.wikimedia.org/wiki/Special:FilePath/The_Great_Wave_off_Kanagawa.jpg?width=800"
fetch "girl-pearl.jpg" "https://commons.wikimedia.org/wiki/Special:FilePath/1665_Girl_with_a_Pearl_Earring.jpg?width=700"
fetch "mona-lisa.jpg" "https://commons.wikimedia.org/wiki/Special:FilePath/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg?width=700"
fetch "scream.jpg" "https://commons.wikimedia.org/wiki/Special:FilePath/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg?width=700"
fetch "birth-of-venus.jpg" "https://commons.wikimedia.org/wiki/Special:FilePath/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg?width=900"

echo "Done! All paintings downloaded."
