// src/components/TaskList.js

import React from 'react';

function TaskList({
  currentList,
  removeTask,
  startEditingTask,
  editingTaskId,
  editedTaskText,
  setEditedTaskText,
  editedTaskPriority,
  setEditedTaskPriority,
  editedTaskDeadline,
  setEditedTaskDeadline,
  saveTask,
  handleKeyDown,
  toggleTaskCompletion,
}) {
  // Function to determine the style based on priority
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High':
        return <span className="badge bg-danger">High</span>; // Red badge for high priority
      case 'Medium':
        return <span className="badge bg-warning text-dark">Medium</span>; // Yellow badge for medium priority
      case 'Low':
        return <span className="badge bg-success">Low</span>; // Green badge for low priority
      default:
        return <span className="badge bg-secondary">None</span>; // Default badge for no priority
    }
  };

  return (
    <section id="todo-lists" className="mb-3 text-center">
      <ul id="list-container" className="list-group">
        {currentList?.tasks.map(task => (
          <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
            {editingTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={editedTaskText}
                  onChange={(e) => setEditedTaskText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="form-control me-2"
                />
                <select
                  className="form-select me-2"
                  value={editedTaskPriority}
                  onChange={(e) => setEditedTaskPriority(e.target.value)}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                <input
                  type="date"
                  className="form-control me-2"
                  value={editedTaskDeadline}
                  onChange={(e) => setEditedTaskDeadline(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button onClick={saveTask} className="btn btn-success btn-sm">
                  Save
                </button>
              </>
            ) : (
              <>
                <div className="d-flex align-items-center">
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                  />
                  <span className={task.completed ? 'text-decoration-line-through' : ''}>
                    {task.text}
                  </span> {/* Task text */}
                  <span className="ms-2">{getPriorityBadge(task.priority)}</span> {/* Priority badge */}
                  {task.deadline && (
                    <span className="ms-3 text-muted">Due by: {task.deadline}</span> // Display the due date
                  )}
                </div>
                <div>
                  <button onClick={() => startEditingTask(task)} className="btn btn-primary btn-sm me-2">
                    Edit
                  </button>
                  <button onClick={() => removeTask(task.id)} className="btn btn-danger btn-sm">
                    Remove
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TaskList;
