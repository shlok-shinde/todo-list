import { useState } from "react";

export default function TodoInput({ addTodo }) {
  const [task, setTask] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    
    setIsSubmitting(true);
    addTodo(task.trim());
    setTask("");
    
    // Reset submitting state after animation
    setTimeout(() => setIsSubmitting(false), 200);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 animate-fade-in">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 px-3 py-2 rounded-lg border border-gray-300 
                   dark:border-gray-600 
                   bg-white dark:bg-gray-700 
                   text-gray-900 dark:text-gray-100
                   placeholder-gray-400 dark:placeholder-gray-300
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   transition-all duration-300 ease-in-out
                   transform focus:scale-[1.02] hover:shadow-md
                   smooth-hover"
      />
      <button
        type="submit"
        disabled={!task.trim()}
        className={`
          px-4 py-2 rounded-lg font-medium
          transition-all duration-200 ease-in-out
          transform hover:scale-105 active:scale-95
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
          button-press smooth-hover
          ${task.trim() 
            ? 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white shadow-md hover:shadow-lg' 
            : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
          }
          ${isSubmitting ? 'animate-pulse-once' : ''}
        `}
      >
        {isSubmitting ? '✓' : 'Add'}
      </button>
    </form>
  );
}
