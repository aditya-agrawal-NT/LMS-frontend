import React from 'react'
import Sidebar from '../sidebar/Sidebar'
import './AdminHOC.css'
import sideDash from "../../../assets/dashboard.png";
import sideUsers from "../../../assets/profile.png";
import sideCategory from "../../../assets/categories.png";
import sideBook from "../../../assets/magic-book.png";
import sideIssuance from "../../../assets/clock.png";

const AdminHOC = (Component) => function HOC() {

    const sidebarItems = [
        { path: '/admin', label: 'Dashboard', img: sideDash},
        { path: '/users', label: 'Users', img: sideUsers },
        { path: '/books', label: 'Books', img: sideBook},
        { path: '/categories', label: 'Categories', img: sideCategory },
        { path: '/issuance', label: 'Issuances', img: sideIssuance }
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

export default AdminHOC