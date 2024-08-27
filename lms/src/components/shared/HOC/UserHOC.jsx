import React, {useState} from 'react'
import Sidebar from '../sidebar/Sidebar';
import userProfile from "../../../assets/man.png";
import userHistory from "../../../assets/clock.png";
import userIssuance from "../../../assets/occupation.png";

const UserHOC = (Component) => function HOC() {

  const sidebarItems = [
    { path: '/profile', label: 'Profile', img: userProfile},
    { path: '/history', label: 'Due Issuances', img: userHistory },
    { path: '/current-issued-books', label: 'Issuance History', img: userIssuance},
  ];

  return (
    <div className='adminhoc'>
        <Sidebar items={sidebarItems} />
        <div className='dash-area'>
            <Component />
        </div>
    </div>
  )
}

export default UserHOC