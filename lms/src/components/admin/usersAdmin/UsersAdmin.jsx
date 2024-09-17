import React, { useEffect, useState } from 'react';
import AdminHOC from '../../shared/HOC/AdminHOC';
import Button from '../../shared/button/Button';
import Table from '../../shared/table/Table';
import UsersModal from './UsersModal';
import Paginate from '../../shared/pagination/Paginate';
import { fetchAllUsers, createUser, deleteUsers } from '../../../service/UserService'; 
import AssignBookModal from './AssignBookModal';
import Toast from '../../shared/toast/Toast';
import ConfirmDeletePopup from '../../shared/confirmDeletePopup/ConfirmDeletePopup';

const UsersAdmin = () => {
  const [search, setSearch] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userList, setUserList] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("");
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)
  
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
    {
      index: 6,
      title: "Issuances",
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


  const handleDeleteUser = async () => {
    try {
      await deleteUsers(userToDelete?.mobileNumber);
      setToastMessage("User deleted successfully!");
      setToastType("success");
      setShowToast(true);
      await loadUsers();
    } catch (error) {
      setToastMessage("Error occurred while deleting the User.");
      setToastType("error");
      setShowToast(true);
    }  finally {
      setIsConfirmPopupOpen(false)
      setUserToDelete(null)
    }
  };

  const handleOpenConfirmDeletePopup = (user) => {
    setIsConfirmPopupOpen(true);
    
    setUserToDelete(user);
  }

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

  const closeAssignBook = () => {
    setIsAssignModalOpen(false);
    setSelectedUser(null);
  };

  const openAssignUser = (user = null) => {
    setSelectedUser(user);
    setIsAssignModalOpen(true);
  }

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
        onDeleteClick={handleOpenConfirmDeletePopup}
        onAssignClick={openAssignUser}
      />
      <UsersModal
        title={selectedUser ? 'Edit User' : 'Add New User'}
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        handleSaveUser={handleSaveUser}
        selectedUser={selectedUser}
        handleAddUser={handleAddUser}
        setToastMessage={setToastMessage} // Pass toast state to BooksModal
        setToastType={setToastType}
        setShowToast={setShowToast}
      />
      <AssignBookModal title={'Assign Book'} isAssignModalOpen={isAssignModalOpen} closeAssignModal={closeAssignBook} selectedUser={selectedUser} />
      <div className="paginate">
        <Paginate
          currentPage={pageNumber}
          totalPages={totalPages}
          onPageChange={setPageNumber}
        />
      </div>
      <Toast
        message={toastMessage}
        type={toastType}
        show={showToast}
        onClose={() => setShowToast(false)}
      />
      <ConfirmDeletePopup 
      isOpen={isConfirmPopupOpen}
      onClose={()=> setIsConfirmPopupOpen(false)}
      onConfirm={handleDeleteUser}
      />
    </div>
  );
};

export default AdminHOC(UsersAdmin);
