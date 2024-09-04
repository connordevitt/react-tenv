// src/components/HomePage.js

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './HomePage.css';
import Navbar from './Navbar';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import ListManager from './ListManager';
import ConfirmModal from './ConfirmModal';

function HomePage() {
  const [lists, setLists] = useState(() => {
    const savedLists = localStorage.getItem('todoLists');
    return savedLists ? JSON.parse(savedLists) : [{ id: 'default', title: 'Default List', tasks: [] }];
  });

  const [currentListId, setCurrentListId] = useState('default');
  const [newTask, setNewTask] = useState('');
  const [taskPriority, setTaskPriority] = useState('Medium');
  const [taskDeadline, setTaskDeadline] = useState('');
  const [newListTitle, setNewListTitle] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [showTimeoutNotification, setShowTimeoutNotification] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState('');
  const [editedTaskPriority, setEditedTaskPriority] = useState('Medium');
  const [editedTaskDeadline, setEditedTaskDeadline] = useState('');
  const [showSaveNotification, setShowSaveNotification] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [taskToRemove, setTaskToRemove] = useState(null);
  const [showRemoveNotification, setShowRemoveNotification] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]); // State for tracking selected tasks

  useEffect(() => {
    const gtagScript = document.createElement('script');
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-XREYQ41BK6';
    gtagScript.async = true;
    document.body.appendChild(gtagScript);

    const gtagScriptContent = document.createElement('script');
    gtagScriptContent.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XREYQ41BK6');
    `;
    document.body.appendChild(gtagScriptContent);

    return () => {
      document.body.removeChild(gtagScript);
      document.body.removeChild(gtagScriptContent);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('todoLists', JSON.stringify(lists));
  }, [lists]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      const updatedLists = lists.map(list => {
        if (list.id === currentListId) {
          return {
            ...list,
            tasks: [...list.tasks, { id: Date.now(), text: newTask, priority: taskPriority, deadline: taskDeadline, completed: false }],
          };
        }
        return list;
      });
      setLists(updatedLists);
      setNewTask('');
      setTaskDeadline('');
    }
  };

  const confirmRemoveTask = (taskId) => {
    setTaskToRemove(taskId);
    setShowConfirmModal(true);
  };

  const removeTask = () => {
    const updatedLists = lists.map(list => {
      if (list.id === currentListId) {
        return {
          ...list,
          tasks: list.tasks.filter(task => task.id !== taskToRemove),
        };
      }
      return list;
    });
    setLists(updatedLists);
    setShowConfirmModal(false);
    setTaskToRemove(null);
    setShowRemoveNotification(true);

    setTimeout(() => {
      setShowRemoveNotification(false);
    }, 2000);
  };

  const handleCancelRemove = () => {
    setShowConfirmModal(false);
    setTaskToRemove(null);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const addNewList = () => {
    if (newListTitle.trim() !== '') {
      const newList = {
        id: Date.now().toString(),
        title: newListTitle,
        tasks: [],
      };
      setLists([...lists, newList]);
      setCurrentListId(newList.id);
      setNewListTitle('');
    }
  };

  const changeList = (listId) => {
    setCurrentListId(listId);
  };

  const startEditingTask = (task) => {
    setEditingTaskId(task.id);
    setEditedTaskText(task.text);
    setEditedTaskPriority(task.priority);
    setEditedTaskDeadline(task.deadline);
  };

  const saveTask = () => {
    const updatedLists = lists.map(list => {
      if (list.id === currentListId) {
        return {
          ...list,
          tasks: list.tasks.map(task => {
            if (task.id === editingTaskId) {
              return {
                ...task,
                text: editedTaskText,
                priority: editedTaskPriority,
                deadline: editedTaskDeadline,
              };
            }
            return task;
          }),
        };
      }
      return list;
    });
    setLists(updatedLists);
    setEditingTaskId(null);
    setShowSaveNotification(true);

    setTimeout(() => {
      setShowSaveNotification(false);
    }, 2000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      saveTask();
    }
  };

  const toggleTaskCompletion = (taskId) => {
    const updatedLists = lists.map(list => {
      if (list.id === currentListId) {
        return {
          ...list,
          tasks: list.tasks.map(task => {
            if (task.id === taskId) {
              return { ...task, completed: !task.completed };
            }
            return task;
          }),
        };
      }
      return list;
    });
    setLists(updatedLists);
  };

  const toggleSelectTask = (taskId) => {
    setSelectedTasks(prevSelected =>
      prevSelected.includes(taskId)
        ? prevSelected.filter(id => id !== taskId)
        : [...prevSelected, taskId]
    );
  };

  const removeSelectedTasks = () => {
    const updatedLists = lists.map(list => {
      if (list.id === currentListId) {
        return {
          ...list,
          tasks: list.tasks.filter(task => !selectedTasks.includes(task.id)),
        };
      }
      return list;
    });
    setLists(updatedLists);
    setSelectedTasks([]); // Reset selected tasks
  };

  const selectAllTasks = (isChecked) => {
    if (isChecked) {
      const allTaskIds = currentList?.tasks.map(task => task.id) || [];
      setSelectedTasks(allTaskIds);
    } else {
      setSelectedTasks([]);
    }
  };

  const currentList = lists.find(list => list.id === currentListId);

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
      {/* Conditionally render the timeout notification */}
      {showTimeoutNotification && (
        <div id="timeout-notification" className="alert alert-danger text-center" role="alert">
          Session timed out. Welcome, Guest!
        </div>
      )}

      <Navbar toggleDarkMode={toggleDarkMode} />

      <div className="container mt-4">
        <header className="text-center mb-3">
          <p id="userGreeting" className="lead">Welcome, Guest!</p>
        </header>

        <div className="text-center mb-4">
          <h6 id="MasterList" className="h12">{currentList?.title}</h6>
          <div id="date-time" className="text-center mb-3">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })}
          </div>
          <div id="greeting" className="text-center mb-3">
            Afternoon Pioneer! Welcome Aboard.
          </div>
          <div id="clickcount" className="text-center mb-3">
            Completed Task counter: {currentList?.tasks.filter(task => task.completed).length}
          </div>
        </div>

        {/* List Manager for Title Input and Dropdown */}
        <ListManager
          newListTitle={newListTitle}
          setNewListTitle={setNewListTitle}
          addNewList={addNewList}
          lists={lists}
          changeList={changeList}
          currentList={currentList}
        />

        {/* Task Input Component */}
        <TaskInput
          newTask={newTask}
          setNewTask={setNewTask}
          taskPriority={taskPriority}
          setTaskPriority={setTaskPriority}
          taskDeadline={taskDeadline}
          setTaskDeadline={setTaskDeadline}
          addTask={addTask}
        />

        {/* Task List Component */}
        <TaskList
          currentList={currentList}
          removeTask={confirmRemoveTask}
          startEditingTask={startEditingTask}
          editingTaskId={editingTaskId}
          editedTaskText={editedTaskText}
          setEditedTaskText={setEditedTaskText}
          editedTaskPriority={editedTaskPriority}
          setEditedTaskPriority={setEditedTaskPriority}
          editedTaskDeadline={editedTaskDeadline}
          setEditedTaskDeadline={setEditedTaskDeadline}
          saveTask={saveTask}
          handleKeyDown={handleKeyDown}
          toggleTaskCompletion={toggleTaskCompletion}
          toggleSelectTask={toggleSelectTask} // Pass down the function to handle task selection
          removeSelectedTasks={removeSelectedTasks} // Pass down the function to remove selected tasks
          selectAllTasks={selectAllTasks} // Pass down the function to handle select all
          selectedTasks={selectedTasks} // Pass down the selected tasks state
        />

        {/* Bootstrap Toast for Save Notification */}
        {showSaveNotification && (
          <div className="position-fixed top-0 start-50 translate-middle-x p-3" style={{ zIndex: 1050 }}>
            <div className="toast align-items-center text-white bg-success border-0 show" role="alert" aria-live="assertive" aria-atomic="true">
              <div className="d-flex">
                <div className="toast-body">
                  Task saved successfully!
                </div>
                <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
              </div>
            </div>
          </div>
        )}

        {/* Bootstrap Toast for Remove Notification */}
        {showRemoveNotification && (
          <div className="position-fixed top-0 start-50 translate-middle-x p-3" style={{ zIndex: 1050 }}>
            <div className="toast align-items-center text-white bg-danger border-0 show" role="alert" aria-live="assertive" aria-atomic="true">
              <div className="d-flex">
                <div className="toast-body">
                  Task removed successfully!
                </div>
                <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Modal for Task Removal */}
        <ConfirmModal
          show={showConfirmModal}
          handleClose={handleCancelRemove}
          handleConfirm={removeTask}
          taskText={taskToRemove ? currentList?.tasks.find(task => task.id === taskToRemove)?.text : ''}
        />

      </div>

      <footer className="text-center">
        <p>&copy; 2024 To-Do List App. All rights reserved.</p>
        <div className="mt-2">
          <h6>Countdown to September 24th!</h6>
          <div id="countdown" className="countdown">
            <span id="days">23</span> days, <span id="hours">11</span> hours,
            <span id="minutes">34</span> minutes,
            <span id="seconds">32</span> seconds
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
