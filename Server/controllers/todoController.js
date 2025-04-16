
import Todo from "../model/todoModel.js";
import { createError } from "../utils/error.js";

// Get all todos for the currently logged-in user
export const getAllTodos = async (req, res, next) => {
  
  const todos = await Todo.find({ userId: req.user.id }); // Fetch todos by user ID
  res.status(200).send(todos); // Send todos as response
};

// Get a single todo by its ID
export const getTodoById = async (req, res, next) => {
  try {
  
    const todo = await Todo.findById(req.params.id); // Find todo by ID

    if (!todo) {
      return next(createError(404, "Todo Not Found")); // If not found, send error
    }

    if (todo.userId.toString() != req.user.id) {
      return next(createError(404, "Not Authorized")); // Ensure user owns the todo
    }

    res.status(200).send(todo); // Send the todo
  } catch (error) {
    return next(createError(404, "Todo Not Found")); // Handle DB errors
  }
};

// Create a new todo
export const postCreateTodo = async (req, res, next) => {
  console.log(req.body);

  if (!req.body || !req.body.name) {
    return next(createError(404, "Name is required")); // Ensure name field is provided
  }



  const newTodo = new Todo({
    name: req.body.name, // Set todo name
    userId: req.user.id, // Link todo to user
  });

  await newTodo.save(); // Save todo to DB

  res.status(201).json(newTodo); // Respond with created todo
};

// Update an existing todo
export const putUpdateTodo = async (req, res, next) => {
  const id = req.params.id;

  if (!req.body) {
    return next(createError(400, "Missing Fields")); // Ensure request body is not empty
  }

  try {
 

    const todo = await Todo.findById(id); // Find todo by ID

    if (todo.userId.toString() != req.user.id) {
      return next(createError(404, "Not Authorized")); // Ensure user owns the todo
    }

    todo.name = req.body.name || todo.name; // Update name if provided

    if (req.body.isCompleted != undefined) {
      todo.isCompleted = req.body.isCompleted; // Update completion status
    }

    await todo.save(); // Save changes
    res.status(200).json({ message: "Todo Updated Successfully!!" }); // Send success message
  } catch (error) {
    return next(createError(400, "Missing Fields")); // Handle errors
  }
};

// Delete a todo by its ID
export const deleteTodoById = async (req, res, next) => {
  try {
    const id = req.params.id;
 

    const todo = await Todo.deleteOne({
      _id: id,
      userId: req.user.id, // Ensure user owns the todo
    });

    if (!todo.deletedCount) {
      return next(createError(400, "Todo Not Found")); // If not deleted, send error
    }

    res.status(200).json({ message: "Todo Deleted Successfully!!" }); // Send success message
  } catch (error) {
    return next(createError(400, "Todo Not Found")); // Handle errors
  }
};
