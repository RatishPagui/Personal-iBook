import { useState } from "react";
import NoteContext from "./notes/NoteContext";

const NoteState = (props) => {
    // const s1 = {
    //     "name": "Ratish",
    //     "class": "2B"
    // }
    // const [state, setState] = useState(s1)
    // const update = () => {
    //     setTimeout(() => {
    //         setState({
    //             "name": "Jay",
    //             "class": "3C"
    //         })
    //     }, 5000)
    // }

    const notesInitial = [
        {
          "_id": "63f214df8027352fd2a9f46e",
          "user": "63f12a44b392d0fca2d027b0",
          "title": "Remainder",
          "description": "Call Mom at 7",
          "tag": "Personal",
          "date": "2023-02-19T12:23:59.925Z",
          "__v": 0
        }
      ]

      const [notes,setNotes] = useState(notesInitial)

    return (
        // <NoteContext.Provider value={{state,update}}>
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;