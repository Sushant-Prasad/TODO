
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTodo } from '../services/todoServices';
import toast from 'react-hot-toast';
import { TiTick } from "react-icons/ti";
import { ImCancelCircle } from "react-icons/im";

const EditTodo = ({ todo, onCancel }) => {
  const [text, setText] = useState(todo.name);
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateTodo(id, data),
    onSuccess: () => {
      toast.success('Todo updated!');
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      onCancel();
    },
    onError: () => toast.error('Failed to update todo'),
  });

  const handleUpdate = () => {
    if (!text.trim()) return toast.error('Updated text cannot be empty');
    updateMutation.mutate({ id: todo._id, data: { name: text } });
  };

  return (
    <div className="flex flex-1 gap-2 items-center">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 border px-2 py-1 rounded"
        onKeyDown={(e) => e.key === 'Enter' && handleUpdate()}
      />
      <button
        onClick={handleUpdate}
        className="text-[#069af6] font-bold px-2"
        title="Save"
      >
        <TiTick  size={30}/>
      </button>
      <button
        onClick={onCancel}
        className="text-red-600 font-bold px-2"
        title="Cancel"
      >
       <ImCancelCircle size={30} />
      </button>
    </div>
  );
};

export default EditTodo;