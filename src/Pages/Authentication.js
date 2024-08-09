import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import { loginApi, registerApi } from '../Services/AllApis';


// destructure the variable register
function Authentication({ register }) {

    const navigate=useNavigate()

    // create state to store form inputs
    const [UserInputs, setInputs] = useState({
        username: "",
        email: "",
        password: ""
    })
    // state to check validation
    const [validUname, setValidUname] = useState(false)
    const [validEmail, setValidEmail] = useState(false)
    const [validPassword, setvalidPassword] = useState(false)



    const setData = (e) => {
        const { name, value } = e.target;
        
        // Update the input values first
        setInputs({ ...UserInputs, [name]: value });
    
        // Then perform validation
        if (name === "username") {
            if (value.match(/^[a-zA-Z ]+$/)) {
                setValidUname(false);
            } else {
                setValidUname(true);
            }
        }
    
        if (name === "email") {
            if (value.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)) {
                setValidEmail(false);
            } else {
                setValidEmail(true);
            }
        }
    
        if (name === "password") {
            if (value.match(/^[a-zA-Z0-9]+$/)) {
                setvalidPassword(false);
            } else {
                setvalidPassword(true);
            }
        }
    
    }

    // api call of register
    const handleRegister=async(e)=>{
        e.preventDefault()
        const{username,email,password}=UserInputs
        if(!username ||!email ||!password){
            alert("Please fill the form...")

        }
        else{
           const result= await registerApi(UserInputs)
           if(result.status==201 ){
            alert(result.data)
            setInputs({ ...UserInputs, username:"",email:"",password:""})
            navigate('/authentication')

           }
           else{
            alert(result.response.data)
            setInputs({ ...UserInputs, username:"",email:"",password:""})
            navigate('/authentication')

           }
        }
    }

     // api call of login
     const handleLogin=async(e)=>{
        e.preventDefault()
        const{email,password}=UserInputs
        if(!email ||!password){
            alert("Please fill the form...")

        }
        else{
           const result= await loginApi(UserInputs)
           if(result.status==200 ){

            // if login is success then store username and id in local storage
            localStorage.setItem("currentUser",result.data.user.username)
            localStorage.setItem("currentUserId",result.data.user._id)
            // localStorage.setItem("token",result.data.token)



            alert(result.data.message)
            console.log(result);
            
            setInputs({ ...UserInputs, email:"",password:""})
            navigate('/dashboard')

           }
           else{
            alert(result.response.data)
            setInputs({ ...UserInputs,email:"",password:""})
            navigate('/dashboard')

           }
        }
    }
    return (
        <div className='auth1 '>
            <Header></Header>

            <div id="auth" className='container w-50 border shadow-large rounded my-5 p-5'>
                <Row >
                    <Col>
                        <img className='img-fluid mt-5 w-100' src='https://i.postimg.cc/HnYKcB3S/log-removebg-preview.png'></img>
                    </Col>
                    <Col className='bg-light rounded shadow'>
                        <div className='text-center'>

                            {/* conditional rendering */}
                            {
                                register ?
                                    <h1 className='my-3'>Register Here</h1>
                                    :
                                    <h1 className='my-3'>Login </h1>
                            }

                            {
                                register &&
                                <>
                                    <FloatingLabel controlId="floatingUserName" label="User name" className="mb-3">
                                        <Form.Control value={UserInputs.username?.username} name="username" onChange={(e) => setData(e)} type="text" placeholder="User name" />
                                    </FloatingLabel>

                                    {/* form validation(name) */}
                                    {
                                        validUname &&
                                        <p className='text-danger my-2 text-start'>Only Alphabets and spaces are allowed</p>

                                    }

                                </>
                            }

                            <>
                                <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                                    <Form.Control value={UserInputs.email?.email} name="email" onChange={(e) => setData(e)} type="email" placeholder="name@example.com" />
                                </FloatingLabel>
                                {/* form validation(email) */}
                              { 
                              validEmail &&
                              <p className='text-danger my-2 text-start'>Enter Correct Email id</p>
                              
                              }

                            </>

                                 <>
    
                                <FloatingLabel controlId="floatingPassword" label="Password">
                                    <Form.Control value={UserInputs.password?.password} name="password" onChange={(e) => setData(e)} type="password" placeholder="Password" />
                                </FloatingLabel>
                                  {/* form validation(password) */}
                              { 
                              validPassword &&
                              <p className='text-danger my-2 text-start'>Only Alphabets and Numbers are allowed</p>
                              
                              }
                                </>
                            {

                                register ? <button onClick={(e)=>handleRegister(e)} className='shadow btn py-2 px-4 mt-3'>Register</button> : <button onClick={(e)=>handleLogin(e)} className='shadow btn py-2 px-4 mt-3'>Login</button>

                            }

                            {

                                register ? <p className='mt-2'>Already Here? <Link to={'/authentication'} style={{ textDecoration: 'none', color: 'blue' }}>Please Login</Link></p> : <p className='mt-2'>New Here? <Link to={'/register'} style={{ textDecoration: 'none', color: 'blue' }}>Sign-Up for free</Link></p>

                            }
                        </div>
                    </Col>
                </Row>

            </div>

        </div>
    )
}

export default Authentication