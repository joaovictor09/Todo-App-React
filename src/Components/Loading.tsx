import { CircleNotch } from "phosphor-react";

export function Loading(){
  return (
    <div className="fixed inset-0 bg-black opacity-30">
      <div className="fixed max-w-md mx-auto flex flex-col items-center w-full px-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <CircleNotch className="text-white animate-spin" size={64}/>
      </div>
    </div>
  )
}