//external module
import express from "express";
//local module
import authRouter from "./routes/authRouter.js";
import todoRouter from "./routes/todoRouter.js"


const app = express();

app.use("/api/user",authRouter);
app.use("/api/todos",todoRouter)

app.get("/", (req, res, next) => {
  res.send("Hello World");
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is listening at http://localhost:${PORT}`);
});
