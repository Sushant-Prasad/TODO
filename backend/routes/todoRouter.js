import express from "express";
import {
  deleteTodoById,
  getTodoById,
  getAllTodos,
  postCreateTodo,
  putUpdateTodo,
} from "../controllers/todoController.js";
import { verifyToken } from "../utils/verifytoken.js"; // Middleware to verify JWT

const todoRouter = express.Router(); // Initialize a router for todo routes

// Route to get all todos for the logged-in user
todoRouter.get("/", verifyToken, getAllTodos);

// Route to get a specific todo by its ID
todoRouter.get("/:id", verifyToken, getTodoById);

// Route to create a new todo
todoRouter.post("/", verifyToken, postCreateTodo);

// Route to update a todo by its ID
todoRouter.put("/:id", verifyToken, putUpdateTodo);

// Route to delete a todo by its ID
todoRouter.delete("/:id", verifyToken, deleteTodoById);

export default todoRouter; // Export the router to use in index.js
