import React from 'react'
import Header from '../Components/Header'
import { Col, ListGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css';
import SingleTask from '../Components/SingleTask';
import Tasks from '../Components/Tasks';

function Dashboard() {
  return (
    <div className='bg1'>    
        <Header></Header>
        <Row>
<Col>

<h2 className='mt-5'>All Tasks</h2>
<Tasks></Tasks>
</Col>
        </Row>
</div>
  )
}

export default Dashboard