import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sky Lanterns',
  description: 'Interactive digital art experience with floating lanterns',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
