import React, {useContext, useState} from 'react'
import noteContext from "../context/notes/noteContext"

const AddUser = () => {
    const context = useContext(noteContext);
    const {addUser} = context;

    const [note, setNote] = useState({name: "", email: "", password: ""})

    const handleClick = (e)=>{
        e.preventDefault();
        addUser(note.name, note.email, note.password);
        setNote({name: "", email: "", password: ""})
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div className="container my-3">
            <h2>Add New User</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" value={note.name} onChange={onChange} minLength={5} required /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={note.email} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={note.password} onChange={onChange} minLength={5} required />
                </div>
               
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Add User</button>
            </form>
        </div>
    )
}

export default AddUser
