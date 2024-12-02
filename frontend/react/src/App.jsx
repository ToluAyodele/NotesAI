import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Notes from './pages/Notes';
import NewNote from './pages/NewNote';
import EditNote from './pages/EditNote';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css"

const App = () => {
  return (
    
    <Router>
      <ToastContainer/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/new-note" element={<NewNote />} />
        <Route path="/edit-note/:id" element={<EditNote />} />
      </Routes>
    </Router>
  );
};

export default App;
