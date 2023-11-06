import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export function vectorPractise() {
  const scene = new THREE.Scene()
  const ambentLight = new THREE.AmbientLight(0xffffff, 2)
  scene.add(ambentLight)

  const directLight = new THREE.PointLight(0xffffff, 15)
  directLight.position.set(4, 2, 5)
  scene.add(directLight)

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight)
  camera.position.set(-100, 100, 126)
  camera.lookAt(0, 0, 0)

  scene.add(camera)

  const axisHelper = new THREE.AxesHelper(600)
  scene.add(axisHelper)

  const render = new THREE.WebGLRenderer({ antialias: true, canvas: document.getElementById('galaxy') as HTMLCanvasElement })
  // render.shadowMap.enabled = true
  // render.shadowMap.type = THREE.PCFSoftShadowMap
  //   render.toneMapping = THREE.ReinhardToneMapping
  //   render.toneMappingExposure = 1
  render.setSize(window.innerWidth, window.innerHeight)

  const controls = new OrbitControls(camera, render.domElement)
  controls.enableDamping = true

  const dir = new THREE.Vector3(2, 2, 3)
  //normalize the direction vector (convert to vector of length 1)
  dir.normalize()
  const origin = new THREE.Vector3(1, 1, 1)
  const length = 1
  const hex = 0xffff00
  const arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex)
  // scene.add(arrowHelper)

  const A = new THREE.Vector3(5, 6, 7)
  const B = new THREE.Vector3(0, 0, 0)

  const AB = B.clone().sub(A)
  const dir1 = AB.clone().normalize()
  const length1 = AB.length()
  const hex1 = 0xff0000
  // console.log(dir1)

  const arrowHelper1 = new THREE.ArrowHelper(dir1, A, length1, hex1)
  // scene.add(arrowHelper1)

  //   const gemeory = new THREE.BoxGeometry(5, 5, 5)
  //   const material1 = new THREE.MeshPhysicalMaterial({ color: 0xff0000, roughness: 1, metalness: 0.2 })
  //   const mesh = new THREE.Mesh(gemeory, material1)
  //   scene.add(mesh)

  //   const p = mesh.geometry.attributes.position
  //   const n = mesh.geometry.attributes.normal
  //   //console.log(p)

  //   for(let i = 0; i < p.count; i++){
  //      const origin = new THREE.Vector3(p.getX(i), p.getY(i), p.getZ(i))
  //      const target = new THREE.Vector3(n.getX(i), n.getY(i), n.getZ(i))
  //      const arrowHelper2= new THREE.ArrowHelper(target, origin, 1, 0xffff00)
  //      scene.add(arrowHelper2)
  //   }

  //   const v = new THREE.Vector3(2, 1, 7)
  //   const o = new THREE.Vector3(0, 0, 0)
  //   const dir3 = v.clone().sub(o).normalize()

  //   const arrowHelper2= new THREE.ArrowHelper(dir3, o, 10, 0xffff00)
  //   scene.add(arrowHelper2)

  //   const gemeory = new THREE.BoxGeometry(5, 5, 5)
  //   const material1 = new THREE.MeshPhysicalMaterial({ color: 0x00ffff, roughness: 1, metalness: 0.2 })
  //   const mesh = new THREE.Mesh(gemeory, material1)
  //   mesh.position.set(-20, 0, -10)
  //   scene.add(mesh)

  const a1 = new THREE.Vector3(50, 0, 0)
  const b1 = new THREE.Vector3(30, 0, 30)

  const origin1 = new THREE.Vector3(0, 0, 0)

  const a2 = a1.clone().sub(origin1)
  const a2_dir = a2.clone().normalize()
  const length3 = a2.length()
  const arrowHelper3 = new THREE.ArrowHelper(a2_dir, origin1, length3, 0xffff00)
  // scene.add(arrowHelper3)

  const b2 = b1.clone().sub(origin1)
  const b2_dir = b2.clone().normalize()
  const length4 = b2.length()
  const arrowHelper4 = new THREE.ArrowHelper(b2_dir, origin1, length4, 0x00ff00)
  // scene.add(arrowHelper4)

  const cross = new THREE.Vector3()
  cross.crossVectors(b1, a1)

  const cross1 = cross.clone().sub(origin1)
  const cross1_dir = cross1.clone().normalize()
  const length5 = cross1.length()
  const arrowHelper5 = new THREE.ArrowHelper(cross1_dir, origin1, 90, 0x00ffff)
  // scene.add(arrowHelper5)

  const v = new THREE.Vector3(30, 40, 0)
  const g = new THREE.Vector3(0, -9.8, 0)
  const gemeory = new THREE.BoxGeometry(5, 5, 5)
  const material1 = new THREE.MeshPhysicalMaterial({ color: 0x00ffff, roughness: 1, metalness: 0.2, wireframe: true })
  const mesh = new THREE.Mesh(gemeory, material1)

  // gemeory.setAttribute('position', new THREE.BufferAttribute(new Float32Array([0, 50, 0]), 3))
  // gemeory.attributes.position = new THREE.BufferAttribute(new Float32Array(new THREE.Vector3(0, 50, 0)), 3)
  // mesh.position.set(0, 50, 0)
  mesh.geometry.translate(0, 50, 0)
  const meshAxesHelper = new THREE.AxesHelper(50)
  mesh.add(meshAxesHelper)
  console.log('gemeory', gemeory.attributes.uv)

  // scene.add(mesh)

  const spherebox = new THREE.Mesh(new THREE.SphereGeometry(10, 20, 20), new THREE.MeshBasicMaterial({ color: 0xff0000 }))

  spherebox.position.z = 100
  spherebox.position.x = 100

  // scene.add(spherebox)

  const points = new Float32Array([
    481.80078125, 403.0867004394531, 0, 461.80078125, 403.0867004394531, 0, 461.80078125, 592.3276977539062, 0, 481.80078125, 612.3276977539062, 0, 461.80078125, 403.0867004394531, 280, 481.80078125, 403.0867004394531, 280, 481.80078125, 612.3276977539062, 280, 461.80078125, 592.3276977539062, 280
  ])
  points.forEach(item => {
    item = item / 100
  })
  const temp1 = points.slice(0, 3)
  const temp2 = points.slice(3, 6)
  console.log('temp2', temp2)

  const geometry1 = new THREE.BufferGeometry()
  geometry1.attributes.position = new THREE.BufferAttribute(temp1, 3)

  const geometry2 = new THREE.BufferGeometry()
  geometry2.attributes.position = new THREE.BufferAttribute(temp2, 3)

  const point1 = new THREE.Points(
    geometry1,
    new THREE.PointsMaterial({
      color: 0xff0000,
      size: 30
    })
  )

  const point2 = new THREE.Points(
    geometry2,
    new THREE.PointsMaterial({
      color: 0x00ff00,
      size: 30
    })
  )

  // scene.add(point1)
  // scene.add(point2)

  // const mesh1 = new THREE.Mesh(
  // 	geometry,
  // 	new THREE.MeshBasicMaterial({
  // 		color: 0xff0000,
  // 		side: THREE.DoubleSide
  // 	})
  // 	);
  // scene.add(mesh1);

  const clock = new THREE.Clock()
  let start = 0
  const pre_position = mesh.position

  //CircleGeometry的顶点UV坐标是按照圆形采样纹理贴图
  const geometry = new THREE.CircleGeometry(60, 100)
  //纹理贴图加载器TextureLoader
  const texLoader = new THREE.TextureLoader()
  const texture = texLoader.load('/texture/texture-1.png')

  console.log('texture', texture)

  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping

  texture.repeat.set(12, 12)

  const material = new THREE.MeshBasicMaterial({
    map: texture, //map表示材质的颜色贴图属性
    side: THREE.DoubleSide
  })
  const mesh2 = new THREE.Mesh(geometry, material)
  console.log('mesh2', mesh2.geometry.attributes.uv)
  // scene.add(mesh2)

  const geometry3 = new THREE.BufferGeometry() //创建一个几何体对象
  const R = 100 //圆弧半径
  const N = 50 //分段数量
  const sp = (2 * Math.PI) / N //两个相邻点间隔弧度
  // 批量生成圆弧上的顶点数据
  const arr = []
  for (let i = 0; i < N; i++) {
    const angle = sp * i //当前点弧度
    // 以坐标原点为中心，在XOY平面上生成圆弧上的顶点数据
    const x = R * Math.cos(angle)
    const y = R * Math.sin(angle)
    arr.push(x, y, 0)
  }

  // console.log('arr', arr)

  //类型数组创建顶点数据
  const vertices = new Float32Array(arr)
  // 创建属性缓冲区对象
  //3个为一组，表示一个顶点的xyz坐标
  const attribue = new THREE.BufferAttribute(vertices, 3)
  // 设置几何体attributes属性的位置属性
  geometry3.attributes.position = attribue

  // 线材质
  const material2 = new THREE.LineBasicMaterial({
    color: 0xff0000 //线条颜色
  })
  // 创建线模型对象   构造函数：Line、LineLoop、LineSegments
  // const line = new THREE.Line(geometry, material);
  const line = new THREE.LineLoop(geometry3, material2) //线条模型对象
  // scene.add(line)

  const arc = new THREE.EllipseCurve(0, 0, 100, 50)
  //getPoints是基类Curve的方法，平面曲线会返回一个vector2对象作为元素组成的数组
  const pointsArr = arc.getPoints(50) //分段数50，返回51个顶点
  // console.log('曲线上获取坐标', pointsArr)
  const geometry4 = new THREE.BufferGeometry()
  geometry4.setFromPoints(pointsArr)

  const material5 = new THREE.PointsMaterial({
    color: 0xffff00,
    size: 10.0 //点对象像素尺寸
  })
  // 点模型
  const points1 = new THREE.Points(geometry4, material5)
  // scene.add(points1)

  // 三维向量Vector3创建一组顶点坐标
  const arr2 = [new THREE.Vector3(-50, 20, 90), new THREE.Vector3(-10, 40, 40), new THREE.Vector3(0, 0, 0), new THREE.Vector3(60, -60, 0), new THREE.Vector3(70, 0, 80)]
  // 三维样条曲线
  const curve = new THREE.CatmullRomCurve3(arr2)

  //曲线上获取点
  const pointsArr1 = curve.getPoints(100)
  const geometry6 = new THREE.BufferGeometry()
  //读取坐标数据赋值给几何体顶点
  geometry6.setFromPoints(pointsArr1)
  // 线材质
  const material6 = new THREE.LineBasicMaterial({
    color: 0x00fffff
  })
  // 线模型
  const line1 = new THREE.Line(geometry6, material6)
  // scene.add(line1)

  // p1、p2、p3表示三个点坐标
  const p1 = new THREE.Vector3(-80, 0, 0)
  const p2 = new THREE.Vector3(20, 100, 0)
  const p3 = new THREE.Vector3(80, 0, 100)
  // 三维二次贝赛尔曲线
  const curve2 = new THREE.QuadraticBezierCurve3(p1, p2, p3)

  const geometry9 = new THREE.BufferGeometry()
  const material7 = new THREE.LineBasicMaterial({
    color: 0x00fffff
  })

  const points9 = curve2.getPoints()
  geometry9.setFromPoints(points9)

  const line11 = new THREE.Line(geometry9, material7)

  // scene.add(line11)

  // Vector2表示的三个点坐标，三个点构成的轮廓相当于两端直线相连接
  const pointsArr11 = [new THREE.Vector2(50, 60), new THREE.Vector2(25, 0), new THREE.Vector2(50, -60)]
  // LatheGeometry：pointsArr轮廓绕y轴旋转生成几何体曲面
  // pointsArr：旋转几何体的旋转轮廓形状
  const geometry11 = new THREE.LatheGeometry(pointsArr11)

  const mesh21 = new THREE.Mesh(geometry11, new THREE.MeshBasicMaterial({ color: 0xffff00 }))
  // scene.add(mesh21)

  // 扫描轮廓：Shape表示一个平面多边形轮廓
  const shape = new THREE.Shape([
    // 按照特定顺序，依次书写多边形顶点坐标
    new THREE.Vector2(0, 0), //多边形起点
    new THREE.Vector2(0, 10),
    new THREE.Vector2(10, 10),
    new THREE.Vector2(10, 0)
  ])

  //扫描造型：扫描默认没有倒角
  const geometry12 = new THREE.ExtrudeGeometry(
    shape, //扫描轮廓
    {
      extrudePath: curve, //扫描轨迹
      steps: 100 //沿着路径细分精度，越大越光滑
    }
  )

  const mesh22 = new THREE.Mesh(geometry12, new THREE.MeshPhysicalMaterial({ color: 0x00ffff }))

  // scene.add(mesh22)

  // const colors = new Float32Array([
  //   1,
  //   0,
  //   0, //顶点1颜色
  //   0,
  //   0,
  //   1, //顶点2颜色
  //   0,
  //   1,
  //   0 //顶点3颜色
  // ])

  // const geometry13 = new THREE.BufferGeometry()

  // geometry13.attributes.color = new THREE.BufferAttribute(colors, 3)
  // geometry13.setFromPoints(points9)

  // const material12 = new THREE.LineBasicMaterial({
  //   // vertexColors: true, //使用顶点颜色渲染
  //   linewidth: 10,
  //   side: THREE.DoubleSide,
  //   color: 0xff0000
  // })
  // const line12 = new THREE.Line(geometry13, material12)

  // scene.add(line12)

  const geometry14 = new THREE.BufferGeometry() //创建一个几何体对象
  // 三维样条曲线
  const curve1 = new THREE.CatmullRomCurve3([new THREE.Vector3(-50, 20, 90), new THREE.Vector3(-10, 40, 40), new THREE.Vector3(0, 0, 0), new THREE.Vector3(60, -60, 0), new THREE.Vector3(70, 0, 80)])
  const pointsArr12 = curve1.getSpacedPoints(100) //曲线取点
  geometry14.setFromPoints(pointsArr12) //pointsArr赋值给顶点位置属性

  const pos = geometry14.attributes.position
  const count = pos.count //顶点数量
  // 计算每个顶点的颜色值
  const colorsArr = []
  for (let i = 0; i < count; i++) {
    const percent = i / count //点索引值相对所有点数量的百分比
    //根据顶点位置顺序大小设置颜色渐变
    // 红色分量从0到1变化，蓝色分量从1到0变化
    colorsArr.push(percent, 0, 1 - percent) //蓝色到红色渐变色
  }
  //类型数组创建顶点颜色color数据
  const colors = new Float32Array(colorsArr)
  // 设置几何体attributes属性的颜色color属性
  geometry14.attributes.color = new THREE.BufferAttribute(colors, 3)

  const material13 = new THREE.LineBasicMaterial({
    vertexColors: true, //使用顶点颜色渲染
    linewidth: 10
  })
  const line12 = new THREE.Line(geometry14, material13)
  scene.add(line12)



  function tick() {
    //console.log(camera.position)
    texture.offset.x += 0.01
    const time = clock.getElapsedTime()
    spherebox.position.z = Math.sin(time) * 100
    spherebox.position.x = Math.cos(time) * 100

    if (mesh.position.y >= 0) {
      const delta = clock.getDelta()
      start += delta * 0.01

      // const new_position = v.clone().multiplyScalar(start)
      // mesh.position.copy(pre_position.clone().add(new_position))

      v.add(g.clone().multiplyScalar(delta))
      const new_position = v.clone().multiplyScalar(start)
      mesh.position.copy(pre_position.clone().add(new_position))
    }

    render.render(scene, camera)
    controls.update()
    requestAnimationFrame(tick)
  }

  tick()

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    render.setSize(window.innerWidth, window.innerHeight)
  })
}
