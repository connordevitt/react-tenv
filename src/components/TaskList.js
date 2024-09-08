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
  if (!currentList || !currentList.tasks) {
    return <p>No tasks available</p>;
  }

  return (
    <div className="task-list">
      {currentList.tasks.length === 0 ? (
        <p>No tasks to display.</p>
      ) : (
        currentList.tasks.map((task) => (
          <div key={task.id} className="task">
            <div className="task-details">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
              />
              {editingTaskId === task.id ? (
                <input
                  type="text"
                  value={editedTaskText}
                  onChange={(e) => setEditedTaskText(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              ) : (
                <span>{task.text}</span>
              )}
            </div>

            <div className="task-actions">
              {editingTaskId === task.id ? (
                <button onClick={saveTask}>Save</button>
              ) : (
                <>
                  <button onClick={() => startEditingTask(task)}>Edit</button>
                  <button onClick={() => removeTask(task.id)}>Remove</button>
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default TaskList;
