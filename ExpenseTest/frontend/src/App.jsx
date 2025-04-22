import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Register from "./Components/Pages/Register";
import Login from "./Components/Pages/Login";
import Expense from "./Components/Pages/Expense";
import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/expense" element={<Expense />} />
      </Routes>
    </>
  );
}

export default App;
