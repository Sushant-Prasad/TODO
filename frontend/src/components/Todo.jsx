import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  getAllTodos,
  addTodo,
  updateTodo,
  deleteTodoById,
} from "../services/todoServices";
import { CircleUserRound, Plus } from "lucide-react";
import TickIcon from "./icons/TickIcon";
import DeleteIcon from "./icons/DeleteIcon";
import EditIcon from "./icons/EditIcon";
import EditTodo from "./EditTodo";

const Todo = () => {
  const [task, setTask] = useState("");        // Input for new task
  const [editId, setEditId] = useState(null);  // ID of task being edited
  const queryClient = useQueryClient();        // Query client for invalidating cache

  //Fetch all todos
  const {
    data: todos,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getAllTodos,
  });

  // Mutation to add a todo
  const addMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      toast.success("Todo added!");
      setTask("");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to add todo");
    },
  });

  // Mutation to toggle complete status
  const toggleMutation = useMutation({
    mutationFn: ({ id, data }) => updateTodo(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: () => toast.error("Failed to toggle status"),
  });

  //Mutation to delete a todo
  const deleteMutation = useMutation({
    mutationFn: deleteTodoById,
    onSuccess: () => {
      toast.success("Todo deleted!");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: () => toast.error("Failed to delete todo"),
  });

  //Submit handler to add new todo
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return toast.error("Task cannot be empty");
    addMutation.mutate({ name: task });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">
        {/* Header */}
        <div className="flex justify-center mb-4">
          <CircleUserRound size={40} className="text-[#07659f]" />
        </div>
        <h1 className="text-2xl font-bold text-center text-[#07659f] mb-6">Todo App</h1>

        {/* Add New Task Form */}
        <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Add a new task"
            required
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="shadow-md flex-1 border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#07659f]"
          />
          <button
            type="submit"
            className="shadow-md hover:bg-slate-400 text-primary p-2 rounded-lg transition"
          >
            <Plus size={25} className="text-[#07659f]" />
          </button>
        </form>

        {/* Loading or Error State */}
        {isLoading && <p className="text-center text-gray-500">Loading todos...</p>}
        {isError && <p className="text-center text-red-500">Error: {error.message}</p>}

        {/* Todo List */}
        <ul className="space-y-2">
          {todos?.map((todo) => (
            <li
              key={todo._id}
              className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border shadow-md"
            >
              {/* If in edit mode, show edit input */}
              {editId === todo._id ? (
                <EditTodo todo={todo} onCancel={() => setEditId(null)} />
              ) : (
                <>
                  {/* Task Text */}
                  <span className={`flex-1 ${todo.isCompleted ? "line-through text-gray-400" : ""}`}>
                    {todo.name}
                  </span>

                  {/* Action Buttons */}
                  <div className="flex gap-2 items-center">
                    {/* Toggle Complete */}
                    <button
                      onClick={() =>
                        toggleMutation.mutate({
                          id: todo._id,
                          data: { isCompleted: !todo.isCompleted },
                        })
                      }
                      title="Toggle status"
                    >
                      <TickIcon
                        className={`transition ease-in-out hover:cursor-pointer p-0.5 rounded-full ${
                          todo.isCompleted
                            ? "text-white bg-[#07659f]"
                            : "bg-transparent text-[#07659f]"
                        }`}
                        size={24}
                      />
                    </button>

                    {/* Edit Todo */}
                    <button
                      onClick={() => setEditId(todo._id)}
                      title="Edit"
                      className="text-primary"
                    >
                      <EditIcon />
                    </button>

                    {/* Delete Todo */}
                    <button
                      onClick={() => deleteMutation.mutate(todo._id)}
                      title="Delete"
                      className="text-primary"
                    >
                      <DeleteIcon className="text-[#f72727]" />
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
