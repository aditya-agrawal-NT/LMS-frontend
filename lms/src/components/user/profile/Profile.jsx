import React from 'react';

import UserHOC from '../../shared/HOC/UserHOC';

const Profile = () => {
  return (
    <div className="user-section">
      <h2>Profile</h2>
    </div>
  );
};

export default UserHOC(Profile);
