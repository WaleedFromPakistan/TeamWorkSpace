// Navbar.js
import React, { useState } from 'react';
import './Navbar.css';
import account from '../../assets/acaount_icon.png';
import Sidebar from '../SideBar/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className='navbar'>
      <div className='navbar_left'>
        <button onClick={toggleSidebar} className='burger-btn'>☰</button>
      </div>
      <div className='navbar_middle'>
        <h3>TEAM WORK SPACE</h3>
      </div>
      <div className='navbar_right'>
        <div className="nav-item dropdown">
          <a 
            className="nav-link " 
            href="" 
            role="button" 
            data-bs-toggle="dropdown" 
            aria-expanded="false"
          >
            <img src={account} alt='Account Icon' className='account-icon'/>
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="">{'member.name'}</a></li>
            <li><a className="dropdown-item" href="/">{'Sign out'}</a></li>
          </ul>
        </div>
      </div>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default Navbar;
