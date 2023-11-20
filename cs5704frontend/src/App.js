import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from './Pages/Login';
import Library from './Pages/Library';
import CreateResetAccount from './Pages/CreateResetAccount';
import { useState, useEffect  } from 'react';

function App() {
  const [accountTitle, setAccountTitle] = useState("Create Account");
  const [loggedOut, setLoggedOut] = useState(() => {
    const isLoggedOut = localStorage.getItem('loggedOut');
    return isLoggedOut !== null ? JSON.parse(isLoggedOut) : true;
  });

  useEffect(() => {
    localStorage.setItem('loggedOut', loggedOut);
  }, [loggedOut]);

  return (
    <div className='full-screen'>
      <div className='App'>
        <Router>
          <Routes>
            <Route path="/" element={<Login setAccountTitle={setAccountTitle} setLoggedOut={setLoggedOut}/>} />
            <Route path="/lib" element={loggedOut ? <Navigate to="/" /> : <Library setLoggedOut={setLoggedOut} />} />
            <Route path="/setUpAccount" element={<CreateResetAccount title={accountTitle} />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;


