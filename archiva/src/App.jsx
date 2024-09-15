
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route,Link } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Login from './Login';
import GestC from './GestC';
import SignIn from './SignIn';
import MyC from './MyC';
import EditC from './EditC';
import AllC from './AllC';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div className='App'>
        <div>
          (
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/SignIn" element={<SignIn/>}/>
              <Route path="/gestc" element={<GestC/>}/>
              <Route path="/myc" element={<MyC/>}/>
              <Route path="/all" element={<AllC/>}/>
              <Route path="/gestc/edit/:id" element={<EditC/>}/>
              {/* <Route path="/view/:id" element={<EditProject/>}/> */}
              
            </Routes>
          )
        </div>
      </div>
    </Router>
  )
}

export default App
