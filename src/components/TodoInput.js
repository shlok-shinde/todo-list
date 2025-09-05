import { useState } from "react";

export default function TodoInput({ addTodo }) {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    addTodo(task.trim());
    setTask("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
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
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Add
      </button>
    </form>
  );
}
