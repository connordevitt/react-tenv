import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./HomePage.css";
import axios from "axios";  // Import Axios for API calls
import ConfirmModal from "./ConfirmModal";
import Countdown from "./Countdown";

function HomePage() {
  const [lists, setLists] = useState([]);
  const [currentListId, setCurrentListId] = useState(null);
  const [newListTitle, setNewListTitle] = useState("");
  const [newTask, setNewTask] = useState("");
  const [taskPriority, setTaskPriority] = useState("Medium");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState("");
  const [editedTaskPriority, setEditedTaskPriority] = useState("Medium");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [showRemoveAllConfirmModal, setShowRemoveAllConfirmModal] = useState(false);
  const currentList = lists.find((list) => list._id === currentListId) || { title: "", tasks: [] };

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/lists");
        if (response.data.length > 0) {
          setLists(response.data);
          // Set the first list as current list if no currentListId is already set
          setCurrentListId(response.data[0]._id);  // Set the first list as the current list
        }
      } catch (error) {
        console.error("Error fetching lists:", error);
      }
    };
  
    fetchLists(); 
  }, []);

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

  const addTask = async () => {
    if (!currentListId) {
      console.error("No current list selected");
      return;
    }
  
    if (newTask.trim()) {
      const taskData = {
        listId: currentListId,
        text: newTask,
        priority: taskPriority,
        completed: false,
      };
  
      console.log("Task Data to be Sent:", taskData);
  
      try {
        const response = await axios.post("http://localhost:5000/api/tasks", taskData);
        console.log("Task Added Response:", response.data);
  
        // Fetch the updated list after adding the task
        const updatedListResponse = await axios.get(`http://localhost:5000/api/lists/${currentListId}`);
        console.log("Fetched Updated List:", updatedListResponse.data); // <-- log the updated list
  
        const updatedList = updatedListResponse.data;
  
        // Update the lists in the UI
        const updatedLists = lists.map((list) =>
          list._id === currentListId ? updatedList : list
        );
  
        setLists(updatedLists);
        setNewTask(""); // Clear the task input field
        setTaskPriority("Medium"); // Reset task priority
      } catch (error) {
        console.error("Error adding task or fetching list:", error);
      }
    }
  };
  
  
  
  // Delete task from the current list and backend
  const handleTaskDelete = async () => {
    if (taskToDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/tasks/${taskToDelete._id}`);
        const updatedLists = lists.map((list) =>
          list._id === currentListId
            ? { ...list, tasks: list.tasks.filter((task) => task._id !== taskToDelete._id) }
            : list
        );
        setLists(updatedLists);
        setShowConfirmModal(false);
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  // Add a new list
  const addList = async () => {
    if (newListTitle.trim()) {
      const newListData = { title: newListTitle, tasks: [] };
      try {
        const response = await axios.post("http://localhost:5000/api/lists", newListData);
        setLists([...lists, response.data]);
        setNewListTitle("");
      } catch (error) {
        console.error("Error adding list:", error);
      }
    }
  };

  // Edit task in the current list and update the backend
  const saveTaskEdit = async (taskId) => {
    const taskData = { text: editedTaskText, priority: editedTaskPriority };

    try {
      const response = await axios.put(`http://localhost:5000/api/tasks/${taskId}`, taskData);
      const updatedLists = lists.map((list) =>
        list._id === currentListId
          ? {
              ...list,
              tasks: list.tasks.map((task) =>
                task._id === taskId ? response.data : task
              ),
            }
          : list
      );
      setLists(updatedLists);
      setEditingTaskId(null);
      setEditedTaskText("");
      setEditedTaskPriority("Medium");
      toast.success("Task edited successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  const toggleTaskCompletion = async (taskId) => {
    const taskToToggle = lists
      .find((list) => list._id === currentListId)
      .tasks.find((task) => task._id === taskId);

    const updatedTask = {
      ...taskToToggle,
      completed: !taskToToggle.completed,
    };

    try {
      const response = await axios.put(`http://localhost:5000/api/tasks/${taskId}`, updatedTask);
      const updatedLists = lists.map((list) =>
        list._id === currentListId
          ? {
              ...list,
              tasks: list.tasks.map((task) =>
                task._id === taskId ? response.data : task
              ),
            }
          : list
      );
      setLists(updatedLists);
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  };

  const removeAllTasks = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/lists/${currentListId}/tasks`);
      const updatedLists = lists.map((list) =>
        list._id === currentListId ? { ...list, tasks: [] } : list
      );
      setLists(updatedLists);
      setShowRemoveAllConfirmModal(false);
      toast.success("All tasks removed successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error removing all tasks:", error);
    }
  };

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
              key={list._id}
              onClick={() => setCurrentListId(list._id)}
              className={list._id === currentListId ? "active-list" : ""}
            >
              {list.title}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main content */}
      <main className="main-content">
        <h2 className="list-title">{currentList?.title}</h2>

        {/* Add Task Section */}
        <div className="add-task-container">
          <input
            type="text"
            placeholder="Add a task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTask()}
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
          {currentList?.tasks.map((task) => (
            <div
              className={`task ${getPriorityClass(task.priority)} ${task.completed ? "completed" : ""}`}
              key={task._id}
            >
              {editingTaskId === task._id ? (
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
                    onClick={() => saveTaskEdit(task._id)}
                  >
                    Save
                  </button>
                  <button className="cancel-btn" onClick={() => setEditingTaskId(null)}>
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="task-details">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task._id)}
                  />
                  <span className="task-priority">{task.priority}</span>
                  <span className={task.completed ? "task-text completed-task" : ""}>
                    {task.text}
                  </span>
                </div>
              )}

              {editingTaskId !== task._id && (
                <div className="task-actions">
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setEditingTaskId(task._id);
                      setEditedTaskText(task.text);
                      setEditedTaskPriority(task.priority);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="remove-btn"
                    onClick={() => {
                      setTaskToDelete(task);
                      setShowConfirmModal(true);
                    }}
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
          onClick={() => setShowRemoveAllConfirmModal(true)}
        >
          Remove All Tasks
        </button>

        {showRemoveAllConfirmModal && (
          <ConfirmModal
            task={null}
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
            style={{ width: `${progressPercentage}%` }}
            aria-valuenow={countCompletedTasks()}
            aria-valuemin="0"
            aria-valuemax={currentList?.tasks.length}
          >
            {countCompletedTasks()} / {currentList?.tasks.length} tasks completed
          </div>
        </div>

        {/* Countdown Section */}
        <div className="countdown-section">
          <Countdown />
        </div>
      </main>

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
    </div>
  );
}


export default HomePage;
