import { ListChecks, Password, User } from "phosphor-react";
import { useForm } from "react-hook-form";
import Cookies from "universal-cookie";
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from "react";

interface IUserLogin {
  username: string;
  password: string;
}


export function Login(){
  const cookies = new Cookies();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<IUserLogin>();
  
  async function handleLogin({ username, password }: IUserLogin){
    const requestBody = {
      username,
      password
    }
    const request = await fetch("http://localhost:3000/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    })

    const response = await request.json()

    if (response.status === 'Error'){
      return alert(`Erro ao efetuar login! ${response.message}`);
    }

    cookies.set('todo_token', response.token, { path: '/', maxAge: 60 * 60 * 12 });
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
        onSubmit={handleSubmit(handleLogin)}
      >
        <h2 className="text-white text-2xl font-bold">Login</h2>
        <div className="w-full flex flex-col gap-5">
          <div>
            <label htmlFor="username" className="text-zinc-400 text-sm">Nome de usuário</label>
            <div className="text-zinc-400 flex items-center bg-zinc-700 p-3 gap-2 rounded">
              <User />
              <input 
                {...register("username")}
                id="username"
                type="text" 
                placeholder="Insira seu nome de usuário"
                className="w-full bg-transparent outline-none decoration-transparent"
              />
            </div>
          </div>

          <div className="">
            <label htmlFor="password" className="text-zinc-400 text-sm">Sua senha</label>
            <div className="text-zinc-400 flex items-center bg-zinc-700 p-3 gap-2 rounded">
              <Password />
              <input 
                {...register("password")}
                id="password"
                type="password" 
                placeholder="Insira sua senha"
                className="w-full bg-transparent outline-none decoration-transparent"
              />
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col items-center gap-5">
          <button 
            className="w-full bg-violet-500 py-3 font-medium text-white text-base rounded"
            type="submit"
          >Entrar</button>
          <Link to="/signin" className="text-zinc-200 font-light text-sm underline">Não tem conta? Registre-se</Link>
        </div>
      </form>

    </div>
  )
}