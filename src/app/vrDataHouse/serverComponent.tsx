import { VrDataHouse } from './vrDataHouse'
import { VrData } from './interface'


export async function ServerComponent() {
  const res = await fetch('https://test-1251830808.cos.ap-guangzhou.myqcloud.com/three_course/demo720.json')

  const data: VrData = await res.json()

  return (
    <>
      <VrDataHouse vrdata={data} />
    </>
  )
}
