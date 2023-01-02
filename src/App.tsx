import { Checks, ListChecks, PlusCircle, Scroll, Warning } from "phosphor-react"
import { useCookies } from "react-cookie";
import Cookies from 'universal-cookie';
import { useEffect, useState } from "react"
import * as ScrollArea from '@radix-ui/react-scroll-area';

import { TaskCard } from "./Components/TaskCard"

interface TasksProps {
  title: string,
  completed: boolean,
  date: number
}

export function App() {

  const cookies = new Cookies();
  const [tasks, setTasks ] = useState<TasksProps[]>(cookies.get('tasks') || []);
  const [taskTitle, setTaskTitle] = useState("");
  // const [cookies, setCookie] = useCookies(['tasks']);


  function addTask(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();

    if (taskTitle.length >= 3){
      const actualDate = Date.now();
      setTasks([...tasks, {title: taskTitle, completed:false, date:actualDate}])
      setTaskTitle("");
    } else{
      alert("Insira uma tarefa com mais de 3 dígitos")
    }
  }

  function deleteTask(date:number){
    const newTask = tasks.filter(task => task.date !== date);
    setTasks(newTask);
  }

  function setTaskCompletedOrPending(date: number){
    const newTasks = tasks;

    const index = tasks.findIndex(task => task.date == date);
    newTasks[index].completed = !newTasks[index].completed;

    const completedTasks = newTasks.filter(task => task.completed == true);
    const pendingTasks = newTasks.filter(task => task.completed == false);

    setTasks(completedTasks.concat(pendingTasks));
  }

  useEffect(() => {
    // setCookie('tasks', tasks, { path: '/' })
    cookies.set('tasks', JSON.stringify(tasks), { path: '/' });
    console.log("tasks", cookies.get('tasks'));
  }, [tasks])

  return (
    <div className="w-full h-screen flex flex-col items-center bg-zinc-900 overflow-clip">
      <div className="flex items-center py-16 gap-4">
        <ListChecks size="32" className="text-violet-500"/>
        <h1 className="text-2xl font-bold text-white">Todo</h1>
      </div>

        <form 
          onSubmit={e => addTask(e)}
          className="max-w-2xl w-full"
        >
          <div className="max-w-2xl w-full flex gap-8 h-full">
            <input 
              type="text"
              onChange={e => setTaskTitle(e.target.value)}
              value={taskTitle}
              minLength={4}
              className="w-full bg-zinc-700 rounded px-5 placeholder:text-zinc-400 text-white outline-none focus:border border-zinc-400"
              placeholder="Insira sua tarefa"
            />
            <button 
              className="flex items-center gap-2 p-3 bg-zinc-700 rounded text-white hover:bg-zinc-600 transition"
              type="submit"
            >
              Criar
              <PlusCircle size="20" weight="bold"/>
            </button>
          </div>
        </form>

      <div className="w-full h-full bg-zinc-800 mt-8 flex flex-col items-center py-5">
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
                    <ScrollArea.Viewport className="w-full">
                      <div className="w-full pr-4 flex flex-col gap-2">
                        {tasks.filter(task => task.completed == false).map(task => 
                          <TaskCard 
                            key={task.date} 
                            completed={task.completed} 
                            date={task.date} 
                            title={task.title} 
                            deleteTask={deleteTask}
                            setTaskCompleted={() => setTaskCompletedOrPending(task.date)}
                          />)}
                      </div>
                      
                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar 
                      orientation="horizontal"
                      className="flex h-full p-2 select-none touch-none bg-zinc-900" 
                    >
                      <ScrollArea.Thumb className="flex-1 p-2 bg-black border rounded"/>
                    </ScrollArea.Scrollbar>
                    <ScrollArea.Scrollbar 
                      orientation="vertical"
                      className="flex h-full p-2 select-none touch-none bg-zinc-900"
                    >
                      <ScrollArea.Thumb className="flex-1 w-1 bg-black border rounded"/>
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
                    <ScrollArea.Viewport className="w-full">
                      <div className="w-full pr-4 flex flex-col gap-2">
                        {tasks.filter(task => task.completed == true).map(task => 
                          <TaskCard 
                            key={task.date} 
                            completed={task.completed} 
                            date={task.date} 
                            title={task.title} 
                            deleteTask={deleteTask}
                            setTaskCompleted={() => setTaskCompletedOrPending(task.date)}
                          />)}
                      </div>
                      
                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar 
                      orientation="horizontal"
                      className="flex h-full p-2 select-none touch-none bg-zinc-900" 
                    >
                      <ScrollArea.Thumb className="flex-1 p-2 bg-black border rounded"/>
                    </ScrollArea.Scrollbar>
                    <ScrollArea.Scrollbar 
                      orientation="vertical"
                      className="flex h-full p-2 select-none touch-none bg-zinc-900"
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
    </div>
  )
}