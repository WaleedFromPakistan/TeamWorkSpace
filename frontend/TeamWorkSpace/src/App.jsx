// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Dashboard from './Pages/Dashboard';
import TaskList from './Components/TaskList/TaskList';
import AddTask from './Components/AddTask/AddTask';
import Card from'./Components/Card/Card';
import AddNewMember from './/Components/AddNewMember/AddNewMember';
import RegisterUser from './Pages/RegisterUser';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<RegisterUser />}/>
        <Route path="/Dashboard" element={<Dashboard/>} />
        <Route path="/task-list" element={<TaskList/>} />
        <Route path="/add-task" element={<AddTask/>} />
        <Route path="/add-member" element={<AddNewMember/>} />
        <Route path='/Card' element={<Card title='To do' card_title='E Commerce' card_description='This is a new Task' members='Muhammad Waleed' />}/>
        </Routes>
    </BrowserRouter>
  );
};

export default App;
