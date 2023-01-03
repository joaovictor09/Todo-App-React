import { Trash, Check } from "phosphor-react"
import { useEffect, useState } from "react"
import Cookies from 'universal-cookie';

import * as Checkbox from "@radix-ui/react-checkbox"
import * as AlertDialog from '@radix-ui/react-alert-dialog';

interface TaskCardProps {
  title: string,
  completed: boolean,
  date: number,
  deleteTask: (date: number) => void,
  setTaskCompleted: () => void,
}

export function TaskCard(props: TaskCardProps){

  const cookies = new Cookies();
  const [completed, setCompleted] = useState(props.completed)
  const [dontAsk, setDontAsk] = useState(false)

  function deleteHandle(force?: boolean): void {
    const dontAskCookie = cookies.get('dontAsk');
    console.log(typeof(dontAskCookie))
    if(force){
      if(dontAsk == true){
        cookies.set("dontAsk", true, { path: '/', maxAge: 60 * 5 })
      }
      props.deleteTask(props.date)
    }
    if(dontAskCookie == 'true'){
      props.deleteTask(props.date)
    }
  }

  return(
    <div className="w-full flex items-center justify-between bg-zinc-700 p-2 rounded">
      <div className="flex items-center gap-2">
        <Checkbox.Root 
          className="border-2 w-6 h-6 border-violet-500 rounded-full flex items-center justify-center"
          onCheckedChange={(checked: boolean) => checked === true ? setCompleted(true) : setCompleted(false)}
          checked={completed}
          onClick={props.setTaskCompleted}
        >
          <Checkbox.Indicator>
            <Check className="text-violet-500 " weight="bold"/>
          </Checkbox.Indicator>
        </Checkbox.Root>
        <span 
          className={`text-sm font-normal text-white ${completed ? 'text-zinc-400 line-through' : ''}`}
        >
          {props.title}
        </span>
      </div>
      <AlertDialog.Root>
        <AlertDialog.Trigger asChild>
          <button onClick={() => deleteHandle()}>
            <Trash size={24} className="text-zinc-400"/>
          </button>
        </AlertDialog.Trigger>
        <AlertDialog.Portal className="fixed w-screen h-screen flex items-center justify-center">
          <AlertDialog.Overlay className="fixed inset-0 bg-black opacity-30"/>
          <div className="fixed max-w-md mx-auto flex flex-col items-center w-full px-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <AlertDialog.Content className="flex flex-col rounded items-center gap-5 bg-zinc-800 px-3 py-3">
              <AlertDialog.Title className="font-semibold text-white">
                Atenção
              </AlertDialog.Title>

              <AlertDialog.Description className="text-white text-center">
                {`Você tem certeza que quer apagar a tarefa “${props.title}”?`}
              </AlertDialog.Description>

              <div className="flex items-center gap-2 self-start">
                <Checkbox.Root 
                  className="w-6 h-6 bg-zinc-900 rounded flex items-center justify-center"
                  id="dont-ask"
                  onCheckedChange={(checked) => checked == true ? setDontAsk(true) : setDontAsk(false)}
                >
                  <Checkbox.Indicator>
                    <Check className="text-violet-500 " weight="bold"/>
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <label htmlFor="dont-ask" className="text-sm text-zinc-400">Não perguntar novamente por 5 minutos</label>
              </div>
              <div className="flex w-full justify-between text-sm gap-3">
                <AlertDialog.Cancel asChild className="w-full ">
                  <button className="w-full bg-zinc-700 rounded py-2 px-3 font-semibold text-white">Não</button>
                </AlertDialog.Cancel>

                <AlertDialog.Action asChild className="w-full">
                  <button 
                    className="bg-violet-500 rounded py-2 px-3 w-full font-semibold text-white text"
                    onClick={() => deleteHandle(true)}
                  >
                    Sim, quero excluir!
                  </button>
                </AlertDialog.Action>
              </div>

            </AlertDialog.Content>
          </div>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </div>
  )
}