import React, { useState, useContext} from 'react'
import { useNavigate} from 'react-router-dom';
import "./EnterForm.css"
import { CustomContext } from '../hooks/Context';

export const EnterForm = () => {
  const {handleName, handleRoom} = useContext(CustomContext)

const [name, setName] = useState("");
const [room, setRoom] = useState("")

const navigate = useNavigate();

const handleSubmit = (e) => {
    e.preventDefault();
    if (name && room){
      handleName(name)
      handleRoom(room)
      navigate('/chat');
    } else if (!name) {
      console.log("поле Username - пустое")
    } else if (!room) {
      console.log("поле Room - пустое")
    }

}


  return (
    <div className="app">
    <div className='enter-form'>
        <h2> Welcome to Chat</h2>
        <form
         onSubmit={(e) => handleSubmit(e)} 
         className='enter-form_form'>
        <label htmlFor="username">Username</label>
        <input 
        className='enter-form-input'
        type="text" 
        name="username" 
        onChange={(e) =>setName(e.currentTarget.value)}
        />
        <label htmlFor="room">Room </label>
        <input 
         className='enter-form-input'
        type="text"
        name="room"
        onChange={(e) =>setRoom(e.currentTarget.value)}
        />
        <button 
        className='enter-form_btn'>Join Chat</button>
        </form>
    </div>
    </div>
  )
}
