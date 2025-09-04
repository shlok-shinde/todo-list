import ToDoItem from "./TodoItem";

export default function TodoList({ todos, toggleTodo, deleteTodo }) {
  return (
    <ul>
      {todos.map((todo) => (
        <ToDoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
}