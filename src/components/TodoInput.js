 import { useState } from "react";

export default function TodoInput({ addTodo }) {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    
    setIsSubmitting(true);
    addTodo(task.trim(), description.trim(), deadline);
    setTask("");
    setDescription("");
    setDeadline("");
    setShowDetails(false);
    
    // Reset submitting state after animation
    setTimeout(() => setIsSubmitting(false), 200);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Main task input row */}
        <div className="pl-1 pr-2">
          <div className="flex gap-2">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Add a new task..."
            className="flex-1 px-3 py-2 rounded-lg border border-gray-300 
                       dark:border-gray-600 
                       bg-white dark:bg-gray-700 
                       text-gray-900 dark:text-gray-100
                       placeholder-gray-400 dark:placeholder-gray-300
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       transition-all duration-300 ease-in-out
                       hover:shadow-md
                       smooth-hover"
          />
          <button
            type="button"
            onClick={toggleDetails}
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                       bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300
                       hover:bg-gray-50 dark:hover:bg-gray-600
                       transition-all duration-200 ease-in-out
                       transform hover:scale-105 active:scale-95
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                       button-press smooth-hover"
            title="Add details"
          >
            {showDetails ? '−' : '+'}
          </button>
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
        </div>
        </div>

        {/* Expandable details section */}
        <div className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${showDetails ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}>
          <div className="space-y-3 pt-2 pb-4 pl-1 pr-2">
            {/* Description input */}
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="Add a description (optional)..."
              rows="2"
              className="w-full px-2 py-2 rounded-lg border border-gray-300 
                         dark:border-gray-600 
                         bg-white dark:bg-gray-700 
                         text-gray-900 dark:text-gray-100
                         placeholder-gray-400 dark:placeholder-gray-300
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition-all duration-300 ease-in-out
                         hover:shadow-md
                         smooth-hover resize-none"
            />
            
            {/* Deadline input */}
            <div className="flex items-center gap-2 mr-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-fit">
                Deadline:
              </label>
              <input
                type="datetime-local"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="w-[85%] px-3 py-2 rounded-lg border border-gray-300 
                           dark:border-gray-600 
                           bg-white dark:bg-gray-700 
                           text-gray-900 dark:text-gray-100
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition-all duration-300 ease-in-out
                           hover:shadow-md
                           smooth-hover"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
