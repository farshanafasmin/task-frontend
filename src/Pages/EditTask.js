import React, { useEffect, useState } from 'react'
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap'
import Header from '../Components/Header'
import { editTask, singleTaskApi } from '../Services/AllApis'
import { useNavigate, useParams } from 'react-router-dom'


function EditTask() {
    
    // Function to format date to yyyy-MM-dd
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

    const [task, setTask] = useState({
        task: '',
        description: '',
        duedate: ''
      });
    
      const { taskId } = useParams(); 
      const navigate = useNavigate();

      useEffect(() => {
        const fetchTask = async () => {
          try {
            const result = await singleTaskApi(taskId);
            if (result.status === 200) {
              // Format the date to yyyy-MM-dd
              const formattedDate = formatDate(result.data.duedate);
              setTask({
                task: result.data.task,
                description: result.data.description,
                duedate: formattedDate
              });
            } else {
              console.error('Failed to fetch task');
            }
          } catch (error) {
            console.error('An error occurred while fetching task:', error);
          }
        };
    
        fetchTask();
      }, [taskId]);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await editTask(taskId, task);
          if (response.status === 200) {
            alert('Task data updated successfully......')
            navigate(`/viewtask/${taskId}`);
          } else {
            alert('Failed to update task');
          }
        } catch (error) {
            alert('An error occurred while updating task:')
          console.error('An error occurred while updating task:', error);
        }
      };
    
  return (
    <div >
        <Header></Header>
         <div className='container mt-3 w-50'>


<h2 className='text-center fw-bolder'>Edit Task</h2>

<div className='mt-3 shadow border rounded p-2'>

  <Form className='mt-4' onSubmit={handleSubmit}>
    <Row>
      {/* react bootstrap->forms->floatinglabels */}
      {/* set name attribute for all normal inputs */}
      {/* we get value by performing onchange event  */}

      {/* to get value we set a value attribute to each normal inputs */}
      <FloatingLabel className='mb-3 col-lg-6' controlId="floatingInputtask" label="Task">
        <Form.Control type="text" name='task' placeholder="Task"   value={task.task}  onChange={handleChange} />
                 
      </FloatingLabel>

      {/* description */}
      <FloatingLabel className='mb-3 col-lg-6' controlId="floatingInputdesc" label="Description">
        <Form.Control type="text" name='description' placeholder="Description" value={task.description}  onChange={handleChange}/>
                 
      </FloatingLabel>

      {/*due date*/}
      <FloatingLabel className='mb-3 col-lg-6' controlId="floatingInputdate" label="Due Date">
        <Form.Control type="date" name='duedate' value={task.duedate}  onChange={handleChange}/>
                 
      </FloatingLabel>

 


    </Row>


      {/* button */}

      <div className='d-flex justify-content-center'>
              <Button type='submit' variant='primary' className='w-25 h-25'>Update</Button>
            </div>
  </Form>


</div>

</div>
    </div>
  )
}

export default EditTask