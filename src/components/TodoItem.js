export default function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <li className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg mb-2 shadow-sm">
      <span
        onClick={() => toggleTodo(todo.id)}
        className={`cursor-pointer flex-grow ${
          todo.completed
            ? "line-through text-gray-400"
            : "text-gray-800"
        }`}
      >
        {todo.task}
      </span>
      <button
        onClick={() => deleteTodo(todo.id)}
        className="ml-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
      >
        ✕
      </button>
    </li>
  );
}
