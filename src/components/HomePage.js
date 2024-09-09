import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './HomePage.css';
import ConfirmModal from './ConfirmModal';
import Countdown from './Countdown';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/storage'; // Import LocalStorage helpers

function HomePage() {
  const [lists, setLists] = useState(() => {
    const savedLists = loadFromLocalStorage('lists');
    return savedLists || [{ id: 1, title: 'Default List', tasks: [] }];
  });

  const [currentListId, setCurrentListId] = useState(1);
  const [newListTitle, setNewListTitle] = useState('');
  const [newTask, setNewTask] = useState('');
  const [taskPriority, setTaskPriority] = useState('Medium');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState('');
  const [editedTaskPriority, setEditedTaskPriority] = useState('Medium'); // Added to store priority change during edit
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const currentList = lists.find((list) => list.id === currentListId);

  useEffect(() => {
    saveToLocalStorage('lists', lists);
  }, [lists]);

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'Low': return 'priority-low';
      case 'Medium': return 'priority-medium';
      case 'High': return 'priority-high';
      default: return '';
    }
  };

  const addTask = () => {
    if (newTask.trim()) {
      const updatedLists = lists.map((list) =>
        list.id === currentListId
          ? { ...list, tasks: [...list.tasks, { id: list.tasks.length + 1, text: newTask, priority: taskPriority }] }
          : list
      );
      setLists(updatedLists);
      setNewTask('');
      setTaskPriority('Medium');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const handleDeleteClick = (task) => {
    setTaskToDelete(task);
    setShowConfirmModal(true);
  };

  const handleTaskDelete = () => {
    if (taskToDelete) {
      const updatedLists = lists.map((list) =>
        list.id === currentListId
          ? { ...list, tasks: list.tasks.filter((task) => task.id !== taskToDelete.id) }
          : list
      );
      setLists(updatedLists);
      setShowConfirmModal(false);
    }
  };

  const addList = () => {
    if (newListTitle.trim()) {
      setLists([...lists, { id: lists.length + 1, title: newListTitle, tasks: [] }]);
      setNewListTitle('');
    }
  };

  const changeList = (listId) => {
    setCurrentListId(listId);
  };

  const startEditingTask = (taskId, currentText, currentPriority) => {
    setEditingTaskId(taskId);
    setEditedTaskText(currentText);
    setEditedTaskPriority(currentPriority); // Set the priority of the task being edited
  };

  const saveTaskEdit = (taskId) => {
    const updatedLists = lists.map((list) =>
      list.id === currentListId
        ? {
            ...list,
            tasks: list.tasks.map((task) =>
              task.id === taskId
                ? { ...task, text: editedTaskText, priority: editedTaskPriority } // Save the new priority
                : task
            ),
          }
        : list
    );
    setLists(updatedLists);
    setEditingTaskId(null);
    setEditedTaskText('');
    setEditedTaskPriority('Medium'); // Reset after saving
    toast.success('Task edited successfully!', { position: 'top-right', autoClose: 2000 });
  };

  const cancelTaskEdit = () => {
    setEditingTaskId(null);
    setEditedTaskText('');
    setEditedTaskPriority('Medium'); // Reset priority if canceling edit
  };

  return (
    <div className="app-container">
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
              className={list.id === currentListId ? 'active-list' : ''}
            >
              {list.title}
            </li>
          ))}
        </ul>
      </aside>

      <main className="main-content">
        <h2 className="list-title">{currentList.title}</h2>

        <div className="add-task-container">
          <input
            type="text"
            placeholder="Add a task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={handleKeyPress}
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

        <div className="task-list">
          {currentList.tasks.map((task) => (
            <div className={`task ${getPriorityClass(task.priority)}`} key={task.id}>
              {editingTaskId === task.id ? (
                <div className="edit-mode">
                  <input
                    type="text"
                    value={editedTaskText}
                    onChange={(e) => setEditedTaskText(e.target.value)}
                  />
                  <select
                    value={editedTaskPriority}
                    onChange={(e) => setEditedTaskPriority(e.target.value)} // Allow editing priority
                    className="form-select"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                  <button className="save-btn" onClick={() => saveTaskEdit(task.id)}>
                    Save
                  </button>
                  <button className="cancel-btn" onClick={cancelTaskEdit}>
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="task-details">
                  <span className="task-priority">{task.priority}</span>
                  <span>{task.text}</span>
                </div>
              )}
              {editingTaskId !== task.id && (
                <div className="task-actions">
                  <button
                    className="edit-btn"
                    onClick={() => startEditingTask(task.id, task.text, task.priority)}
                  >
                    Edit
                  </button>
                  <button className="remove-btn" onClick={() => handleDeleteClick(task)}>
                    Remove
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Countdown Timer */}
        <div className="countdown-section">
          <Countdown />
        </div>
      </main>

      <footer>
        <p>© 2024 To-Do List App. All rights reserved.</p>
      </footer>

      <ToastContainer />

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
