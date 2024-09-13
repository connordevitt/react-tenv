import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./HomePage.css";
import ConfirmModal from "./ConfirmModal";
import Countdown from "./Countdown";
import { loadFromLocalStorage, saveToLocalStorage } from "../utils/storage";

function HomePage() {
  const [lists, setLists] = useState(() => {
    const savedLists = loadFromLocalStorage("lists");
    return savedLists || [{ id: 1, title: "Main List", tasks: [] }];
  });

  const [currentListId, setCurrentListId] = useState(1);
  const [newListTitle, setNewListTitle] = useState("");
  const [newTask, setNewTask] = useState("");
  const [taskPriority, setTaskPriority] = useState("Medium");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState("");
  const [editedTaskPriority, setEditedTaskPriority] = useState("Medium");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [showRemoveAllConfirmModal, setShowRemoveAllConfirmModal] =
    useState(false);

  const currentList = lists.find((list) => list.id === currentListId);

  // Save lists to local storage whenever lists are updated
  useEffect(() => {
    saveToLocalStorage("lists", lists);
  }, [lists]);

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "Low":
        return "priority-low";
      case "Medium":
        return "priority-medium";
      case "High":
        return "priority-high";
      default:
        return "";
    }
  };

  const addTask = () => {
    if (newTask.trim()) {
      const updatedLists = lists.map((list) =>
        list.id === currentListId
          ? {
              ...list,
              tasks: [
                ...list.tasks,
                {
                  id: uuidv4(),
                  text: newTask,
                  priority: taskPriority,
                  completed: false,
                },
              ],
            }
          : list,
      );
      setLists(updatedLists);
      setNewTask("");
      setTaskPriority("Medium");
    }
  };

  // Handle "Enter" key press to add a task
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  // Handle task deletion (opens confirm modal)
  const handleDeleteClick = (task) => {
    setTaskToDelete(task);
    setShowConfirmModal(true);
  };

  // Confirm task deletion
  const handleTaskDelete = () => {
    if (taskToDelete) {
      const updatedLists = lists.map((list) =>
        list.id === currentListId
          ? {
              ...list,
              tasks: list.tasks.filter((task) => task.id !== taskToDelete.id),
            }
          : list,
      );
      setLists(updatedLists);
      setShowConfirmModal(false);
    }
  };

  // Add a new list
  const addList = () => {
    if (newListTitle.trim()) {
      setLists([...lists, { id: uuidv4(), title: newListTitle, tasks: [] }]);
      setNewListTitle("");
    }
  };

  // Switch to a different list
  const changeList = (listId) => {
    setCurrentListId(listId);
  };

  // Start editing a task (task text and priority)
  const startEditingTask = (taskId, currentText, currentPriority) => {
    setEditingTaskId(taskId);
    setEditedTaskText(currentText);
    setEditedTaskPriority(currentPriority);
  };

  // Save task edits (updates task text and priority)
  const saveTaskEdit = (taskId) => {
    const updatedLists = lists.map((list) =>
      list.id === currentListId
        ? {
            ...list,
            tasks: list.tasks.map((task) =>
              task.id === taskId
                ? {
                    ...task,
                    text: editedTaskText,
                    priority: editedTaskPriority,
                  }
                : task,
            ),
          }
        : list,
    );
    setLists(updatedLists);
    setEditingTaskId(null);
    setEditedTaskText("");
    setEditedTaskPriority("Medium");
    toast.success("Task edited successfully!", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  // Cancel task editing
  const cancelTaskEdit = () => {
    setEditingTaskId(null);
    setEditedTaskText("");
    setEditedTaskPriority("Medium");
  };

  // Toggle task completion
  const toggleTaskCompletion = (taskId) => {
    const updatedLists = lists.map((list) =>
      list.id === currentListId
        ? {
            ...list,
            tasks: list.tasks.map((task) =>
              task.id === taskId
                ? { ...task, completed: !task.completed }
                : task,
            ),
          }
        : list,
    );
    setLists(updatedLists);
  };

  // Remove all tasks from the current list
  // Remove all tasks from the current list
  const removeAllTasks = () => {
    const updatedLists = lists.map((list) =>
      list.id === currentListId ? { ...list, tasks: [] } : list,
    );
    setLists(updatedLists);
    setShowRemoveAllConfirmModal(false); // Close the modal after removing

    // Show success toast notification
    toast.success("All tasks removed successfully!", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  // Count the number of completed tasks
  const countCompletedTasks = () => {
    const currentTasks = currentList.tasks || [];
    return currentTasks.filter((task) => task.completed).length;
  };

  const progressPercentage = currentList.tasks.length
    ? (countCompletedTasks() / currentList.tasks.length) * 100
    : 0;

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>My Lists</h2>
        <input
          type="text"
          placeholder="Enter new list name"
          value={newListTitle}
          onChange={(e) => setNewListTitle(e.target.value)}
        />
        <button className="add-task-btn" onClick={addList}>
          + Add List
        </button>
        <ul className="list-selector">
          {lists.map((list) => (
            <li
              key={list.id}
              onClick={() => changeList(list.id)}
              className={list.id === currentListId ? "active-list" : ""}
            >
              {list.title}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main content */}
      <main className="main-content">
        <h2 className="list-title">{currentList.title}</h2>

        {/* Add Task Section */}
        <div className="add-task-container">
          <input
            type="text"
            placeholder="Add a task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={handleKeyPress} // Trigger task add on Enter key press
          />
          <select
            value={taskPriority}
            onChange={(e) => setTaskPriority(e.target.value)}
            className="form-select"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button className="add-task-btn" onClick={addTask}>
            Add
          </button>
        </div>

        {/* Task List */}
        <div className="task-list">
          {currentList.tasks.map((task) => (
            <div
              className={`task ${getPriorityClass(task.priority)} ${task.completed ? "completed" : ""}`}
              key={task.id}
            >
              {editingTaskId === task.id ? (
                <div className="edit-mode">
                  <input
                    type="text"
                    value={editedTaskText}
                    onChange={(e) => setEditedTaskText(e.target.value)}
                  />
                  <select
                    value={editedTaskPriority}
                    onChange={(e) => setEditedTaskPriority(e.target.value)}
                    className="form-select"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                  <button
                    className="save-btn"
                    onClick={() => saveTaskEdit(task.id)}
                  >
                    Save
                  </button>
                  <button className="cancel-btn" onClick={cancelTaskEdit}>
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="task-details">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                  />
                  <span className="task-priority">{task.priority}</span>{" "}
                  {/* Priority Badge */}
                  <span
                    className={task.completed ? "task-text completed-task" : ""}
                  >
                    {task.text}
                  </span>{" "}
                  {/* Task Text */}
                </div>
              )}

              {editingTaskId !== task.id && (
                <div className="task-actions">
                  <button
                    className="edit-btn"
                    onClick={() =>
                      startEditingTask(task.id, task.text, task.priority)
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="remove-btn"
                    onClick={() => handleDeleteClick(task)}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Remove All Button */}
        <button
          className="remove-all-btn"
          onClick={() => {
            setShowRemoveAllConfirmModal(true);
          }}
        >
          Remove All Tasks
        </button>

        {showRemoveAllConfirmModal && (
          <ConfirmModal
            task={null} // No specific task for this action
            onClose={() => setShowRemoveAllConfirmModal(false)}
            onConfirm={removeAllTasks}
            message="Are you sure you want to remove all tasks from this list?"
          />
        )}

        {/* Progress Bar */}
        <div className="progress" style={{ height: "25px" }}>
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{
              width: `${progressPercentage}%`,
            }}
            aria-valuenow={countCompletedTasks()}
            aria-valuemin="0"
            aria-valuemax={currentList.tasks.length}
          >
            {countCompletedTasks()} / {currentList.tasks.length} tasks completed
          </div>
        </div>

        {/* Countdown Section */}
        <div className="countdown-section">
          <Countdown />
        </div>
      </main>

      {/* Footer */}
      <footer>
        <p>© 2024 To-Do List App. All rights reserved.</p>
      </footer>

      {/* Toast Notification Container */}
      <ToastContainer />

      {/* Confirm Modal for Task Deletion */}
      {showConfirmModal && (
        <ConfirmModal
          task={taskToDelete}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={handleTaskDelete}
        />
      )}

      {/* Confirm Modal for Removing All Tasks */}
      {showRemoveAllConfirmModal && (
        <ConfirmModal
          task={null} // No specific task, just a general action
          onClose={() => setShowRemoveAllConfirmModal(false)}
          onConfirm={removeAllTasks}
          message="Are you sure you want to remove all tasks from this list?"
        />
      )}
    </div>
  );
}

export default HomePage;
