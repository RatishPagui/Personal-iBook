import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/NoteContext'

function About() {
    const abc = useContext(noteContext)
    useEffect(() => {
        abc.update()
    }, [])
    return (
        <div>
           <h3> This is About {abc.state.name} and he is in class {abc.state.class}</h3>
        </div>
    )
}

export default About
