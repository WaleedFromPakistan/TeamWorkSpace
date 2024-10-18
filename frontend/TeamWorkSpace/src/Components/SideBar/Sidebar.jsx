// Sidebar.js
import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button onClick={toggleSidebar} className="close-btn">×</button>
      <ul>
        <li><Link to='/Dashboard' onClick={toggleSidebar}>DashBoard</Link></li>
        <li><Link to="/add-task" onClick={toggleSidebar}>Add New Task</Link></li>
        <li><Link to="/add-member" onClick={toggleSidebar}>Add New Member</Link></li>
        <li><Link to="/task-list" onClick={toggleSidebar}>Tasks List</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
