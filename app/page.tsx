'use client'

import dynamic from 'next/dynamic'

const LanternsSketch = dynamic(() => import('../components/LanternsSketch'), {
  ssr: false,
})

export default function Home() {
  return <LanternsSketch />
}
