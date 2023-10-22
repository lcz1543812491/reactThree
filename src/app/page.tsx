import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex flex-row">
      <main className="flex min-h-screen flex-col items-center p-24 bg-black gap-8">
        <Link href="/threedFont" className="text-white">
          3D字体
        </Link>
        <Link href="/threeLight" className="text-white">
          Light 灯光
        </Link>
        <Link href="/threeShadows" className="text-white">
          Shadows 阴影
        </Link>
        <Link href="/hauntedHouse" className="text-white">
          haunted House
        </Link>
        <Link href="/galaxy" className="text-white">
          Galaxy
        </Link>
        <Link href="/baseAnimate" className="text-white">
          Base animate
        </Link>
        <Link href="/physics" className="text-white">
          Physics
        </Link>
        <Link href="/foxModel" className="text-white">
          Model
        </Link>
        <Link href="/realisticRender" className="text-white">
          Realistic Render
        </Link>
      </main>
      <main className="flex min-h-screen flex-col items-center p-24 bg-black gap-8">
        <Link href="/shader" className="text-white">
          Shader
        </Link>
        <Link href="/shaderDemo" className="text-white">
          Shader Demo
        </Link>
        <Link href="/shaderPattern1" className="text-white">
          shader Pattern 1
        </Link>
        <Link href="/ragingSea" className="text-white">
          Raging Sea
        </Link>
        <Link href="/modifiedMaterials" className="text-white">
          Modified Materials
        </Link>
        <Link href="/performance" className="text-white">
          Performance
        </Link>
        <Link href="/postProcessing" className="text-white">
          Post Processing
        </Link>
        <Link href="/portal" className="text-white">
          Portal
        </Link>
        <Link href="/portfolio" className="text-white">
          Portfolio
        </Link>
      </main>
      <main className="flex min-h-screen flex-col items-center p-24 bg-black gap-8">
        <Link href="/texturePractise" className="text-white">
          Texture Practise
        </Link>
        <Link href="/editFurniture" className="text-white">
          Edit Furniture
        </Link>
        <Link href="/flyLight" className="text-white">
          Fly Light
        </Link>
        <Link href="/particleDemo" className="text-white">
          Particle Demo
        </Link>
        <Link href="/vectorPractise" className="text-white">
          Vector Practise
        </Link>
        <Link href="/cssRender" className="text-white">
          Css Render
        </Link>
      </main>
    </main>
  )
}
