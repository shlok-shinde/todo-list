import ToDoItem from "./TodoItem";

export default function TodoList({ todos, toggleTodo, deleteTodo, editTodo }) {
  return (
    <ul>
      {todos.map((todo) => (
        <ToDoItem
          key={todo._id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      ))}
    </ul>
  );
}