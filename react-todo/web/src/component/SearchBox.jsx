import { useState } from "react"
import { Task } from './Task'

export function SearchBox() {

    const [inputValue, setInputValue] = useState('')
    const [taskList, setTaskList] = useState([])

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!inputValue) {
            alert('Cannot add empty task!')
        }
        else {
            setTaskList((prevArr) => [...prevArr, inputValue])
            setInputValue('')
        }
    }

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <span>
                    <input
                        type="text"
                        id="search-input"
                        placeholder="Enter a task . . ."
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value)
                        }}
                    />
                    <button type="submit"> ADD </button>
                </span>
            </form>
        </div>
    )
}