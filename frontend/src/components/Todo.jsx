import React from 'react'
import toast from 'react-hot-toast'
import DeleteIcon from './icons/DeleteIcon'
import EditIcon from './icons/EditIcon'
import TickIcon from './icons/TickIcon'
import { CircleUserRound, Plus } from 'lucide-react'

const Todo = () => {
  return (
    <div >
      <div>
        <CircleUserRound/>
        </div>
        <h1>Todo App</h1>
        <form action="" className='flex gap-4 items-center'>
          <input
            type="text"
            placeholder='Add a new task'
            className='border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <button><Plus size={25}/></button>
        </form>


    </div>
  )
}

export default Todo
