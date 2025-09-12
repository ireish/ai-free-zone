import { useState } from 'react'
import { SearchBox } from './SearchBox'

export default function TodoApp() {
  
  const [taskList, setTaskList] = useState([])

  const updateTaskList = (task) => {
    setTaskList( prevList => [...prevList, task] )
  }
  
  return (
    <>
      <SearchBox taskList = {taskList} updateTaskList = {updateTaskList} />
    </>
  )
}