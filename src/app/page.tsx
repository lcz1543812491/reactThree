import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-black gap-8">
      <Link href="/threedFont" className='text-white'>3D字体</Link>
      <Link href="/threeLight" className='text-white'>Light 灯光</Link>
    </main>
  )
}
