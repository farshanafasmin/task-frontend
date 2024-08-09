import React, { useEffect, useState } from 'react';
import SingleTask from './SingleTask';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { addTaskApi, viewTaskApi } from '../Services/AllApis';


function Tasks() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [username, setUsername] = useState("")
    useEffect(() => {
        if (localStorage.getItem("currentUser")) {
            setUsername(localStorage.getItem("currentUser"))
        }
    })

    // task
    const [taskInputs, settaskInputs] = useState({
        task: "",
        description: "",
        date: ""
    })

    const getAllTask=()=>{
        viewTaskApi()
    }
  

    const setInputs = (e) => {
        const { name, value } = e.target
        settaskInputs({ ...taskInputs, [name]: value })
    }
    console.log(taskInputs);

    const handleAdd = async (e) => {
        e.preventDefault()
        const { task, description, duedate } = taskInputs
        const userId = localStorage.getItem("currentUserId");
        if (!task || !description || !duedate) {
            alert("Please fill all data")
        }
        else {
            const result = await addTaskApi({ ...taskInputs, userId })
            alert('Task added successfully...')
            getAllTask()
            console.log(result);
            handleClose()
        }
    }


    return (
        <div className='container-fluid w-75 '>
            <div className='mt-4 mx-5 px-3 border rounded shadow'>
                <div className='d-flex justify-content-between align-items-center p-3'>
                    <p className='fs-4' style={{color:'darkblue',fontWeight:'900'}}>My Tasks</p>
                    <button id='bt2' className='btn btn-light px-3 py-2 w-25 text-white shadow' onClick={handleShow}>Add Task</button>
                </div>
                <SingleTask />

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Task</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col>

                                <input onChange={(e) => setInputs(e)} name='task' type='text' className='form-control' style={{ border: '1px' }} placeholder='Task'></input>
                                <hr />
                                <input onChange={(e) => setInputs(e)} name='description' type='text' className='form-control' style={{ border: '1px' }} placeholder='Task Description'></input>
                                <hr />
                                <label>Due Date</label>
                                <input onChange={(e) => setInputs(e)} name='duedate' type='date' className='form-control' style={{ border: '1px' }}></input>

                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={(e) => handleAdd(e)}>
                            Add
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}

export default Tasks;
