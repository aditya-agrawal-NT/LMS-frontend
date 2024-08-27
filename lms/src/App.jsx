import React from "react";
import { Routes, Route } from "react-router-dom";
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

import Login2 from "./components/pages/login/Login2";
import IssuanceAdmin from "./components/admin/issuanceAdmin/IssuanceAdmin";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/" element={<Home />} />
        {/* <Route path="/login2" element={<Login />} /> */}
        <Route path="/books" element={<BooksAdmin />} />
        <Route path="/users" element={<UsersAdmin />} />
        <Route path="/categories" element={<CategoriesAdmin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/history" element={<History />} />
        <Route path="/current-issued-books" element={<IssuedBooks />} />
        <Route path="/issuances-admin" element={<IssuanceAdmin />} />
      </Routes>
    </>
  );
}

export default App;
