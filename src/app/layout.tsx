import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'knowUbetter - Quiz & Props Game',
  description: 'Answer questions, earn kudos, give props!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}