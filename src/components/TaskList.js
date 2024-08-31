// src/components/TaskList.js

import React from 'react';

function TaskList({ currentList, removeTask }) {
  return (
    <section id="todo-lists" className="mb-3 text-center">
      {/* Task list display */}
      <ul id="list-container" className="list-group">
        {currentList?.tasks.map(task => (
          <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{task.text}</strong> - {task.priority} priority, due by {task.deadline || 'No deadline'}
            </div>
            <button onClick={() => removeTask(task.id)} className="btn btn-danger btn-sm">
              Remove
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TaskList;
