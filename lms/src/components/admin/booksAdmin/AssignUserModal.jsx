import React, {useState, useEffect} from 'react'
import Modal from '../../shared/modal/Modal'
import './BooksAdmin.css'
import Button from '../../shared/button/Button';
import { createBook, updateBook } from '../../service/BookService';
import { fetchUsers } from '../../service/UserService';

const AssignUserModal = ({title, isAssignModalOpen, closeAssignModal, selectedBook}) => {

const [assignBookData, setAssignBookData] = useState({
  title: "",
  user: "",
  mobileNumber: ""

})
const [userList, setuserList] = useState([])
useEffect(() => {
  if (selectedBook) {
    setAssignBookData({
      title: selectedBook.title,
    });
  } else {
    setAssignBookData({
      title: "",
      user: "",
      mobileNumber: ""
    });
  }
}, [selectedBook]);

const getUserList = async () => {
  const userData = await fetchUsers()
  setuserList(userData)
}
useEffect(()=> {
  getUserList();
},[])

const handleAssign = () => {

}


const handleChange = (e) => {
  const { id, value } = e.target;
  setAssignBookData((prevData) => ({
    ...prevData,
    [id]: value
  }));
};

  return (
    <Modal isOpen={isAssignModalOpen} onClose={closeAssignModal} title={title}>
        {/* <form onSubmit={handleAddBook}> */}
        <div>
          <div className="form-group">
            <label htmlFor="author" className="label-text" style={{ marginBottom: "5px" }}>Title:</label>
            <input className="login-input" type="text" id="author" value={assignBookData.title} onChange={handleChange} required/>
          </div>
          
          <div className="form-group">
            <label htmlFor="quantity" className="label-text" style={{ marginBottom: "5px" }}>User's Mobile:</label>
            {/* <input className="login-input" type="text" id="category" value={assignBookData.category} onChange={handleChange} required /> */}
            <select className='login-input modal-select' value={assignBookData.user} id='categoryName' onChange={handleChange} required>
            <option value=''>Select User</option>
            {userList.map((user)=>(
              <option key={user.id} value={user.mobileNumber}>{user.mobileNumber}</option>
            )
            )}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="expectedReturn" className="label-text" style={{ marginBottom: "5px" }}>Expected Return:</label>
            <input className="login-input" type="date" id="quantity" value={assignBookData.quantity} onChange={handleChange} required />
          </div> 
          <div className="modal-button">
            <Button onClick={handleAssign} type='submit' text={"Assign"} />
          </div>
          </div>
      </Modal>
  )
}

export default AssignUserModal