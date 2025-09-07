import { useState, useEffect } from "react";

export default function TodoItem({ todo, toggleTodo, deleteTodo }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isNew, setIsNew] = useState(true);

  useEffect(() => {
    // Mark as not new after initial render to trigger slide-in animation
    const timer = setTimeout(() => setIsNew(false), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleDelete = () => {
    setIsDeleting(true);
    // Delay actual deletion to allow animation to complete
    setTimeout(() => deleteTodo(todo.id), 300);
  };

  const handleToggle = () => {
    toggleTodo(todo.id);
  };

  return (
    <li 
      className={`
        flex justify-between items-center 
        bg-gray-50 dark:bg-gray-700 
        px-3 py-2 rounded-lg mb-2 shadow-sm
        smooth-hover button-press
        transform transition-all duration-300 ease-out
        ${isNew ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}
        ${isDeleting ? 'animate-slide-out-down' : 'animate-slide-in-up'}
        ${todo.completed ? 'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500' : ''}
      `}
    >
      <div className="flex items-center flex-grow">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className="mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded 
                     focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 
                     focus:ring-2 dark:bg-gray-700 dark:border-gray-600 checkbox-animation
                     cursor-pointer"
        />
        <span
          onClick={handleToggle}
          className={`
            cursor-pointer flex-grow select-none
            transition-all duration-300 ease-in-out
            ${todo.completed
              ? "line-through text-gray-400 dark:text-gray-500 opacity-75"
              : "text-gray-800 dark:text-gray-200"
            }
          `}
        >
          {todo.task}
        </span>
      </div>
      
      <button
        onClick={handleDelete}
        className="ml-2 bg-red-500 hover:bg-red-600 active:bg-red-700 
                   text-white px-3 py-1 rounded-lg 
                   transition-all duration-200 ease-in-out
                   transform hover:scale-105 active:scale-95
                   hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50
                   button-press"
        aria-label="Delete todo"
      >
        ✕
      </button>
    </li>
  );
}
