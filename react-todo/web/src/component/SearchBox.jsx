import { useState } from "react"

export function SearchBox( { updateTaskList } ) {

    const [inputValue, setInputValue] = useState('')

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!inputValue) {
            alert('Cannot add empty task!')
        }
        else {
            updateTaskList(inputValue);
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