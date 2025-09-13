import { useState, useEffect } from "react";

export default function TodoItem({ todo, toggleTodo, deleteTodo, editTodo }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(todo.task);
  const [editedDescription, setEditedDescription] = useState(todo.description);
  const [editedDeadline, setEditedDeadline] = useState(todo.deadline);

  useEffect(() => {
    const timer = setTimeout(() => setIsNew(false), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => deleteTodo(todo.id), 300);
  };

  const handleToggle = () => {
    toggleTodo(todo.id);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setIsExpanded(true); // Expand details when editing
  };

  const handleSaveEdit = () => {
    editTodo(todo.id, {
      task: editedTask,
      description: editedDescription,
      deadline: editedDeadline
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedTask(todo.task);
    setEditedDescription(todo.description);
    setEditedDeadline(todo.deadline);
    setIsEditing(false);
  };

  const formatDeadline = (deadline) => {
    if (!deadline) return null;
    const date = new Date(deadline);
    const now = new Date();
    const isOverdue = date < now && !todo.completed;
    const isToday = date.toDateString() === now.toDateString();
    const isTomorrow = date.toDateString() === new Date(now.getTime() + 24 * 60 * 60 * 1000).toDateString();
    
    let timeString = date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    if (isToday) timeString = `Today, ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    if (isTomorrow) timeString = `Tomorrow, ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;

    return {
      text: timeString,
      isOverdue,
      isToday,
      isTomorrow
    };
  };

  const deadlineInfo = formatDeadline(todo.deadline);
  const hasDetails = todo.description || todo.deadline;

  return (
    <li 
      className={`
        bg-gray-50 dark:bg-gray-700 
        rounded-lg mb-2 shadow-sm
        smooth-hover
        transform transition-all duration-300 ease-out
        ${isNew ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}
        ${isDeleting ? 'animate-slide-out-down' : 'animate-slide-in-up'}
        ${todo.completed ? 'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500' : ''}
        ${deadlineInfo?.isOverdue ? 'border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20' : ''}
      `}
    >
      {/* Main todo row */}
      <div className="flex items-center justify-between px-3 py-2">
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
          <div className="flex-grow">
            {isEditing ? (
              <input
                type="text"
                value={editedTask}
                onChange={(e) => setEditedTask(e.target.value)}
                className="block w-full p-2 text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 
                           rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                autoFocus
              />
            ) : (
              <span
                onClick={handleToggle}
                className={`
                  cursor-pointer select-none block
                  transition-all duration-300 ease-in-out
                  ${todo.completed
                    ? "line-through text-gray-400 dark:text-gray-500 opacity-75"
                    : "text-gray-800 dark:text-gray-200"
                  }
                `}
              >
                {todo.task}
              </span>
            )}
            
            {/* Deadline indicator */}
            {deadlineInfo && (
              <div className={`
                text-xs mt-1 font-medium
                ${deadlineInfo.isOverdue 
                  ? 'text-red-600 dark:text-red-400' 
                  : deadlineInfo.isToday 
                    ? 'text-orange-600 dark:text-orange-400'
                    : 'text-gray-500 dark:text-gray-400'
                }
              `}>
                📅 {deadlineInfo.text}
                {deadlineInfo.isOverdue && ' (Overdue)'}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          {/* Expand button */}
          {hasDetails && (
            <button
              onClick={toggleExpanded}
              className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200
                         transition-all duration-200 ease-in-out
                         transform hover:scale-110 active:scale-95
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                         rounded"
              aria-label="Toggle details"
            >
              {isExpanded ? '▼' : '▶'}
            </button>
          )}
          
          {/* Action buttons */}
          {isEditing ? (
            <>
              <button
                onClick={handleSaveEdit}
                className="ml-1 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 
                           text-white px-3 py-1 rounded-lg 
                           transition-all duration-200 ease-in-out
                           transform hover:scale-105 active:scale-95
                           hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                           button-press"
                aria-label="Save"
              >
                ✔️
              </button>
              <button
                onClick={handleCancelEdit}
                className="ml-1 bg-gray-500 hover:bg-gray-600 active:bg-gray-700 
                           text-white px-3 py-1 rounded-lg 
                           transition-all duration-200 ease-in-out
                           transform hover:scale-105 active:scale-95
                           hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50
                           button-press"
                aria-label="Cancel"
              >
                ✕
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleEdit}
                className="ml-1 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 
                           text-white px-3 py-1 rounded-lg 
                           transition-all duration-200 ease-in-out
                           transform hover:scale-105 active:scale-95
                           hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                           button-press"
                aria-label="Edit"
              >
                ✎️
              </button>
              <button
                onClick={handleDelete}
                className="ml-1 bg-red-500 hover:bg-red-600 active:bg-red-700 
                           text-white px-3 py-1 rounded-lg 
                           transition-all duration-200 ease-in-out
                           transform hover:scale-105 active:scale-95
                           hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50
                           button-press"
                aria-label="Delete todo"
              >
                ✕
              </button>
            </>
          )}
        </div>
      </div>

      {/* Expandable details section */}
      {(hasDetails || isEditing) && (
        <div className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}>
          <div className="px-3 pb-3 pt-1 border-t border-gray-200 dark:border-gray-600">
            {isEditing ? (
              <>
                {/* Deadline editor */}
                <div className="mb-3">
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Deadline:
                  </label>
                  <input
                    type="datetime-local"
                    value={editedDeadline ? new Date(editedDeadline).toISOString().slice(0, 16) : ''}
                    onChange={(e) => setEditedDeadline(e.target.value ? new Date(e.target.value).toISOString() : null)}
                    className="w-full text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded p-2"
                  />
                </div>
                
                {/* Description editor */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Description:
                  </label>
                  <textarea
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    className="w-full text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded p-2"
                    rows="3"
                  />
                </div>
              </>
            ) : (
              <>
                {todo.description && (
                  <div className="mb-2">
                    <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Description:
                    </div>
                    <div className="text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 
                                   rounded p-2 whitespace-pre-wrap">
                      {todo.description}
                    </div>
                  </div>
                )}
                
                {todo.deadline && (
                  <div>
                    <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Full Deadline:
                    </div>
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      {new Date(todo.deadline).toLocaleString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </li>
  );
}
