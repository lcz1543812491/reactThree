import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='bg-black'>
      <body className={inter.className} style={{ background: 'transparent', height: '100vh' }}>
      <Link href="/" className='text-white fixed top-5 left-5 z-50'>Back to Home</Link>
        {children}
      </body>
    </html>
  )
}
