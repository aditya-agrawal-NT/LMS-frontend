import React, {useState, useEffect} from 'react'
import Modal from '../../shared/modal/Modal'
import './BooksAdmin.css'
import Button from '../../shared/button/Button';
import { createBook, updateBook } from '../../service/BookService';

const BooksModal = ({title, isModalOpen, handleCloseModal, handleAddBook, selectedBook}) => {

const [bookData, setBookData] = useState({
  title: "",
    author: "",
    quantity: 0,
    category: ""
})
useEffect(() => {
  if (selectedBook) {
    setBookData({
      title: selectedBook.title,
      author: selectedBook.author,
      quantity: selectedBook.quantity,
      category: selectedBook.category || ""
    });
  } else {
    setBookData({
      title: "",
      author: "",
      quantity: 0,
      category: ""
    });
  }
}, [selectedBook]);

const handleAdd = async () => {
  try {
    const data = await createBook(bookData);  // Register the new user
    console.log(data);
    handleAddBook();
  } catch (error) {
    console.error("Error creating user:", error);
  } finally {
    handleCloseModal();
  }
}

const handleEdit = async () => {
  try {
    const data = await updateBook(bookData, selectedBook?.id);  // Register the new user
    console.log(data);
    handleAddBook();
  } catch (error) {
    console.error("Error creating user:", error);
  } finally {
    handleCloseModal();
  }
}

const handleChange = (e) => {
  const { id, value } = e.target;
  setBookData((prevData) => ({
    ...prevData,
    [id]: value
  }));
};

  return (
    <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={title}>
        {/* <form onSubmit={handleAddBook}> */}
        <div>
          <div className="form-group">
            <label htmlFor="title" className="label-text" style={{ marginBottom: "5px" }}>Title:</label>
            <input className="login-input" type="text" id="title" value={bookData.title} onChange={handleChange} required/>
          </div>
          <div className="form-group">
            <label htmlFor="author" className="label-text" style={{ marginBottom: "5px" }}>Author:</label>
            <input className="login-input" type="text" id="author" value={bookData.author} onChange={handleChange} required/>
          </div>
          <div className="form-group">
            <label htmlFor="quantity" className="label-text" style={{ marginBottom: "5px" }}>Quantity:</label>
            <input className="login-input" type="number" id="quantity" value={bookData.quantity} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="quantity" className="label-text" style={{ marginBottom: "5px" }}>Category:</label>
            <input className="login-input" type="text" id="category" value={bookData.category} onChange={handleChange} required />
          </div>
          <div className="modal-button">
         {!selectedBook && <Button onClick={handleAdd} type='submit' text={"Add"} />}
         {selectedBook && <Button onClick={handleEdit} type='submit' text={"Edit"} />}
          </div>
          </div>
      </Modal>
  )
}

export default BooksModal