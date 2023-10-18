import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from './Pages/Login';
import Library from './Pages/Library';
import CreateResetAccount from './Pages/CreateResetAccount';
import { useState } from 'react';

function App() {
  const [accountTitle, setAccountTitle] = useState("Create Account");

  return (
    <div className='full-screen'>
      <div className='App'>
        <Router>
          <Routes>
            <Route path="/" element={<Login setAccountTitle={setAccountTitle}/>} />
            <Route path="/lib" element={<Library/>} />
            <Route path="/setUpAccount" element={<CreateResetAccount title={accountTitle}/>} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
