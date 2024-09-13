import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import AdminHOC from "../../shared/HOC/AdminHOC";
import DashCard from "../../shared/dashCard/DashCard";
import book from "../../../assets/bookshelf.png";
import users from "../../../assets/group.png";
import inHouse from "../../../assets/reading.png";
import category from "../../../assets/category.png";
import { useNavigate } from "react-router-dom";
import { countAllUsers, fetchAllUsers } from "../../../service/UserService";
import { countAllCategories, fetchAllCategories } from "../../../service/CategoryService";
import { countAllBooks } from "../../../service/BookService";
import BookCard from "../../shared/bookCard/BookCard";
import Table from "../../shared/table/Table";

const AdminDashboard = () => {

  const [userCount, setUserCount] = useState()
  const [categoryCount, setCategoryCount] = useState()
  const [booksCount, setBooksCount] = useState()
  const [pageNumber, setPageNumber] = useState(0)
  const [pageSize, setPageSize] = useState(5)
  const [categoryDashList, setCategoryDashList] =useState([])
  const [userDashList, setUserDashList] = useState([])

  const navigate = useNavigate();

  const loadCount = async () => {
    const userData = await countAllUsers()
    const categoryData = await countAllCategories()
    const booksData = await countAllBooks()
    setUserCount(userData)
    setCategoryCount(categoryData)
    setBooksCount(booksData)
  }

  useEffect(() => {
    loadCount();
  },[])

  const loadCategories = async () => {
    try{
      const data = await fetchAllCategories(pageNumber, pageSize);
      setCategoryDashList(data?.content)
    } catch(error) {
      console.log(error);
    }
  }
  const loadUsers = async () => {
    try{
      const data = await fetchAllUsers(pageNumber, pageSize);
      setUserDashList(data?.content)
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(()=> {
    loadCategories();
    loadUsers();
  }, [pageNumber, pageSize]);



  const data = [
    { id: 1, title: "Total Users", number: userCount, logo: users },
    { id: 2, title: "In-House Readers+", number: "124", logo: inHouse },
    { id: 3, title: "Total Books", number: booksCount, logo: book },
    { id: 4, title: "Total Categories", number: categoryCount, logo: category },
  ];

  const sampleBooks = [
    { id: 1, title: "The Psychology of Money", author: "Morgan Housel", logo: "https://m.media-amazon.com/images/I/41mxvU9Tu6L._SY445_SX342_.jpg" },
    { id: 2, title: "IKIGAI", author: "Francesc Miralles", logo: "https://m.media-amazon.com/images/I/81l3rZK4lnL._SY342_.jpg" },
    { id: 3, title: "Dopamine Detox", author: "Thibaut Meurisse", logo: "https://m.media-amazon.com/images/I/712K3sdLlRL._SY342_.jpg" },
    { id: 4, title: "The Intelligent Investor", author: "Benjamin Graham", logo: "https://m.media-amazon.com/images/I/41qowEITwjL._SY445_SX342_.jpg" },
    { id: 5, title: "The Silent Patient", author: "Alex Michaelides", logo: "https://m.media-amazon.com/images/I/5177eLEs+YL._SY445_SX342_.jpg" },
  ]

  const userFields = [
    {
      index: 1,
      title: "ID"
    },
    {
      index: 2,
      title: "Name"
    },
    {
      index: 3,
      title: "Email"
    },
    {
      index: 4,
      title: "Mobile"
    },
  ]

  const categoryFields = [
    {
      index: 1,
      title: "Category ID"
    },
    {
      index: 1,
      title: "Name"
    }
  ]

  const handleCategorySeeMoreClick = () => {
    navigate("/categories");
  };

  const handleUserSeeMoreClick = () => {
    navigate("/users");
  };

  return (
    <div className="admin-section">
      <div className="welcome-admin">
        <div className="welcome-parent">
          <p className="welcome">Welcome</p>
          <p className="admin-name">Aditya!</p>
        </div>
        <p className="admin-date">Wednesday, August 21, 2024</p>
      </div>
      <div className="main-content">
        {data?.map((data) => (
          <DashCard key={data.id} data={data} />
        ))}
      </div>
      <div className="dash-tables">
        <div className="user-dash-table">
          <p className="user-dash-table-header">Users Table</p>
          <Table fields={userFields} entries={userDashList} type={'dash-user'}/>
          <div className="see-more-container">
          <button className="see-more" onClick={handleUserSeeMoreClick}>
            See more
          </button>
          </div>
        </div>
        <div className="user-dash-table">
          <p className="user-dash-table-header">Category Table</p>
          <Table fields={categoryFields} entries={categoryDashList} type={'dash-category'}/>
          <div className="see-more-container">
          <button className="see-more" onClick={handleCategorySeeMoreClick}>
            See more
          </button>
          </div>
        </div>
      </div>
      <div className="book-title-parent">
      <div className="book-title">Featured Books</div>
      <div className="book-line"></div>
      </div>
      <div className="main-content">
        {sampleBooks?.map((data) => (
          <BookCard key={data.id} data={data} />
        ))}
      </div>
    </div>
  );
};

export default AdminHOC(AdminDashboard);
