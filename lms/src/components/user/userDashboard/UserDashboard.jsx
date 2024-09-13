import React from 'react';
import './UserDashboard.css';
import UserHOC from '../../shared/HOC/UserHOC';

const UserDashboard = () => {

    

  return (
    <div className="user-dashboard">
      <div className="main-content">
        <div className="content">
        </div>
      </div>
    </div>
  );
};

export default UserHOC(UserDashboard);

