import { useState } from "react";
import { useEffect } from "react";
import TodoList from "./components/TodoList";
import TodoInput from "./components/TodoInput";

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

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


  const addTodo = (task) => {
    setTodos([...todos, {id: Date.now(), task, completed: false}]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? {...todo, completed: !todo.completed} : todo
      )
    );
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-lg rounded-2xl p-6">
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
          deleteTodo={deleteTodo}
        />

        {/* Clear buttons */}
        <div className="flex justify-center gap-2 mt-4 animate-fade-in">
          <button
            onClick={() => setTodos(todos.filter((todo) => !todo.completed))}
            className="bg-gray-700 hover:bg-gray-800 active:bg-gray-900 text-white px-3 py-1 rounded-lg
                       transition-all duration-200 ease-in-out
                       transform hover:scale-105 active:scale-95
                       focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50
                       button-press smooth-hover font-medium"
          >
            Clear Completed
          </button>
          <button
            onClick={() => setTodos([])}
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
        </div>
      </div>
    </div>
  );
}