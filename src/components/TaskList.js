import React, { useState } from 'react';
import ConfirmModal from './ConfirmModal';

const TaskList = ({ tasks, deleteTask }) => {
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    const handleDeleteClick = (task) => {
        setTaskToDelete(task);
        setShowConfirmModal(true);  // Opens the modal
    };

    const handleTaskDelete = () => {
        if (taskToDelete) {
            deleteTask(taskToDelete.id);  // Call deleteTask with the task ID
        }
        setShowConfirmModal(false);  // Close the modal
    };

    return (
        <div>
            {tasks.map(task => (
                <div key={task.id} className="task-item">
                    <span>{task.name}</span>
                    <button onClick={() => handleDeleteClick(task)}>Delete</button>
                </div>
            ))}

            {showConfirmModal && (
                <ConfirmModal 
                    task={taskToDelete}
                    onClose={() => setShowConfirmModal(false)}
                    onConfirm={handleTaskDelete}
                />
            )}
        </div>
    );
};

export default TaskList;
