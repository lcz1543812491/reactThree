import Image from 'next/image'
import ClientComponent from './client'
import { data } from './data'

export function ServerComponent() {
  return (
    <>
      <div className="fixed text-white w-52 left-10 top-40 pointer-events-none flex flex-col font-black gap-y-3">
        {data.map(item => {
          return (
            <div className="relative flex justify-center flex-col h-40 rounded p-5 w-full items-center" key={item.title}>
              <div className="h-10 w-full text-xl">{item.title}</div>
              <div className="flex flex-row justify-between w-full">
                <Image alt="icon" width={20} height={20} src="/texture/texture/smartCity/icon.svg" />
                <div>{item.label}</div>
              </div>
              <div className="absolute -z-10 opacity-80	rounded bg-gradient-to-r from-cyan-500 to-blue-500 w-full h-full"></div>
            </div>
          )
        })}
      </div>

      <ClientComponent />
    </>
  )
}
