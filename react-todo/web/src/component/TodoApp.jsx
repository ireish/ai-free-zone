import { useState } from 'react'
import { SearchBox } from './SearchBox'
import { Task } from './Task'

export default function TodoApp() {
  
  const [taskList, setTaskList] = useState([])

  const updateTaskList = (task) => {
    setTaskList( prevList => [...prevList, task] )
  }

  const updatedList = taskList.map( task => {
    return <li>
      <Task taskValue = {task} />
    </li>
  })
  
  return (
    <>
      <SearchBox updateTaskList = {updateTaskList} />
      <ul>{updatedList}</ul>
    </>
  )
}