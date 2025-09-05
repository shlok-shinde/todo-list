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
        <div className="flex gap-2 mt-4 justify-center">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-lg ${
              filter === "all"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`px-3 py-1 rounded-lg ${
              filter === "active"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            Active
          </button>
          <button 
            onClick={() => setFilter("completed")}
            className={`px-3 py-1 rounded-lg ${
              filter === "completed"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
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
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => setTodos(todos.filter((todo) => !todo.completed))}
            className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded-lg"
          >
            Clear Completed
          </button>
          <button
            onClick={() => setTodos([])}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg"
          >
            Clear All
          </button>

          {/*Toggle dark mode*/}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="absolute top-4 right-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-3 py-1 rounded-lg text-sm transition"
          >
            Toggle Theme
          </button>
        </div>
      </div>
    </div>
  );
}