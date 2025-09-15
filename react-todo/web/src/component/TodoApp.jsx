import { useState } from 'react'
import { SearchBox } from './SearchBox'
import { Task } from './Task'

export default function TodoApp() {

  const [taskList, setTaskList] = useState([])

  const updateTaskList = (task) => {
    setTaskList(prevList => [...prevList, task])
  }

  return (
    <>
      <SearchBox updateTaskList={updateTaskList} />
      <ul>
        { taskList.map(task => {
          return <li>
            <Task taskValue={task} />
          </li>
        })} 
      </ul>
    </>
  )
}