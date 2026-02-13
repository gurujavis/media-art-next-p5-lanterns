'use client'

import { useEffect, useRef, useState } from 'react'
import p5 from 'p5'

interface Lantern {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  img: p5.Image
  paintingName: string
  speed: number
  swayOffset: number
  glowIntensity: number
  held: boolean
  heldTime: number
  originalVy: number
  targetX?: number
  targetY?: number
  inConstellation: boolean
  flickerOffset: number
  imgAspect: number
}

const PAINTINGS = [
  { file: 'starry-night.jpg', name: 'The Starry Night', artist: 'Vincent van Gogh' },
  { file: 'great-wave.jpg', name: 'The Great Wave', artist: 'Katsushika Hokusai' },
  { file: 'girl-pearl.jpg', name: 'Girl with a Pearl Earring', artist: 'Johannes Vermeer' },
  { file: 'mona-lisa.jpg', name: 'Mona Lisa', artist: 'Leonardo da Vinci' },
  { file: 'scream.jpg', name: 'The Scream', artist: 'Edvard Munch' },
  { file: 'birth-of-venus.jpg', name: 'The Birth of Venus', artist: 'Sandro Botticelli' },
]

const CAPTIONS = [
  '2024년 겨울, 당신이 몰입했던 순간',
  '잊고 있던 아름다움을 다시 발견하다',
  '손끝에서 피어나는 예술',
  '당신만의 밤하늘을 그리다',
  '시간이 멈춘 찰나',
]

export default function LanternsSketch() {
  const sketchRef = useRef<HTMLDivElement>(null)
  const [showInstructions, setShowInstructions] = useState(true)

  useEffect(() => {
    if (!sketchRef.current) return

    const sketch = (p: p5) => {
      let lanterns: Lantern[] = []
      let images: p5.Image[] = []
      let lastInteractionTime = 0
      let constellationMode = false
      let constellationMessage = ''
      let messageOpacity = 0
      let heldLantern: Lantern | null = null
      let captionText = ''
      let captionOpacity = 0
      let imagesLoaded = false

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight)
        p.imageMode(p.CENTER)

        // Load paintings
        for (const painting of PAINTINGS) {
          p.loadImage(
            `/paintings/${painting.file}`,
            (img) => {
              images.push(img)
              if (images.length === PAINTINGS.length) {
                imagesLoaded = true
                // Create initial lanterns after all images are loaded
                for (let i = 0; i < 8; i++) {
                  spawnLantern()
                }
              }
            },
            () => {
              console.warn(`Could not load ${painting.file}`)
            }
          )
        }

        lastInteractionTime = p.millis()
      }

      const spawnLantern = () => {
        if (images.length === 0) return

        const imgIndex = Math.floor(p.random(images.length))
        const size = p.random(80, 140)
        const img = images[imgIndex]

        lanterns.push({
          x: p.random(size, p.width - size),
          y: p.height + size,
          vx: 0,
          vy: p.random(-0.5, -1.5),
          size,
          img,
          paintingName: `${PAINTINGS[imgIndex].name} - ${PAINTINGS[imgIndex].artist}`,
          speed: p.random(0.5, 1.5),
          swayOffset: p.random(p.TWO_PI),
          glowIntensity: 0.6,
          held: false,
          heldTime: 0,
          originalVy: 0,
          inConstellation: false,
          flickerOffset: p.random(1000),
          imgAspect: img.width / img.height,
        })
      }

      const getLanternAt = (mx: number, my: number): Lantern | null => {
        for (let i = lanterns.length - 1; i >= 0; i--) {
          const l = lanterns[i]
          const d = p.dist(mx, my, l.x, l.y)
          if (d < l.size / 2) {
            return l
          }
        }
        return null
      }

      p.mousePressed = () => {
        if (constellationMode) {
          exitConstellationMode()
          return false
        }

        const lantern = getLanternAt(p.mouseX, p.mouseY)
        if (lantern) {
          lantern.held = true
          lantern.heldTime = 0
          lantern.originalVy = lantern.vy
          lantern.vy = 0
          lantern.glowIntensity = 1.2
          heldLantern = lantern
          captionText = `${p.random(CAPTIONS)}\n${lantern.paintingName}`
          captionOpacity = 0
        }

        lastInteractionTime = p.millis()
        return false
      }

      p.mouseReleased = () => {
        if (heldLantern) {
          heldLantern.held = false
          heldLantern.vy = heldLantern.originalVy
          heldLantern.glowIntensity = 0.6
          heldLantern = null
          captionOpacity = 0
        }
        return false
      }

      const enterConstellationMode = () => {
        constellationMode = true
        constellationMessage = '이 모든 별들이 당신의 손끝에서 태어났습니다.'
        messageOpacity = 0

        // Calculate constellation center
        const centerX = p.width / 2
        const centerY = p.height / 2
        const radius = Math.min(p.width, p.height) * 0.3

        lanterns.forEach((l, i) => {
          const angle = (i / lanterns.length) * p.TWO_PI
          l.targetX = centerX + p.cos(angle) * radius
          l.targetY = centerY + p.sin(angle) * radius
          l.inConstellation = true
        })
      }

      const exitConstellationMode = () => {
        constellationMode = false
        messageOpacity = 0
        lanterns.forEach(l => {
          l.inConstellation = false
          l.targetX = undefined
          l.targetY = undefined
        })
        lastInteractionTime = p.millis()
      }

      p.draw = () => {
        // Background
        p.background('#050B1E')

        // Wait for images to load
        if (!imagesLoaded) {
          p.fill(255, 255, 200, 100)
          p.noStroke()
          p.textAlign(p.CENTER, p.CENTER)
          p.textSize(20)
          p.text('Loading...', p.width / 2, p.height / 2)
          return
        }

        // Check for idle state
        const timeSinceInteraction = p.millis() - lastInteractionTime
        if (!constellationMode && timeSinceInteraction > 15000) {
          enterConstellationMode()
        }

        // Update and draw lanterns
        for (let i = lanterns.length - 1; i >= 0; i--) {
          const l = lanterns[i]

          if (l.inConstellation && l.targetX !== undefined && l.targetY !== undefined) {
            // Move towards constellation position
            const dx = l.targetX - l.x
            const dy = l.targetY - l.y
            l.x += dx * 0.02
            l.y += dy * 0.02
          } else {
            // Normal floating behavior
            if (!l.held) {
              l.y += l.vy * l.speed
              l.x += p.sin(p.frameCount * 0.01 + l.swayOffset) * 0.3

              // Update held time
              l.heldTime = 0
            } else {
              l.heldTime++
              if (l.heldTime > 90) { // ~1.5s at 60fps
                l.held = false
                l.vy = l.originalVy
                l.glowIntensity = 0.6
                heldLantern = null
                captionOpacity = 0
              }
            }

            // Respawn if off screen
            if (l.y < -l.size * 2) {
              lanterns.splice(i, 1)
              spawnLantern()
              continue
            }
          }

          // Draw lantern
          drawLantern(l)
        }

        // Draw constellation lines
        if (constellationMode) {
          p.stroke(255, 255, 200, 30)
          p.strokeWeight(1)
          for (let i = 0; i < lanterns.length; i++) {
            const next = (i + 1) % lanterns.length
            p.line(lanterns[i].x, lanterns[i].y, lanterns[next].x, lanterns[next].y)
          }

          // Fade in message
          messageOpacity = p.lerp(messageOpacity, 255, 0.02)
          p.fill(255, 255, 200, messageOpacity)
          p.noStroke()
          p.textAlign(p.CENTER, p.CENTER)
          p.textSize(20)
          p.text(constellationMessage, p.width / 2, p.height - 80)

          // Auto-exit after a while
          if (timeSinceInteraction > 25000) {
            exitConstellationMode()
          }
        }

        // Draw caption for held lantern
        if (heldLantern && captionOpacity < 255) {
          captionOpacity = p.lerp(captionOpacity, 255, 0.1)
        } else if (!heldLantern && captionOpacity > 0) {
          captionOpacity = p.lerp(captionOpacity, 0, 0.1)
        }

        if (captionOpacity > 1) {
          p.fill(255, 255, 200, captionOpacity)
          p.noStroke()
          p.textAlign(p.CENTER, p.BOTTOM)
          p.textSize(16)
          p.text(captionText, p.width / 2, p.height - 40)
        }
      }

      const drawLantern = (l: Lantern) => {
        p.push()
        p.translate(l.x, l.y)

        // Flicker effect using Perlin noise
        const flickerNoise = p.noise(p.frameCount * 0.05 + l.flickerOffset)
        const flicker = p.map(flickerNoise, 0, 1, 0.85, 1.15)
        const currentGlow = l.glowIntensity * flicker

        // Draw glow with additive blending
        p.blendMode(p.ADD)
        p.noStroke()

        // Outer halo (large, very faint)
        const haloColor = l.held ? [255, 180, 80] : [255, 140, 40]
        for (let i = 0; i < 4; i++) {
          const haloSize = l.size * (2.5 - i * 0.3) * currentGlow
          const haloOpacity = (8 / (i + 1)) * currentGlow
          p.fill(haloColor[0], haloColor[1], haloColor[2], haloOpacity)
          p.ellipse(0, 0, haloSize, haloSize)
        }

        // Middle bloom (medium glow)
        const bloomColor = l.held ? [255, 200, 100] : [255, 160, 60]
        for (let i = 0; i < 3; i++) {
          const bloomSize = l.size * (1.4 - i * 0.15) * currentGlow
          const bloomOpacity = (15 / (i + 1)) * currentGlow
          p.fill(bloomColor[0], bloomColor[1], bloomColor[2], bloomOpacity)
          p.ellipse(0, 0, bloomSize, bloomSize)
        }

        // Core glow (bright orange center)
        const coreColor = l.held ? [255, 220, 120] : [255, 180, 80]
        for (let i = 0; i < 2; i++) {
          const coreSize = l.size * (0.9 - i * 0.15) * currentGlow
          const coreOpacity = (25 / (i + 1)) * currentGlow
          p.fill(coreColor[0], coreColor[1], coreColor[2], coreOpacity)
          p.ellipse(0, 0, coreSize, coreSize)
        }

        // Reset blend mode for painting
        p.blendMode(p.BLEND)

        // Draw painting (preserve aspect ratio; no crop)
        // "contain" fit inside the lantern frame so different aspect ratios appear at different sizes.
        const frameSize = l.size * 0.7
        const maxDim = frameSize
        const iw = (l.img as any).width || maxDim
        const ih = (l.img as any).height || maxDim
        const s = Math.min(maxDim / iw, maxDim / ih)
        const dw = iw * s
        const dh = ih * s

        p.tint(255, l.held ? 255 : 200)
        p.image(l.img, 0, 0, dw, dh)
        p.noTint()

        // Draw lantern frame
        p.noFill()
        p.stroke(255, 220, 150, l.held ? 220 : 160)
        p.strokeWeight(l.held ? 2.5 : 2)
        p.rectMode(p.CENTER)
        p.rect(0, 0, frameSize, frameSize, 5)

        // Add subtle inner glow on frame when held
        if (l.held) {
          p.stroke(255, 240, 200, 80)
          p.strokeWeight(1)
          p.rect(0, 0, frameSize - 3, frameSize - 3, 4)
        }

        p.pop()
      }

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight)
      }

      p.keyPressed = () => {
        if (p.key === 'h' || p.key === 'H') {
          setShowInstructions(prev => !prev)
        }
      }
    }

    const p5Instance = new p5(sketch, sketchRef.current)

    return () => {
      p5Instance.remove()
    }
  }, [])

  return (
    <div>
      <div ref={sketchRef} />
      {showInstructions && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            left: '20px',
            padding: '15px 20px',
            background: 'rgba(0, 0, 0, 0.7)',
            color: '#fff',
            borderRadius: '10px',
            fontSize: '14px',
            maxWidth: '300px',
            zIndex: 1000,
          }}
        >
          <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>Sky Lanterns</div>
          <div style={{ marginBottom: '5px' }}>• Touch lanterns to hold them</div>
          <div style={{ marginBottom: '5px' }}>• Watch the artwork glow</div>
          <div style={{ marginBottom: '5px' }}>• Stay idle to see a surprise</div>
          <div style={{ marginTop: '10px', fontSize: '12px', opacity: 0.7 }}>
            Press H to toggle instructions
          </div>
        </div>
      )}
    </div>
  )
}
