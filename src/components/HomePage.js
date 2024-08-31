// src/components/HomePage.js

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './HomePage.css';

function HomePage() {
  const [lists, setLists] = useState([{ id: 'default', title: 'Default List', tasks: [] }]);
  const [currentListId, setCurrentListId] = useState('default');
  const [newTask, setNewTask] = useState('');
  const [taskPriority, setTaskPriority] = useState('Medium');
  const [taskDeadline, setTaskDeadline] = useState('');
  const [newListTitle, setNewListTitle] = useState('');
  const [darkMode, setDarkMode] = useState(false);

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

  const addTask = () => {
    if (newTask.trim() !== '') {
      const updatedLists = lists.map(list => {
        if (list.id === currentListId) {
          return {
            ...list,
            tasks: [...list.tasks, { id: Date.now(), text: newTask, priority: taskPriority, deadline: taskDeadline }],
          };
        }
        return list;
      });
      setLists(updatedLists);
      setNewTask('');
      setTaskDeadline('');
    }
  };

  const removeTask = (taskId) => {
    const updatedLists = lists.map(list => {
      if (list.id === currentListId) {
        return {
          ...list,
          tasks: list.tasks.filter(task => task.id !== taskId),
        };
      }
      return list;
    });
    setLists(updatedLists);
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

  const currentList = lists.find(list => list.id === currentListId);

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <div id="timeout-notification" className="alert alert-danger text-center" role="alert">
        You have been logged out due to inactivity. Please login or signup.
      </div>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          {/* Convert <a> to <button> */}
          <button className="navbar-brand btn btn-link" onClick={() => window.location.href = '/'}>
            <img src="/images/connors-webpage.png" alt="Logo" height="30" />
            To-Do List
          </button>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link" href="#patch-notes">Patch Notes</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#pioneer">Pioneer of the Month</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#bugs">Known Bugs</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#uptime">Uptime</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#diagnostics">Diagnostics</a>
              </li>
            </ul>
            <div className="ms-auto">
              <button className="btn btn-primary me-2" onClick={() => alert('Sign Up clicked!')}>Sign Up</button>
              <button className="btn btn-primary me-2" onClick={() => alert('Login clicked!')}>Login</button>
              <button onClick={toggleDarkMode} className="btn btn-outline-light">
                Toggle Dark Mode
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <header className="text-center mb-3">
          <p id="userGreeting">Welcome, Guest!</p>
        </header>

        <section className="current-list-name text-center mb-3">
          <h6 id="MasterList" className="h12">{currentList?.title}</h6>
        </section>

        <main>
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
            Completed Task counter: 0
          </div>

          {/* New List Input Section */}
          <section id="new-list-input" className="mb-3 text-center">
            <div className="input-group mb-2 mx-auto" style={{ maxWidth: '600px' }}>
              <input
                type="text"
                id="new-list-name"
                className="form-control"
                placeholder="Enter new list name"
                value={newListTitle}
                onChange={(e) => setNewListTitle(e.target.value)}
              />
              <button
                id="add-list-button"
                className="btn btn-success"
                type="button"
                onClick={addNewList}
              >
                <i className="bi bi-plus-lg"></i> Add List
              </button>
            </div>
          </section>

          {/* Task Input Section */}
          <section id="todo-input" className="mb-3 text-center">
            <div className="input-group mb-2 mx-auto" style={{ maxWidth: '800px' }}>
              <input
                type="text"
                id="input-box"
                className="form-control"
                placeholder="Add some text!"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
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

          {/* List Dropdown and Task Display */}
          <section id="todo-lists" className="mb-3 text-center">
            <div className="dropdown mb-2">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="listDropdownButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {currentList?.title || 'Select List'}
              </button>
              <ul className="dropdown-menu" aria-labelledby="listDropdownButton">
                {lists.map(list => (
                  <li key={list.id}>
                    <button
                      className="dropdown-item"
                      onClick={() => changeList(list.id)}
                    >
                      {list.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

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

          <div className="text-center mb-3">
            <button className="btn btn-danger me-2">Clear Completed</button>
            <button className="btn btn-primary">Load Tasks</button>
          </div>
        </main>

        <footer className="text-center mt-4">
          <p>&copy; 2024 To-Do List App. All rights reserved.</p>
          <div className="mt-2">
            <h6>Countdown to September 24th!</h6>
            <div id="countdown" className="countdown">
              <span id="days">24</span> days, <span id="hours">9</span> hours,
              <span id="minutes">39</span> minutes,
              <span id="seconds">9</span> seconds
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default HomePage;
