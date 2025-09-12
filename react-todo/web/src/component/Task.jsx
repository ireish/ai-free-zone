import { MdDelete } from 'react-icons/md';

export function Task( { taskValue } ) {

    return (
        <div className='task-item'>
            <span> {taskValue} <MdDelete/> </span>
        </div>
    )   
}