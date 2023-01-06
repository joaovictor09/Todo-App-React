import { ListChecks, Password, User } from "phosphor-react";

export function SignIn(){
  return (
    <div className="w-full h-screen flex flex-col items-center">
      <div className="flex flex-col gap-7 items-center mt-16">
        <div className="flex gap-5 items-center">
          <ListChecks size="122" weight="bold" className="text-violet-500"/>
          <h2 className="text-8xl font-bold text-white">Todo</h2>
        </div>
        <h1 className="text-white font-semibold text-2xl">Seu app de organização <span className="text-violet-500">simplificado</span></h1>
      </div>

      <div className="max-w-md w-full flex flex-col items-center mt-16 gap-7">
        <h2 className="text-white text-2xl font-bold">Criar conta</h2>
        <div className="w-full flex flex-col gap-5">
          <div>
            <label htmlFor="" className="text-zinc-400 text-sm">Nome de usuário</label>
            <div className="text-zinc-400 flex items-center bg-zinc-700 p-3 gap-2 rounded">
              <User />
              <input 
                type="text" 
                placeholder="Insira seu nome de usuário"
                className="w-full bg-transparent outline-none decoration-transparent"
              />
            </div>
          </div>

          <div className="">
            <label htmlFor="" className="text-zinc-400 text-sm">Sua senha</label>
            <div className="text-zinc-400 flex items-center bg-zinc-700 p-3 gap-2 rounded">
              <Password />
              <input 
                type="text" 
                placeholder="Insira sua senha"
                className="w-full bg-transparent outline-none decoration-transparent"
              />
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col items-center gap-5">
          <button className="w-full bg-violet-500 py-3 font-medium text-white text-base rounded">Cadastre-se</button>
          <a href="" className="text-zinc-200 font-light text-sm underline">Já tem conta? Faça login</a>
        </div>
      </div>

    </div>
  )
}