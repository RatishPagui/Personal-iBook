import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import { Alert } from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
import Notes from './components/Notes';
import AddUser from './components/AddUser';

function App() {
  return (
    <>    
        <NoteState>
        <BrowserRouter>
            <Navbar />
            {/* <Alert message="Hello User" /> */}
            <Routes>
              <Route exact path="/" element={<Home />}/>
              <Route exact path="/about" element={<About />}/>              
              <Route exact path="/login" element={ <Login />}/>              
              <Route exact path="/Notes" element={<Notes />}/>
              <Route exact path="/AddUser" element={<AddUser />}/>
          </Routes>
          </BrowserRouter>
        </NoteState>     
    </>
  );
}

export default App;
