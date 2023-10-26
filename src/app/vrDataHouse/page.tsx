import { ServerComponent } from './serverComponent'

export default function Three() {
  //   useEffect(() => {
  //     fetch('https://test-1251830808.cos.ap-guangzhou.myqcloud.com/three_course/demo720.json')
  //       .then(res => res.json())
  //       .then(obj => {
  //         console.log('obj', obj)
  //       })
  //     vrDataHouse()
  //   }, [])

  //   return <canvas id="galaxy" style={{ width: '100vw', height: '100vh', background: 'black' }}></canvas>
  return <ServerComponent />
}
