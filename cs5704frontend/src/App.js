import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from './Pages/Login';
import Library from './Pages/Library';

function App() {
  return (
    <div className='App'>
      <Login />
    </div>
  );
}

export default App;
