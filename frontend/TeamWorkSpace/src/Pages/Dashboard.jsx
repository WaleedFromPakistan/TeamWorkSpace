import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './CSS/Dashboard.css';

const Dashboard = () => {
  const location = useLocation();
  const { role } = location.state || {};

  return (
    <div>
    
          <div className='dashboard'>
        <hr />
        <div className='dashboard_content'>
       
          {role === 'admin' ? (
            <h2>Welcome to Admin Panel</h2>
          ) : (
            <h2>Welcome to User DashBoard</h2>
          )}

          <div className='dashboard_content_add_newTask'>
            <h2>Add New Task</h2>
            <div className='dashboard_content_add_newTask_btn'>
              <Link to='/add-task'>
                <button
                  className='btn btn-primary'
                
                >
                  <img
                    src="https://img.icons8.com/?size=100&id=24717&format=png&color=000000"
                    alt='Add New Task'
                  />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
