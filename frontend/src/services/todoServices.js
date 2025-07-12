const BASE_URL = 'http://localhost:3000/api/todos';

//Get all todos
export const getAllTodos = async () => {
  const res = await fetch(BASE_URL, {
    method: 'GET',
    credentials: 'include', //send cookies
  });
  if (!res.ok) throw new Error('Failed to fetch todos');
  return res.json();
};

//Get a todo by ID
export const getTodoById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'GET',
    credentials: 'include', //send cookies
  });
  if (!res.ok) throw new Error('Failed to fetch todo');
  return res.json();
};

//Add a new todo
export const addTodo = async (newTodo) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', //send cookies
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
    credentials: 'include', //send cookies
    body: JSON.stringify(updatedTodo),
  });
  if (!res.ok) throw new Error('Failed to update todo');
  return res.json();
};

//Delete a todo by ID
export const deleteTodoById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    credentials: 'include', //send cookies
  });
  if (!res.ok) throw new Error('Failed to delete todo');
  return res.json();
};
