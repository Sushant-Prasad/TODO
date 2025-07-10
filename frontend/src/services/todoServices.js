
const BASE_URL = 'http://localhost:3000/api/todos';

//Get all todos
export const getAllTodos = async () => {
  const res = await fetch('http://localhost:3000/api/todos');
  if (!res.ok) throw new Error('Failed to fetch todos');
  return res.json();
};
export const getTodoById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch todo');
  return res.json();
}

//Add a new todo
export const addTodo = async (newTodo) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTodo),
  });
  if (!res.ok) throw new Error('Failed to add todo');
  return res.json();
};

//Update an existing todo
export const updateTodo = async (id, updatedTodo) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedTodo),
  });
  if (!res.ok) throw new Error('Failed to update todo');
  return res.json();
};

// Delete a todo by its ID
export const deleteTodoById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete todo');
  return res.json();
};
