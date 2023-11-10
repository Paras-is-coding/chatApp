import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/logo.svg'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import {loginRoute} from '../utils/APIRoutes'

export default function Login() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    password: ""
  })
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  };


  useEffect(()=>{
    if(localStorage.getItem('chat-app-user')){
      navigate('/');
    }
  },[])


  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleValidation = () => {
    const { username,password} = values;

    if(username.length === "" || password.length === ""){
      toast.error("Username and password is required!",toastOptions);
      return false
    }
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { username,password } = values;
      try {
        const response = await axios.post(loginRoute, {
          username,
          password
        });
        console.log(response)
        localStorage.setItem("chat-app-user", JSON.stringify(response.data.result))
        setValues({
          username: "",
          password: "",
        })
        navigate('/')
      } catch (error) {
        toast.error(error.response.data.message, toastOptions)
      }

    }
  }
  return (
    <>
      <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='brand'>
            <img src={Logo} alt='logo' />
            <h1>snappy</h1>
          </div>

          <input
            type='text'
            placeholder='username'
            name='username'
            value={values.username}
            onChange={(e) => handleChange(e)}
            min ='3'
          />
          <input
            type='password'
            placeholder='password'
            name='password'
            onChange={(e) => handleChange(e)}
          />

          <button type='submit'>Login</button>
          <span>
            Don't have an account? <Link to="/register">Register</Link>
          </span>

        </form>
      </FormContainer>
      <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
height:100vh;
width:100vw;
display:flex;
flex-direction:column;
justify-content:center;
gap:1rem;
align-items:center;
background-color:#131234;

.brand{
  display:flex;
  align-items:center;
  gap:1rem;
  justify-content:center;
  img{
    height:5rem;
  }
  h1{
    color:white;
    text-transform:uppercase;
  }
}

form{
  display:flex;
  flex-direction:column;
  gap:2rem;
  background-color:#00000076;
  border-radius:2rem;
  padding:3rem 5rem;

  input{
    background-color:transparent;
    padding:1rem;
    border:0.1rem solid #4e0eff;
    color:white;
    width:100%;
    font-size:1rem;
    &:focus{
      border:0.1rem solid #997af0;
      outline:none;
    }
  }

  button{
    background-color:#997af0;
    color:white;
    padding:1rem 2rem;
    border:none;
    font-weight:bold;
    cursor:pointer;
    border-radius:0.4rem;
    font-size:1rem;
    text-transform:uppercase;
    transition:0.5s ease-in-out;
    &:hover{
      background-color:#4e0eff;
    }
  }

  span{
    color:white;
    text-transform:uppercase;
    a{
      color:#4e0eff;
      text-decoration:none;
      font-weight:bold;
    }
  }
}

`;
