import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteTask, viewTaskApi } from '../Services/AllApis';


function SingleTask() {

    const [allTasks, setAllTasks] = useState([]);

    const getTasks = async () => {
        const userId = localStorage.getItem('currentUserId'); // Retrieve userId from localStorage
        if (!userId) {
            console.error("User ID not found in localStorage");
            return;
        }

        try {
            const result = await viewTaskApi(userId); // Pass userId in the API call
            console.log(result);
            if (result.status === 200) {
                setAllTasks(result.data);
            } else {
                console.error("Failed to fetch tasks");
            }
        } catch (error) {
            console.error("An error occurred while fetching tasks:", error);
        }
    };

    // delete task

    const handleDeleteTask = async (taskId) => {
        try {
            const response = await deleteTask(taskId);
            console.log(taskId);
            if (response.status === 200) {
                alert("Task deleted successfully...")
                getTasks();
            } else {
                alert('Operation failed! Please try again later.');
            }
        } catch (error) {
            console.error("An error occurred while deleting the task:", error);
        }
    };

    useEffect(() => {
        getTasks()

    }, [])
    console.log(allTasks);


    return (
        <div className='p-2 m-2 rounded container-fluid'>
            {allTasks.map(task => (
                <div key={task._id} className='d-flex justify-content-between border rounded mb-2'>
                    <h4 className='fs-4 mx-3'>{task.task}</h4>
                    <div className='d-flex justify-content-around mx-3 py-2'>
                        <Link to={`/viewtask/${task._id}`} style={{ textDecoration: 'none', color: 'black' }}>
                            <i className="fa-solid fa-eye fs-5 mx-5"></i>
                        </Link>
                        <Link to={`/edittask/${task._id}`} style={{ textDecoration: 'none', color: 'black' }}>
                            <i className="fa-solid fa-pen-to-square fs-5 mx-5"></i>
                        </Link>
                        <button onClick={() => handleDeleteTask(task._id)}
                            style={{ background: 'none', border: 'none', color: 'black' }}>
                            <i className="fa-solid fa-trash fs-5 mx-5"></i>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SingleTask;
