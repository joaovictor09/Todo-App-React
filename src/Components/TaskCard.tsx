import { Trash, Check } from "phosphor-react"
import * as Checkbox from "@radix-ui/react-checkbox"
import { useState } from "react"

interface TaskCardProps {
  title: string,
  completed: boolean,
  date: number,
  deleteTask: (date: number) => void,
  setTaskCompleted: () => void,
}

export function TaskCard(props: TaskCardProps){

  const [completed, setCompleted] = useState(props.completed)

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
      <button
        onClick={() => props.deleteTask(props.date)}
      >
        <Trash size={24} className="text-zinc-400"/>
      </button>
    </div>
  )
}