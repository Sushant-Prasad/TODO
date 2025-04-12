import express from "express"
import { deleteTodoById, getTodoById, getAllTodos, postCreateTodo, putUpdateTodo } from "../controllers/todoController.js"

const todoRouter = express.Router()


todoRouter.get("/",getAllTodos)
todoRouter.get("/:id",getTodoById)

todoRouter.post("/",postCreateTodo)
todoRouter.put("/:id",putUpdateTodo )
todoRouter.delete("/:id",deleteTodoById)

export default todoRouter;