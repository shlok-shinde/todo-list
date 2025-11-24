import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import TodoList from "./components/TodoList";
import TodoInput from "./components/TodoInput";
import Login from "./components/Login";
import Register from "./components/Register";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const[newUser, setNewUser] = useState(true);
  const [loggedIn, setLoggedIn] = useState(token ? true : false);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const [todos, setTodos] = useState([]);

  const [filter, setFilter] = useState("all");
  const filteredTodos = todos.filter(todo => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme); // ✅ store as string
  }, [theme]);


  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const getTodos = async () => {
      try {
        if (token) {
        setLoggedIn(true);
        const res = await axios.get("/api/todos", {
          headers: {
            "x-auth-token": token
          }
        })
        setTodos(res.data);
        } else {
          setLoggedIn(false);
          setTodos([]);
        }
      } catch (err) {
        console.log(err);
        setLoggedIn(false);
        setTodos([]);
      }
    }
    getTodos();
  }, [token]);

  const getConfig = () => {
    return {
      headers: {
        "x-auth-token": token
      }
    }
  };

  const addTodo = async (task, description = "", deadline = "") => {
    try {
      const res = await axios.post("/api/todos", {
        task: task,
        description: description,
        deadline: deadline
      }, getConfig());
      setTodos([res.data, ...todos]);
    } catch (err) {
      console.log(err);
      alert("Error adding todo");
    }
  }

  const toggleTodo = async (id) => {
    const todoToggle = todos.find(todo => todo._id === id);
    const updatedStatus = !todoToggle.completed;
    try {
      const res = await axios.put(`/api/todos/${id}`, {
        completed: updatedStatus
      }, getConfig());
      setTodos(todos.map(todo => todo._id === id ? res.data : todo));
    } catch (err) {
      console.log(err);
      alert("Error toggling todo");
    }
  }

  const editTodo = async (id, updatedFields) => {
    if (updatedFields.deadline) {
      const selectedDate = new Date(updatedFields.deadline);
      const now = new Date();

      if (selectedDate < now) {
        alert("You cannot set a deadline in the past!");
        return; 
      }
    }
    try {
      const res = await axios.put(`/api/todos/${id}`, updatedFields, getConfig());
      setTodos(todos.map(todo => todo._id === id ? res.data : todo));
    } catch (err) {
      console.log(err);
      alert("Error editing todo");
    }
  }

  const deleteTodo = async (id) => {
    try {
      const res = await axios.delete(`/api/todos/${id}`, getConfig());
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      console.log(err);
      alert("Error deleting todo");
    }
  } 

  const clearCompleted = async () => {
    try {
      await axios.delete("/api/todos/completed", getConfig());
      setTodos(todos.filter((todo) => !todo.completed));
    } catch (err) {
      console.error(err);
      alert("Error clearing completed todos");
    }
  };

  const clearAll = async () => {
    if (window.confirm("Are you sure you want to delete ALL tasks?")) {
      try {
        await axios.delete("/api/todos/all", getConfig());
        setTodos([]);
      } catch (err) {
        console.error(err);
        alert("Error clearing all todos");
      }
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    window.location.replace("/");
  }
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-lg rounded-2xl p-6 mx-4">
          <h1 className="text-2xl font-bold mb-6 text-center">
            {newUser ? "Create Account" : "Welcome Back"}
          </h1>

          {/* 1. Show Register or Login component based on newUser state */}
          {newUser ? <Register /> : <Login />}
           
          {/* 2. Add a button to toggle newUser state (e.g. "Switch to Login") */}
          <button
            onClick={() => setNewUser(!newUser)}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 button-press smooth-hover"
          >
            {newUser ? "Switch to Login" : "Switch to Register"}
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-lg rounded-2xl p-6 mx-4">
        <h1 className="text-2xl font-bold mb-6 text-center">To-Do List</h1>

        <TodoInput addTodo={addTodo} />

        {/* Filters */}
        <div className="flex gap-2 mt-4 justify-center animate-fade-in">
          <button
            onClick={() => setFilter("all")}
            className={`
              px-3 py-1 rounded-lg font-medium
              transition-all duration-300 ease-in-out
              transform hover:scale-105 active:scale-95
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
              button-press smooth-hover
              ${filter === "all"
                ? "bg-blue-500 hover:bg-blue-600 text-white shadow-md"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }
            `}
          >
            All
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`
              px-3 py-1 rounded-lg font-medium
              transition-all duration-300 ease-in-out
              transform hover:scale-105 active:scale-95
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
              button-press smooth-hover
              ${filter === "active"
                ? "bg-blue-500 hover:bg-blue-600 text-white shadow-md"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }
            `}
          >
            Active
          </button>
          <button 
            onClick={() => setFilter("completed")}
            className={`
              px-3 py-1 rounded-lg font-medium
              transition-all duration-300 ease-in-out
              transform hover:scale-105 active:scale-95
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
              button-press smooth-hover
              ${filter === "completed"
                ? "bg-blue-500 hover:bg-blue-600 text-white shadow-md"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }
            `}
          >
            Completed
          </button>
        </div>

        <br />
        
        <TodoList
          todos={filteredTodos ?? todos}
          toggleTodo={toggleTodo}
          editTodo={editTodo}
          deleteTodo={deleteTodo}
        />

        {/* Clear buttons */}
        <div className="flex justify-center gap-2 mt-4 animate-fade-in">
          <button
            onClick={clearCompleted}
            className="bg-gray-700 hover:bg-gray-800 active:bg-gray-900 text-white px-3 py-1 rounded-lg
                       transition-all duration-200 ease-in-out
                       transform hover:scale-105 active:scale-95
                       focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50
                       button-press smooth-hover font-medium"
          >
            Clear Completed
          </button>
          <button
            onClick={clearAll}
            className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white px-3 py-1 rounded-lg
                       transition-all duration-200 ease-in-out
                       transform hover:scale-105 active:scale-95
                       focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50
                       button-press smooth-hover font-medium"
          >
            Clear All
          </button>

          {/*Toggle dark mode*/}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="absolute top-4 right-4 
                       bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600
                       text-gray-800 dark:text-gray-100 px-3 py-1 rounded-lg text-sm font-medium
                       transition-all duration-300 ease-in-out
                       transform hover:scale-105 active:scale-95 hover:rotate-12
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                       button-press smooth-hover shadow-md hover:shadow-lg"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          {/*Logout button*/}
            <button
              onClick={handleLogout}
              className="absolute top-4 right-16
                        bg-red-600 hover:bg-red-700 active:bg-red text-white px-3 py-1 rounded-lg
                        transition-all duration-200 ease-in-out
                        transform hover:scale-105 active:scale-95
                        focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50
                        button-press smooth-hover font-medium"
            >
              Logout
            </button>
        </div>
      </div>
    </div>
  );
}