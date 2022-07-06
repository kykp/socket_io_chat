import React, { useEffect, useState, useContext } from 'react'
import { useNavigate} from 'react-router-dom';
import "./Chat.css"
import ScrollToBottom from 'react-scroll-to-bottom';
import { CustomContext } from '../hooks/Context';
import { 
  initiateSocketConnection,
  disconnectSocket,
  sendMessageToChat, 
  listenToMessage,
  listenToRoomUsers,
  } from "../services/socketio.service.js"
export const Chat = () => {
 
    const {name, room} = useContext(CustomContext)

    const [chat, setChat] = useState([]);
    const [currentRoom, setCurrentRoom] = useState(room)
    const [message, setMessage] = useState("");
    const [usersOnline, setUsersOnline] = useState([])
    
    const navigate = useNavigate();
    
    const onSubmit = (e) => {
      e.preventDefault();
      sendMessageToChat(message)
      setMessage("");
    };

    const onLeaveClickButton = () => {
      navigate('/');
    }

    const sendMessageOnEnterFromTextArea = (e) => {
      if(e.key === "Enter" || e.charCode === 13) {
        onSubmit(e);
      }
    }

    useEffect(() => {
      initiateSocketConnection(name, room);

      return () => {
        disconnectSocket();
      }
    },[])

    useEffect(() => {
      listenToRoomUsers( ({room, users}) => {
        setCurrentRoom(room);
        setUsersOnline(users);
      });
     
    })

    useEffect(() => {
      listenToMessage(data => {
        setChat([...chat, data]);
      })
    },[chat])

    return (
      <div className="app">
      <div className='wrapper'>
        <div className='chat-left-side'>
        <button 
        className="chat-left-side_btn " 
        onClick={onLeaveClickButton}
        >leave chat</button>
              <h3>Room Name</h3>
              <span>{currentRoom}</span>
              <h3>Users online</h3>
              {usersOnline?.map((e, index) => (
                <span key={index}>{e.username}</span>
              ))}
            </div>
          <div className="chat">
            <ScrollToBottom className="chat-window" >
              {chat.map((el, index) => (
              <div key={index} className={el.userName !== name ? "chat-window-message" : "chat-window-message forU"}
              >
              <span className="span-user">{el.userName} : {el.time}</span>
                  <span className="span-text"> {el.message}</span>
              </div>
            ))}
            </ScrollToBottom>
          </div>
        
        </div>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
        <textarea 
          className='form-textarea'
          value={message}
          onKeyPress={(e) =>sendMessageOnEnterFromTextArea(e) }
          onChange={(e) => {setMessage(e.target.value)} }
        ></textarea>
        <button
        className='btn'
        onClick={onSubmit}>Send message</button>
        </form> 
        </div>
    )
  }
