#!/bin/bash

# Download public domain paintings from Wikimedia Commons
# All images are in the public domain

cd "$(dirname "$0")/../public/paintings"

echo "Downloading public domain artworks..."

# The Starry Night by Vincent van Gogh (1889)
curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/800px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg" -o "starry-night.jpg"

# The Great Wave off Kanagawa by Katsushika Hokusai (1831)
curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/The_Great_Wave_off_Kanagawa.jpg/800px-The_Great_Wave_off_Kanagawa.jpg" -o "great-wave.jpg"

# Girl with a Pearl Earring by Johannes Vermeer (1665)
curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/600px-1665_Girl_with_a_Pearl_Earring.jpg" -o "girl-pearl.jpg"

# Mona Lisa by Leonardo da Vinci (1503)
curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/600px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg" -o "mona-lisa.jpg"

# The Scream by Edvard Munch (1893)
curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg/600px-Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg" -o "scream.jpg"

# The Persistence of Memory by Salvador Dalí (1931)
curl -L "https://upload.wikimedia.org/wikipedia/en/thumb/d/dd/The_Persistence_of_Memory.jpg/800px-The_Persistence_of_Memory.jpg" -o "persistence-memory.jpg"

echo "Done! All paintings downloaded."
