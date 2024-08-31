// src/components/ListManager.js

import React from 'react';

function ListManager({ newListTitle, setNewListTitle, addNewList, lists, changeList, currentList }) {
  return (
    <div className="text-center mb-3">
      {/* Combined Input and Dropdown Section */}
      <div className="input-group mb-3 mx-auto" style={{ maxWidth: '600px' }}>
        <input
          type="text"
          className="form-control"
          placeholder="Enter new list name"
          value={newListTitle}
          onChange={(e) => setNewListTitle(e.target.value)}
        />
        <button
          className="btn btn-success"
          type="button"
          onClick={addNewList}
        >
          + Add List
        </button>

        {/* Dropdown to select current list */}
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="listDropdownButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{ marginLeft: '5px' }} // Optional styling for space between elements
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
    </div>
  );
}

export default ListManager;
