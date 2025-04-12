export const getAllTodos = async (req,res,next)=>{
  res.send("All todos")
}

export const getTodoById = async (req,res,next)=>{
  res.send(`get tody by id : ${req.params.id}`)
}
export const postCreateTodo = async (req,res,next)=>{
  res.send("created todo")
}
export const putUpdateTodo = async (req,res,next)=>{
  console.log(req.params.id)
  res.send(req.params.id)
}
export const deleteTodoById = async (req,res,next)=>{
  console.log(req.params.id)
  res.send(`deleted id is : ${req.params.id}`)
}