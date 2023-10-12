import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from './Pages/Login';
import Library from './Pages/Library';
import NavigationBar from './Components/NavigationBar';

function App() {
  return (
    <div className='full-screen'>
      <div className='App'>
        <Library />
      </div>
    </div>
  );
}

export default App;
