import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { singleTaskApi } from '../Services/AllApis';
import { Link, useParams } from 'react-router-dom';
import Header from '../Components/Header';


function ViewTask() {

    // Function to format date to yyyy-MM-dd
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const [singleTask, setSingleTask] = useState({});

    const { taskId } = useParams();

    const getsingleTask = async () => {
        try {
            const result = await singleTaskApi(taskId);
            console.log(result);
            if (result.status === 200) {
                setSingleTask(result.data);
            } else {
                console.error("Failed to fetch corresponding task");
            }
        } catch (error) {
            console.error("An error occurred while fetching the task:", error);
        }
    };

    useEffect(() => {
        if (taskId) {
            getsingleTask(); // Fetch the task only if taskId is available
        }
    }, [taskId]); // Dependency on taskId

    console.log(singleTask);

    return (
        <div>
            <Header></Header>
            <div className='stask d-flex flex-column align-items-center' style={{ height: '90vh' }}>
                <div style={{ alignSelf: 'flex-center', marginBottom: '1rem' }}>
                    <Link to={'/dashboard'}> <h4 className='mt-5' style={{ textAlign: 'center', margin: 0 }}>Back</h4></Link>
                </div>
                <Row className='w-50'>
                    <Col className='d-flex justify-content-center'>
                        <Card className='shadow w-100 p-3'>
                            <div className='text-center'>
                                <h3>Task:{singleTask.task}</h3>
                                <p>description:{singleTask.description}</p>
                                <h5>Due Date:{formatDate(singleTask.duedate)}</h5>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default ViewTask;
