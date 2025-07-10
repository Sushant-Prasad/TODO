import React from 'react';
import toast from 'react-hot-toast';
import DeleteIcon from './icons/DeleteIcon';
import EditIcon from './icons/EditIcon';
import TickIcon from './icons/TickIcon';

import { CircleUserRound, Plus } from 'lucide-react';

const Todo = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">
        {/* Header */}
        <div className="flex justify-center mb-4">
          <CircleUserRound size={40} className="text-blue-500" />
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Todo App</h1>

        {/* Form */}
        <form className="flex gap-3">
          <input
            type="text"
            placeholder="Add a new task"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition"
            onClick={(e) => {
              e.preventDefault();
              toast.success('Task added!');
            }}
          >
            <Plus size={25} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Todo;
