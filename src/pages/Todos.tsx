import { Checks, ListChecks, PlusCircle, Scroll, Warning } from "phosphor-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from 'universal-cookie';
import * as ScrollArea from '@radix-ui/react-scroll-area';

import { TaskCard } from "../Components/TaskCard";
import { Loading } from "../Components/Loading";

interface TasksProps {
  id: string;
  title: string,
  completed: boolean,
  date: number
}


export function Todos() {

  const cookies = new Cookies();
  const navigate = useNavigate();
  const [tasks, setTasks ] = useState<TasksProps[]>([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleListAllTodos(token: string){
    setIsLoading(true);
    const request = await fetch('https://todo-1wo5.onrender.com/todos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })

    if (request.status === 401){
      cookies.remove('todo_token')
      navigate('/');
      setIsLoading(false);
      return;
    }

    const data:TasksProps[] = await request.json()
    
    setTasks(data)
    setIsLoading(false);
    return 
  }


  async function handleAddTask(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    setIsLoading(true);

    if (taskTitle.length >= 2){
      const token = cookies.get('todo_token');

      const requestBody = {
        title: taskTitle
      }
      
      const task = await fetch("https://todo-1wo5.onrender.com/todos", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Authorization": "Bearer " + token,
          "Content-Type": "application/json"
        }
      })

      setTaskTitle("");
      handleListAllTodos(token)

    } else{
      alert("Insira uma tarefa com 2 ou mais dígitos")
    }
    setIsLoading(false);
  }

  async function deleteTask(id:string){
    setIsLoading(true);
    const token = cookies.get('todo_token');

    const task = await fetch(`https://todo-1wo5.onrender.com/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": "Bearer " + token,
          "Content-Type": "application/json"
        }
      })

    const newTask = tasks.filter(task => task.id !== id);
    setTasks(newTask);
    handleListAllTodos(token)
    setIsLoading(false);
  }

  async function setTaskCompletedOrPending(id: string){
    setIsLoading(true);
    const token = cookies.get('todo_token');

    const task = await fetch(`https://todo-1wo5.onrender.com/todos/${id}`, {
        method: "PUT",
        headers: {
          "Authorization": "Bearer " + token,
          "Content-Type": "application/json"
        }
      })

    handleListAllTodos(token).then()
    setIsLoading(false);
  }

  useEffect(() => {
    setIsLoading(true);
    if(!cookies.get("dontAsk")) {
      cookies.set("dontAsk", false)
    }

    const token = cookies.get('todo_token');
    if (!token){
      navigate('/');
    }
    handleListAllTodos(token).then(()=> {setIsLoading(false)})
  },[])

  return (
    <div className="w-full h-screen flex flex-col items-center bg-zinc-900 md:overflow-visible lg:overflow-clip">
      <div className="flex items-center py-16 gap-4">
        <ListChecks size="32" className="text-violet-500"/>
        <h1 className="text-2xl font-bold text-white">Todo</h1>
      </div>

        <form 
          onSubmit={e => handleAddTask(e)}
          className="max-w-2xl w-full"
        >
          <div className="max-w-2xl w-full flex gap-2 h-full flex-col px-5 items-center
                          md:flex-row md:px-0 md:gap-8">
            <input 
              type="text"
              onChange={e => setTaskTitle(e.target.value)}
              value={taskTitle}
              minLength={2}
              className="w-full bg-zinc-700 rounded px-5 py-3 placeholder:text-zinc-400 text-white outline-none focus:border border-zinc-400"
              placeholder="Insira sua tarefa"
            />
            <button 
              className="flex items-center gap-2 px-10 py-3 bg-zinc-700 rounded text-white hover:bg-zinc-600 transition w-max
                          md:p-3"
              type="submit"
            >
              Criar
              <PlusCircle size="20" weight="bold"/>
            </button>
          </div>
        </form>

      <div className="w-full h-full bg-cover bg-zinc-800 mt-8 flex flex-col items-center py-5 lg:pt-5 px-5 md:px-0">
        <div className="max-w-2xl w-full flex flex-col items-center">

          {/* Task Status */}

          <div className="w-full flex justify-between">
            <div className="flex items-center gap-2">
              <span className="text-white">
                Tarefas criadas
              </span>
              <div className="flex rounded-[100%] bg-zinc-700 h-5 w-5 text-xs items-center justify-center">
                <span className="text-violet-500 font-bold">
                  {tasks.length}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white">
                Concluídas
              </span>
              <div className="flex rounded-[100%] bg-zinc-700 h-5 w-5 text-xs items-center justify-center">
                <span className="text-violet-500 font-bold">
                  {tasks.filter(task => task.completed === true).length}
                </span>
              </div>
            </div>
          </div>

          { /* Task Cards */ }

          {
            tasks.length !== 0
            ? 
            <div className="flex flex-col w-full h-full mt-5 gap-5">

              <div className="flex flex-col items-center overflow-hidden">
                <strong className="text-white font-bold">
                  Tarefas pendentes &#128293;
                </strong>

                {
                  tasks.filter(task => task.completed == false).length >= 1
                  ? 
                  <ScrollArea.Root className="mt-5 flex max-h-[250px] w-full gap-2 scroll-m-1">
                    <ScrollArea.Viewport className="w-full rounded">
                      <div className="w-full pr-1 flex flex-col gap-2">
                        {tasks.filter(task => task.completed == false).map(task => 
                          <TaskCard 
                            key={task.id} 
                            id={task.id}
                            completed={task.completed} 
                            date={task.date} 
                            title={task.title} 
                            deleteTask={deleteTask}
                            setTaskCompleted={() => setTaskCompletedOrPending(task.id)}
                          />)}
                      </div>
                      
                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar 
                      orientation="horizontal"
                      className="flex h-full p-1 select-none touch-none rounded-b bg-zinc-900" 
                    >
                      <ScrollArea.Thumb className="flex-1 p-2 border rounded"/>
                    </ScrollArea.Scrollbar>
                    <ScrollArea.Scrollbar 
                      orientation="vertical"
                      className="flex h-full p-1 select-none touch-none rounded-r bg-zinc-900"
                    >
                      <ScrollArea.Thumb className="flex-1 w-1 bg-zinc-900 border rounded"/>
                    </ScrollArea.Scrollbar>
                    <ScrollArea.Corner />
                  </ScrollArea.Root>
                  : 
                  <div className="flex flex-col items-center w-full h-full mt-5 gap-2 text-zinc-400">
                    <Checks size={32} weight="bold" className="text-white"/>
                    <strong className="font-semibold">Parece que você não tem tarefas pendentes &#x1F973;</strong>
                    <span>Aproveite para descansar e tomar um café &#x2615; </span>
                  </div>
                }

                
              </div>

              <div className="flex flex-col items-center overflow-hidden">
                <strong className="text-white font-bold">
                  Tarefas completas &#128079;
                </strong>

                {
                  tasks.filter(task => task.completed == true).length >= 1
                  ?
                  <ScrollArea.Root className="mt-5 flex h-[250px] w-full gap-2 scroll-m-1">
                    <ScrollArea.Viewport className="w-full rounded">
                      <div className="w-full pr-1 flex flex-col gap-2">
                        {tasks.filter(task => task.completed == true).map(task => 
                          <TaskCard 
                            key={task.id} 
                            id={task.id}
                            completed={task.completed} 
                            date={task.date} 
                            title={task.title} 
                            deleteTask={deleteTask}
                            setTaskCompleted={() => setTaskCompletedOrPending(task.id)}
                          />)}
                      </div>
                      
                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar 
                      orientation="horizontal"
                      className="flex h-full p-2 select-none touch-none rounded-b bg-zinc-900" 
                    >
                      <ScrollArea.Thumb className="flex-1 p-2 bg-black border rounded"/>
                    </ScrollArea.Scrollbar>
                    <ScrollArea.Scrollbar 
                      orientation="vertical"
                      className="flex h-full p-1 select-none touch-none rounded-r bg-zinc-900"
                    >
                      <ScrollArea.Thumb className="flex-1 w-1 bg-black border rounded"/>
                    </ScrollArea.Scrollbar>
                    <ScrollArea.Corner />
                  </ScrollArea.Root>
                  :
                  <div className="flex flex-col items-center w-full h-full mt-5 gap-2 text-zinc-400">
                    <Warning size={32} weight="bold" className="text-white"/>
                    <strong className="font-semibold">Parece que você não tem tarefas completas &#x1FAE0;</strong>
                    <span>Confiamos em você &#x1F642;</span>
                  </div>
                }

                
              </div>
            </div>
            :
            <div className="flex flex-col items-center w-full h-full mt-5 gap-2 text-zinc-400">
              <Scroll size={64} />
              <strong className="font-semibold">Você ainda não tem tarefas cadastradas</strong>
              <span>Crie tarefas e organize seu dia</span>
            </div>
          }

          
        </div>
      </div>
      {
        isLoading == true &&
        <Loading />
      }
    </div>
  )
}