import React, { useState, useEffect } from 'react';
import Modal from '../../shared/modal/Modal';
import Button from '../../shared/button/Button';
import { createUser, updateUser } from '../../service/UserService';

const UsersModal = ({ title, isModalOpen, handleCloseModal, handleAddUser, selectedUser }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    password: '',
  });

  useEffect(() => {
    if (selectedUser) {
      setUserData({
        name: selectedUser.name || '',
        email: selectedUser.email || '',
        mobileNumber: selectedUser.mobileNumber || '',
        password: '', // Password is not populated for editing
      });
    } else {
      setUserData({
        name: '',
        email: '',
        mobileNumber: '',
        password: '', // Empty fields for new user registration
      });
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log('handle submit called', userData);
    
  //   try {
  //     const data = await createUser(userData);  // Register the new user
  //     console.log(data);
  //     handleAddUser();
  //   } catch (error) {
  //     console.error("Error creating user:", error);
  //   } finally {
  //     handleCloseModal();
  //   }
  // };

  const handleAdd = async () => {
    try {
      const data = await createUser(userData);  // Register the new user
      console.log(data);
      handleAddUser();
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      handleCloseModal();
    }
  }

  const handleEdit = async () => {
    try {
      const data = await updateUser(userData, selectedUser?.mobileNumber);  // Register the new user
      console.log(data);
      handleAddUser();
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      handleCloseModal();
    }
  }

  return (
    <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={title}>
      {/* <form onSubmit={handleSubmit}>                    */}
      <div>                   
        <div className="form-group">
          <label htmlFor="name" className="label-text" style={{ marginBottom: '5px' }}>
            Name:
          </label>
          <input
            className="login-input"
            type="text"
            id="name"
            value={userData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="label-text" style={{ marginBottom: '5px' }}>
            E-mail:
          </label>
          <input
            className="login-input"
            type="text"
            id="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobileNumber" className="label-text" style={{ marginBottom: '5px' }}>
            Mobile:
          </label>
          <input
            className="login-input"
            type="text"
            id="mobileNumber"
            value={userData.mobileNumber}
            onChange={handleChange}
            required
          />
        </div>
        {!selectedUser && ( // Password field is shown only when registering a new user
          <div className="form-group">
            <label htmlFor="password" className="label-text" style={{ marginBottom: '5px' }}>
              Password:
            </label>
            <input
              className="login-input"
              type="password"
              id="password"
              value={userData.password}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <div className="modal-button">
          {!selectedUser && <Button onClick={handleAdd} type='submit' text={'Add'} />}
          {selectedUser && <Button onClick={handleEdit} type='submit' text={'Save'} />}
        </div>
      </div>
      {/* </form> */}
    </Modal>
  );
};

export default UsersModal;
