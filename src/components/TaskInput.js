// src/components/TaskInput.js

import React from "react";

function TaskInput({
  newTask,
  setNewTask,
  taskPriority,
  setTaskPriority,
  taskDeadline,
  setTaskDeadline,
  addTask,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission or page reload
      addTask();
    }
  };

  return (
    <section id="todo-input" className="mb-3 text-center">
      <div className="input-group mb-2 mx-auto" style={{ maxWidth: "800px" }}>
        <input
          type="text"
          id="input-box"
          className="form-control"
          placeholder="Add some text!"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <select
          id="taskPriority"
          className="form-select"
          value={taskPriority}
          onChange={(e) => setTaskPriority(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input
          type="date"
          id="task-deadline"
          className="form-control"
          value={taskDeadline}
          onChange={(e) => setTaskDeadline(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          id="add-task-button"
          className="btn btn-success"
          type="button"
          onClick={addTask}
        >
          Add
        </button>
      </div>
    </section>
  );
}

export default TaskInput;
