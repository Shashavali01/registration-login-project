import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Register from './Register';
import Contact from './contact';
import Login from './login';

function App() {
  return (
    <BrowserRouter>
      <div className="navbar">
        <h1 className="title">DashBoard</h1>
        <div className="links">
          <Link to="/reg">Register</Link>
          <Link to="/con">Contact</Link>
          <Link to="/log">Login</Link>
        </div>
      </div>

      <Routes>
        <Route path="/reg" element={<Register />} />
        <Route path="/con" element={<Contact />} />
        <Route path="/log" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
