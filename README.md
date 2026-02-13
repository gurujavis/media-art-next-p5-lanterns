# Sky Lanterns - Interactive Digital Art Experience

An immersive mobile-first art installation featuring floating lanterns that carry famous paintings through a night sky.

## Features

- **Interactive Lanterns**: Touch to hold lanterns, revealing the artwork with realistic enhanced glow
  - Multi-layer radial gradient bloom (orange core + soft halo)
  - Subtle flicker effect using Perlin noise for organic feel
  - Additive blending (p5 ADD mode) for authentic luminosity
- **Aspect-Ratio Preserving Art**: Paintings rendered with aspect-preserving "contain" fit (no crop, no distortion)
- **Constellation Mode**: Stay idle for 15 seconds to see lanterns form a cosmic constellation with a special message
- **Mobile-First**: Optimized for touch interaction and performance on phones
- **Public Domain Art**: Features 6 masterpieces from art history

## Stack

- Next.js 15+ (App Router)
- React 19+
- TypeScript
- p5.js 2.0+
- Mobile-optimized

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Download Paintings

Run the script to download public domain artworks:

```bash
chmod +x scripts/download-paintings.sh
./scripts/download-paintings.sh
```

Or manually download the images and place them in `public/paintings/`.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser (best viewed on mobile or with mobile emulation).

### 4. Build for Production

```bash
npm run build
npm start
```

## Artwork Attribution

All artworks are in the public domain and sourced from Wikimedia Commons:

1. **The Starry Night** (1889)
   - Artist: Vincent van Gogh
   - Source: [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg)
   - License: Public Domain

2. **The Great Wave off Kanagawa** (1831)
   - Artist: Katsushika Hokusai
   - Source: [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:The_Great_Wave_off_Kanagawa.jpg)
   - License: Public Domain

3. **Girl with a Pearl Earring** (1665)
   - Artist: Johannes Vermeer
   - Source: [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:1665_Girl_with_a_Pearl_Earring.jpg)
   - License: Public Domain

4. **Mona Lisa** (1503)
   - Artist: Leonardo da Vinci
   - Source: [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Mona_Lisa,_by_Leonardo_da_Vinci,_from_C2RMF_retouched.jpg)
   - License: Public Domain

5. **The Scream** (1893)
   - Artist: Edvard Munch
   - Source: [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Edvard_Munch,_1893,_The_Scream,_oil,_tempera_and_pastel_on_cardboard,_91_x_73_cm,_National_Gallery_of_Norway.jpg)
   - License: Public Domain

6. **The Birth of Venus** (c. 1485)
   - Artist: Sandro Botticelli
   - Source: [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg)
   - License: Public Domain

## Interaction Guide

- **Touch a Lantern**: Hold it in place for ~1.5 seconds, see it glow brighter, and read about the artwork
- **Watch Quietly**: After 15 seconds without interaction, lanterns form a constellation with a special message
- **Press H**: Toggle instruction overlay
- **Exit Constellation**: Touch anywhere to return to normal floating mode

## Project Structure

```
media-art-next-p5-lanterns/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   └── LanternsSketch.tsx  # Main p5.js sketch component
├── public/
│   └── paintings/          # Artwork images
├── scripts/
│   └── download-paintings.sh  # Download script
└── README.md
```

## Performance Notes

- Optimized for mobile devices
- Uses client-side rendering for p5.js canvas
- Glow effects use multiple layered circles for performance
- Images are pre-loaded before the sketch starts

## License

Code: MIT
Artworks: Public Domain (see attribution above)
