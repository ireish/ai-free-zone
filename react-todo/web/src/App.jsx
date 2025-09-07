import { useState } from 'react'
import './component/SearchBox'
import './App.css'
import { SearchBox } from './component/SearchBox'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>TO-DO App</h1>
      <SearchBox/>
    </>
  )
}

export default App
