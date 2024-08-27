import React, { useEffect, useState } from 'react';
import AdminHOC from '../../shared/HOC/AdminHOC';
import Button from '../../shared/button/Button';
import { FaSearch } from 'react-icons/fa';
import Table from '../../shared/table/Table';
import UsersModal from './UsersModal';
import Paginate from '../../shared/pagination/Paginate';
import { fetchAllUsers, createUser, deleteUsers } from '../../service/UserService'; 

const UsersAdmin = () => {
  const [search, setSearch] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userList, setUserList] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(2);
  const [totalPages, setTotalPages] = useState(0);

  const loadUsers = async () => {
    try {
      const data = await fetchAllUsers(pageNumber, pageSize, search);
      setUserList(data?.content);
      setTotalPages(data?.totalPages);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const handleOpenModal = (user = null) => {
    setIsModalOpen(true);
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

    const fields = [
    {
      index: 1,
      title: "User ID",
    },
    {
      index: 2,
      title: "Name",
    },
    {
      index: 3,
      title: "Mobile",
    },
    {
      index: 4,
      title: "E-Mail",
    },
    {
      index: 5,
      title: "Modifications",
    },
  ];

  const handleSaveUser = async (userData) => {
    try {
      if (selectedUser) {
        // Update existing user
        await updateUser(selectedUser.mobileNumber, userData);
      } else {
        // Create new user
        await createUser(userData);
      }
      await loadUsers();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleAddUser = () => {
    loadUsers();  // Reload users after adding a new user
  };


  const handleDeleteUser = async (user) => {
    try {
      await deleteUsers(user.mobileNumber);
      await loadUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [pageNumber, pageSize]);

  useEffect(() => {
    loadUsers();
  }, [search])

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchClick = async () => {
    await loadUsers()
  };

  return (
    <div className="admin-section">
      <div className="admin-page-mid">
      <h2 className="admin-page-header">Available Users</h2>
      <div className="admin-page-search">
        <div className="search">
          <input
            type="text"
            placeholder="Search Users"
            className="searchbar"
            onChange={handleSearchChange}
          />
          <div className="search-icon" onClick={handleSearchClick}>
            <FaSearch />
          </div>
        </div>
        <Button text="Add User" type="button" onClick={() => handleOpenModal(null)} />
        </div>
      </div>
      <Table
        onEditClick={handleOpenModal}
        fields={fields}
        entries={userList}
        type={'user'}
        onDeleteClick={handleDeleteUser}
      />
      <UsersModal
        title={selectedUser ? 'Edit User' : 'Add New User'}
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        handleSaveUser={handleSaveUser}
        selectedUser={selectedUser}
        handleAddUser={handleAddUser}
      />
      <div className="paginate">
        <Paginate
          currentPage={pageNumber}
          totalPages={totalPages}
          onPageChange={setPageNumber}
        />
      </div>
    </div>
  );
};

export default AdminHOC(UsersAdmin);
