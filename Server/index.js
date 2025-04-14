
import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import todoRouter from "./routes/todoRouter.js"
import bodyParser from "body-parser";


const app = express();
const PORT = process.env.PORT || 3000;


dotenv.config(); // Load .env values

app.use(bodyParser.json())
app.use("/api/user",authRouter);
app.use("/api/todos",todoRouter)

app.get("/", (req, res, next) => {
  res.send("Hello World");
});

//global error handling middleware
app.use((err,req,res,next)=>{
  const statusCode = err.statusCode || 500// Use provided status code or default to 500
  const message = err.message || "internal server error"// Use provided error message or default one
  res.status(statusCode).json({error:message})//sending error response
})

app.listen(PORT, () => {
  console.log(`server is listening at http://localhost:${PORT}`);
});
