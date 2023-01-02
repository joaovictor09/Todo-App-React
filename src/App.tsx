import { ListChecks, PlusCircle, Trash, Check } from "phosphor-react"

import * as Checkbox from "@radix-ui/react-checkbox"
import { TaskCard } from "./Components/TaskCard"
import { useState } from "react"

interface TasksProps {
  title: string,
  completed: boolean,
  date: number
}

export function App() {

  const [test, setTest] = useState<string[]>([]);
  const [tasks, setTasks] = useState<TasksProps[]>([])
  const [taskTitle, setTaskTitle] = useState("")

  function addTaskHandle(){
    if (taskTitle.length >= 3){
      const actualDate = Date.now();
      setTasks([...tasks, {title: taskTitle, completed:false, date:actualDate}])
      setTaskTitle("");
    } else{
      alert("Insira uma tarefa com mais de 3 dígitos")
    }
  }

  function deleteTaskHandle(date:number){
    setTasks(tasks.filter(task => task.date !== date));
    return
  }

  return (
    <div className="w-full h-screen flex flex-col items-center bg-zinc-900">
      <div className="flex items-center py-16 gap-4">
        <ListChecks size="32" className="text-violet-500"/>
        <h1 className="text-2xl font-bold text-white">Todo</h1>
      </div>

      <div className="max-w-2xl w-full flex gap-8">
        <input 
          type="text"
          onChange={e => setTaskTitle(e.target.value)}
          value={taskTitle}
          minLength={4}
          className="w-full p-3 bg-zinc-700 rounded placeholder:text-zinc-400 text-white outline-none focus:border border-zinc-400"
          placeholder="Insira sua tarefa"
        />
        <button 
          className="flex items-center gap-2 p-3 bg-zinc-700 rounded text-white hover:bg-zinc-600 transition"
          onClick={addTaskHandle}
        >
          Criar
          <PlusCircle size="20" weight="bold"/>
        </button>
      </div>

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
                  1
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white">
                Concluídas
              </span>
              <div className="flex rounded-[100%] bg-zinc-700 h-5 w-5 text-xs items-center justify-center">
                <span className="text-violet-500 font-bold">
                  1
                </span>
              </div>
            </div>
          </div>

          { /* Task Cards */ }

          <div className="w-full flex flex-col mt-5 gap-2">

            {tasks.map(task => <TaskCard key={task.date} completed={task.completed} date={task.date} title={task.title} deleteTask={deleteTaskHandle}/>)}

          </div>

          <div>

          </div>
        </div>
      </div>
    </div>
  )
}