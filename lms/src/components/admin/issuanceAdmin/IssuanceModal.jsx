import React, {useState, useEffect} from 'react'
import Modal from '../../shared/modal/Modal'
import './BooksAdmin.css'
import Button from '../../shared/button/Button';
import { createBook, updateBook } from '../../../service/BookService';
import { fetchCategories } from '../../../service/CategoryService';
import Toast from '../../shared/toast/Toast';

const IssuanceModal = ({title, isModalOpen, handleCloseModal, handleAddBook, selectedBook, setToastMessage, setToastType, setShowToast}) => {
const [issuanceData, setIssuanceData] = useState({
    title: "",
    author: "",
    quantity: 0,
    categoryName: ""
})
const [categoriesList, setcategoriesList] = useState([])
useEffect(() => {
  if (selectedBook) {
    setBookData({
      title: selectedBook.title,
      author: selectedBook.author,
      quantity: selectedBook.quantity,
      image: null,
      categoryName: selectedBook.categoryName || ""
    });
  } else {
    setBookData({
      title: "",
      author: "",
      quantity: 0,
      image: null,
      categoryName: ""
    });
  }
}, [selectedBook]);

const getCategoriesList =async ()=> { 
  const categoryData = await fetchCategories()
  setcategoriesList(categoryData);
}

useEffect(()=>{
  getCategoriesList();
}, [])

const handleAdd = async () => {
  try {
    const catId = Number(bookData.categoryName);
    delete bookData.categoryName;
    bookData.categoryId = catId;
    const data = await createBook(bookData);  // Register the new user
    setToastMessage("Book added successfully!");
    setShowToast(true);
    setToastType("success");
    console.log("Added",data);
    handleAddBook();
  } catch (error) {
    setToastMessage("Error occurred while saving the book.");
      setToastType("error");
      setShowToast(true);
  } finally {
    handleCloseModal();
  }
}

const handleEdit = async () => {
  try {
    const catId = Number(bookData.categoryName);
    delete bookData.categoryName;
    bookData.categoryId = catId;
    const data = await updateBook(bookData, selectedBook?.id);  // Register the new user
    setToastMessage("Book updated successfully!");
        setShowToast(true);
        setToastType("success");
    console.log(data);
    handleAddBook();
  } catch (error) {
    setToastMessage("Book added successfully!");
         setShowToast(true);
         setToastType("success");
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
            <select className='login-input modal-select' value={bookData.categoryName} id='categoryName' onChange={handleChange} required>
            <option value=''>Select Category</option>
            {categoriesList.map((category)=>(
              <option key={category.id} value={category.id}>{category.name}</option>
            )
            )}
            </select>
          </div>
          <div className="modal-button">
         {!selectedBook && <Button onClick={handleAdd} type='submit' text={"Add"} />}
         {selectedBook && <Button onClick={handleEdit} type='submit' text={"Edit"} />}
          </div>
          </div>
      </Modal>
      
  )
}

export default IssuanceModal