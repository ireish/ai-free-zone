import { FaTrash } from 'react-icons/fa';

export function Task( { taskValue } ) {

    return (
        <div>
            <span>
                <p> {taskValue} <FaTrash/></p>
            </span>
        </div>
    )   
}