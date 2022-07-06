import { createContext, useState } from "react";

export const CustomContext = createContext();

export const Context = (props) => {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");

   
    const handleName = (name) => {
        setName(name)
    }
    const handleRoom = (room) => {
        setRoom(room)
    }

    const value = {
        name, room, handleName, handleRoom
    }
    
    return <CustomContext.Provider value={value}>
        {props.children}
    </CustomContext.Provider>
}