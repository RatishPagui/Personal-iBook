import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  // Get all Notes
  
  const getNotes = async () => {

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      // mode: 'no-cors',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmMTJhNDRiMzkyZDBmY2EyZDAyN2IwIn0sImlhdCI6MTY3NjgwMzAwNn0.DUGMtspadTVSubYIZxP3bE15b1WCPUpqjRs2XuJlZ8Y"
      }
    })

    const json = await response.json()
    setNotes(json)

  }

  // Add a Note
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmMTJhNDRiMzkyZDBmY2EyZDAyN2IwIn0sImlhdCI6MTY3NjgwMzAwNn0.DUGMtspadTVSubYIZxP3bE15b1WCPUpqjRs2XuJlZ8Y"
      },
      body: JSON.stringify({title, description, tag})
    })

    const note = await response.json();
    setNotes(notes.concat(note))
  }


  const addUser = async (name, email, password) => {
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email, password})
    })

    // const note = await response.json();
    // setNotes(notes.concat(note))
  }

  // Delete a Note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      mode: 'no-cors',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmMTJhNDRiMzkyZDBmY2EyZDAyN2IwIn0sImlhdCI6MTY3NjgwMzAwNn0.DUGMtspadTVSubYIZxP3bE15b1WCPUpqjRs2XuJlZ8Y"
      }
    })
    const notes = response.json(); 
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call 
    const response = fetch(`${host}/api/notes/updatenote/${id}`, {
      mode: 'no-cors',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmMTJhNDRiMzkyZDBmY2EyZDAyN2IwIn0sImlhdCI6MTY3NjgwMzAwNn0.DUGMtspadTVSubYIZxP3bE15b1WCPUpqjRs2XuJlZ8Y"
      },
      body: JSON.stringify({title, description, tag})
    })
    const notes = await response.json(); 

     let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }  
    setNotes(newNotes);
  }

  console.log(notes)
  console.log(getNotes)

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes,addUser }}>
      {props.children}
    </NoteContext.Provider>
  )

}
export default NoteState;