import React from 'react';
import './Sidebar.css';
import {Link, useNavigate} from 'react-router-dom' 
import Button from '../button/Button';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/authentication/authActions';
import { logoutUser } from '../../service/UserService';

const Sidebar = ({ items }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    logoutUser()
    dispatch(logout())
    navigate('/')
  }
  return (
    <div className="sidebar">
      {items && items.length && items.map((item) => (
        <Link key={item.path} to={item.path} className="sidebar-item">
            <img className="side-logo" src={item.img} />
            <div className="sidebar-text">{item.label}</div>
        </Link>
      ))}
      <div className="sidebar-logout-btn">
      <Button text="Logout" type="submit" onClick={handleLogout}/>
      </div>
    </div>
  );
};

export default Sidebar;


