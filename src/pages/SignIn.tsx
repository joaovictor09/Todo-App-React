import { ListChecks, Password, User } from "phosphor-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom"
import Cookies from "universal-cookie";

interface IUserSignIn {
  username: string;
  password: string;
}

export function SignIn(){
  const cookies = new Cookies();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<IUserSignIn>();
  
  async function handleSignIn({ username, password }: IUserSignIn){
    const requestBody = {
      username,
      password
    }
    
    const request = await fetch("http://localhost:3000/signin", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    })

    const response = await request.json()
    
    if (response.status === 'Error'){
      return alert(`Erro ao criar conta! ${response.message}`);
    }

    cookies.set('todo_token', response.token, { path: '/', maxAge: 60 * 60 * 12 });
    alert("Conta criada com sucesso!")
    return navigate("/todos")
  }

  useEffect(() => {
    const token = cookies.get('todo_token');
    if (token) {
      navigate('/todos');
    }
  }, [])

  return (
    <div className="w-full h-screen flex flex-col items-center">
      <div className="flex flex-col gap-7 items-center mt-16">
        <div className="flex gap-5 items-center">
          <ListChecks size="122" weight="bold" className="text-violet-500"/>
          <h2 className="text-8xl font-bold text-white">Todo</h2>
        </div>
        <h1 className="text-white font-semibold text-2xl">Seu app de organização <span className="text-violet-500">simplificado</span></h1>
      </div>

      <form 
        className="max-w-md w-full flex flex-col items-center mt-16 gap-7"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <h2 className="text-white text-2xl font-bold">Criar conta</h2>
        <div className="w-full flex flex-col gap-5">
          <div>
            <label htmlFor="username" className="text-zinc-400 text-sm">Nome de usuário</label>
            <div className="text-zinc-400 flex items-center bg-zinc-700 p-3 gap-2 rounded ">
              <User />
              <input 
                {...register("username")}
                id="username"
                type="text" 
                placeholder="Insira seu nome de usuário"
                className="w-full bg-transparent outline-none text-white placeholder:text-zinc-400 decoration-transparent"
              />
            </div>
          </div>

          <div className="">
            <label htmlFor="password" className="text-zinc-400 text-sm">Sua senha</label>
            <div className="text-zinc-400 flex items-center bg-zinc-700 p-3 gap-2 rounded">
              <Password />
              <input 
                {...register("password")}
                type="password" 
                id="password"
                placeholder="Insira sua senha"
                className="w-full bg-transparent outline-none decoration-transparent text-white placeholder:text-zinc-400"
              />
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col items-center gap-5">
          <button 
            type="submit"
            className="w-full bg-violet-500 py-3 font-medium text-white text-base rounded">Cadastre-se
          </button>
          <Link to="/" className="text-zinc-200 font-light text-sm underline">Já tem conta? Faça login</Link>
        </div>
      </form>

    </div>
  )
}