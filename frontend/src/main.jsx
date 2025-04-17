import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter,  Route,Routes } from "react-router-dom";
import Todo from "./components/Todo";
import Login from "./components/Login";
import Register from "./components/Register";
import ErrorPage from "./components/ErrorPage";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter> 
    <Routes>
      <Route path= "/" element= {<Todo />}/>
      <Route path= "/login" element= {<Login />}/>
      <Route path= "/register" element= {<Register />}/>
    </Routes>
    </BrowserRouter>
  </StrictMode>
);
