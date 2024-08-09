import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Header from '../Components/Header';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="bg">
            <Header />
            <Container>
                <Row>
                    <Col>
                        <div className="image-container">

                            <img
                                className="img-fluid"
                                src="https://i.postimg.cc/vTvt3t59/background.png"
                                alt="Home"
                            />
                        </div>
                    </Col>
                    <Col><h1>Manage your tasks with just one click!</h1>

                      <Link to={'/authentication'}>  <Button className='btn1 px-3 py-3'>Get Started Free</Button></Link>
                      
                      
                      
                      </Col>
    
    
          </Row>
          
            </Container>
           
        </div>
       
    );
}

export default Home;
