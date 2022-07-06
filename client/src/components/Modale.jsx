import React, {useState} from 'react'

export const Modale = ({onHanldeName}) => {

const [name, setName] = useState("");

  return (
    <div id="container">
    <div id="exampleModal" className="reveal-modal">
    <form 
    onSubmit={(e) => onHanldeName(e, name)} action=""  className="reveal-modal">
    <label>Пожалуйста введите ваше имя:</label>
      <input 
      onChange={(e) => setName(e.currentTarget.value)}
      className="reveal-modal-input" />
      <button 
      onClick={(e) => onHanldeName(e, name)}
      className="reveal-modal_btn">Enter</button>
    </form>
    
    </div>
  </div>
  )
}
