import { useState } from "react";

export default function TodoInput({ addTodo }) {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(task);
    setTask("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="border border-gray-300 p-2 rounded-lg flex-grow focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Enter a task"
      />
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">
        Add
      </button>
    </form>
  );
}