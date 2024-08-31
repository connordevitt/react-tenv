// src/components/HomePage.js

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './HomePage.css';
import Navbar from './Navbar';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import ListManager from './ListManager';

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
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
      <div id="timeout-notification" className="alert alert-danger text-center" role="alert">
        Session timed out. Welcome, Guest!
      </div>

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
        <TaskList currentList={currentList} removeTask={removeTask} />

        <div className="text-center mb-3">
          <button className="btn btn-danger me-2">Clear Completed</button>
          <button className="btn btn-primary">Load Tasks</button>
        </div>
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
