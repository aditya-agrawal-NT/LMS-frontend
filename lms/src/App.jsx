import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'

import "./App.css";
import AdminDashboard from "./components/pages/adminDashboard/AdminDashboard";
import UserDashboard from "./components/pages/userDashboard/UserDashboard";
import Home from "./components/pages/homePage/Home";
import Login from "./components/pages/login/Login";
import Navbar from "./components/shared/navbar/Navbar";
import BooksAdmin from "./components/admin/booksAdmin/BooksAdmin";
import CategoriesAdmin from "./components/admin/categoriesAdmin/CategoriesAdmin";
import UsersAdmin from "./components/admin/usersAdmin/UsersAdmin";
import Profile from "./components/user/profile/Profile";
import IssuedBooks from "./components/user/issuedBooks/IssuedBooks";
import History from "./components/user/history/History";
import AdminRoutes from "./components/routes/AdminRoutes";
import UserRoutes from "./components/routes/UserRoutes";
import Login2 from "./components/pages/login/Login2";
import IssuanceAdmin from "./components/admin/issuanceAdmin/IssuanceAdmin";
import { login } from "./redux/authentication/authActions";
import { getUserByToken } from "./components/service/UserService";

function App() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(()=> {
    const token = window.localStorage.getItem('authtoken')
    console.log('token :', token)  

    if(token){
      getUser(token)
    } else {
      navigate('/')
    }
  }, [dispatch])

  const getUser = async (token) => {
    try{
      const data = await getUserByToken(token);
      console.log("USERDATA",data);
      
      dispatch(login(data))
      window.localStorage.setItem('authtoken', data.token)

      if(data.role === 'ROLE_ADMIN'){
        navigate('/admin')
      } else if(data.role == 'ROLE_USER'){
        navigate('/user')
      } else {
        navigate('/')
      }
    } catch(error){
      navigate('/')
    }
  }


  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/admin" element={<AdminRoutes> <AdminDashboard /> </AdminRoutes>} />
        <Route path="/user" element={<UserRoutes><UserDashboard /></UserRoutes>} />
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<AdminRoutes><BooksAdmin /></AdminRoutes>} />
        <Route path="/users" element={<AdminRoutes><UsersAdmin /></AdminRoutes>} />
        <Route path="/categories" element={<AdminRoutes><CategoriesAdmin /></AdminRoutes>} />
        <Route path="/profile" element={<UserRoutes><Profile /></UserRoutes>} />
        <Route path="/history" element={<UserRoutes><History /></UserRoutes>} />
        <Route path="/current-issued-books" element={<UserRoutes><IssuedBooks /></UserRoutes>} />
        <Route path="/issuance" element={<AdminRoutes><IssuanceAdmin /></AdminRoutes>} />
      </Routes>
    </>
  );
}

export default App;
