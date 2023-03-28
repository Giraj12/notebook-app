import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route



} from "react-router-dom"
import { Fragment, useState } from 'react';
import About from './components/About';
import NoteState from './contexts/notes/NotesState'
import {Alert}  from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {

  const [alert,setAlert]=useState(null)

  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500);
  }
  return (
    <div className="App">


      <NoteState>
        <Router>
          <Fragment>
            <Navbar />
            <Alert alert={alert}/>
            <div className='container'>
              <Routes>
                <Route exact path='/' element={<Home  showAlert={showAlert}/>}>

                </Route>

                <Route exact path='/Login' element={<Login  showAlert={showAlert}/>}></Route>
                <Route exact path='/Signup' element={<Signup showAlert={showAlert}/>}></Route>

                





              </Routes>
            </div>



          </Fragment>


        </Router>
      </NoteState>


    </div>
  );
}

export default App;
