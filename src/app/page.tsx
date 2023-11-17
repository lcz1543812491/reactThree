import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex flex-row">
      <main className="flex min-h-screen flex-col items-center p-24 bg-black gap-8">
        <Link href="/threedFont" className="text-white text-center">
          3D字体
        </Link>
        <Link href="/threeLight" className="text-white text-center">
          Light 灯光
        </Link>
        <Link href="/threeShadows" className="text-white text-center">
          Shadows 阴影
        </Link>
        <Link href="/hauntedHouse" className="text-white text-center">
          haunted House
        </Link>
        <Link href="/galaxy" className="text-white text-center">
          Galaxy
        </Link>
        <Link href="/baseAnimate" className="text-white text-center">
          Base animate
        </Link>
        <Link href="/physics" className="text-white text-center">
          Physics
        </Link>
        <Link href="/foxModel" className="text-white text-center">
          Model
        </Link>
        <Link href="/realisticRender" className="text-white text-center">
          Realistic Render
        </Link>
      </main>
      <main className="flex min-h-screen flex-col items-center p-24 bg-black gap-8">
        <Link href="/shader" className="text-white text-center">
          Shader
        </Link>
        <Link href="/shaderDemo" className="text-white text-center">
          Shader Demo
        </Link>
        <Link href="/shaderPattern1" className="text-white text-center">
          shader Pattern 1
        </Link>
        <Link href="/ragingSea" className="text-white text-center">
          Raging Sea
        </Link>
        <Link href="/modifiedMaterials" className="text-white text-center">
          Modified Materials
        </Link>
        <Link href="/performance" className="text-white text-center">
          Performance
        </Link>
        <Link href="/postProcessing" className="text-white text-center">
          Post Processing
        </Link>
        <Link href="/portal" className="text-white text-center">
          Portal
        </Link>
        <Link href="/portfolio" className="text-white text-center">
          Portfolio
        </Link>
      </main>
      <main className="flex min-h-screen flex-col items-center p-24 bg-black gap-8">
        <Link href="/texturePractise" className="text-white text-center">
          Texture Practise
        </Link>
        <Link href="/editFurniture" className="text-white text-center">
          Edit Furniture
        </Link>
        <Link href="/flyLight" className="text-white text-center">
          Fly Light
        </Link>
        <Link href="/particleDemo" className="text-white text-center">
          Particle Demo
        </Link>
        <Link href="/vectorPractise" className="text-white text-center">
          Vector Practise
        </Link>
        <Link href="/cssRender" className="text-white text-center">
          Css Render
        </Link>
        <Link href="/transformation" className="text-white text-center">
          Transformation
        </Link>
        <Link href="/vrHouse" className="text-white text-center">
          VR House
        </Link>
        <Link href="/vrDataHouse" className="text-white text-center">
          VR Data House
        </Link>
      </main>
      <main className="flex min-h-screen flex-col items-center p-24 bg-black gap-8">
        <Link href="/smartCity" className="text-white text-center">
          Smart City
        </Link>
        <Link href="/glPractise" className="text-white text-center">
          WebGl Practise
        </Link>
      </main>
    </main>
  )
}
