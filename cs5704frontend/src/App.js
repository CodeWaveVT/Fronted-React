import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from './Pages/Login';
import Library from './Pages/Library';
import CreateResetAccount from './Pages/CreateResetAccount';
import { useState, useEffect } from 'react';
import SnackBar from './Components/SnackBar';

function App() {
  const [accountTitle, setAccountTitle] = useState("Create Account");
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [loggedOutSnackBarOpen, setLoggedOutSnackBarOpen] = useState(false);
  const [loggedInSnack, setLoggedIn] = useState(false);
  const [loggedOut, setLoggedOut] = useState(() => {
    const isLoggedOut = localStorage.getItem('loggedOut');
    return isLoggedOut !== null ? JSON.parse(isLoggedOut) : false;
  });


  useEffect(() => {
    localStorage.setItem('loggedOut', loggedOut);
    if (loggedOut && loggedOutSnackBarOpen) {
      setSnackBarOpen(true);
    }
  }, [loggedOut, loggedOutSnackBarOpen]);

  useEffect(() => {
    if (loggedInSnack) {
      setLoggedIn(true);
    }
  }, [loggedInSnack]);

  return (
    <div className='full-screen'>
      <SnackBar
        barOpen={snackBarOpen}
        setBarOpen={setSnackBarOpen}
        alertType={3}
        hideDuration={4000}
      />
        <SnackBar
        barOpen={loggedInSnack}
        setBarOpen={setLoggedIn}
        alertType={2}
        hideDuration={4000}
      />
      <div className='App'>
        <Router>
          <Routes>
            <Route path="/" element={<Login setAccountTitle={setAccountTitle} setLoggedOut={setLoggedOut} setLoggedIn = {setLoggedIn} />} />
            <Route path="/lib" element={loggedOut ? <Navigate to="/" /> : <Library setLoggedOut={setLoggedOut} setLoggedOutSnackBarOpen={setLoggedOutSnackBarOpen} />} />
            <Route path="/setUpAccount" element={<CreateResetAccount title={accountTitle} />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;


