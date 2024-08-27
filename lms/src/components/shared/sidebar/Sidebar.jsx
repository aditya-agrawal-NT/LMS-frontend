import React from 'react';
import './Sidebar.css';
import {Link} from 'react-router-dom' 
import Button from '../button/Button';

const Sidebar = ({ items }) => {
  return (
    <div className="sidebar">
      {items && items.length && items.map((item) => (
        <Link key={item.path} to={item.path} className="sidebar-item">
            <img className="side-logo" src={item.img} />
            <div className="sidebar-text">{item.label}</div>
        </Link>
      ))}
      <div className="sidebar-logout-btn">
      <Button text="Logout" type="submit" />
      </div>
    </div>
  );
};

export default Sidebar;


