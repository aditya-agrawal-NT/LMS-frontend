import React, {useState, useEffect} from 'react'
import Modal from '../../shared/modal/Modal'
import Button from '../../shared/button/Button';
import { createCategory, updateCategory } from '../../service/CategoryService';

const CategoriesModal = ({title, isModalOpen, handleCloseModal, handleAddCategory, selectedCategory}) => {

const [categoryData, setCategoryData] = useState({
  name: "",
})
useEffect(() => {
  if (selectedCategory) {
    setCategoryData({
      name: selectedCategory.name
    });
  } else {
    setCategoryData({
      name: ""
    });
  }
}, [selectedCategory]);

const handleChange = (e) => {
  const { id, value } = e.target;
  setCategoryData((prevData) => ({
    ...prevData,
    [id]: value
  }));
};

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('handle submit called', categoryData);
  
  try {
    const data = await createCategory(categoryData);  // Register the new category
    console.log(data);
    handleAddCategory();
  } catch (error) {
    console.error("Error creating user:", error);
  } finally {
    handleCloseModal();
  }
};

const handleAdd = async () => {
  try {
    const data = await createCategory(categoryData);  // Register the new user
    console.log(data);
    handleAddCategory();
  } catch (error) {
    console.error("Error creating user:", error);
  } finally {
    handleCloseModal();
  }
}
const handleEdit = async () => {
  try {
    const data = await updateCategory(categoryData, selectedCategory?.id);  // Register the new user
    console.log(data);
    handleAddCategory();
  } catch (error) {
    console.error("Error creating user:", error);
  } finally {
    handleCloseModal();
  }
}

  return (
    <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={title}>
        {/* <form onSubmit={handleSubmit}> */}
        <div>
          <div className="form-group">
            <label htmlFor="title" className="label-text" style={{ marginBottom: "5px" }}>Category Name:</label>
            <input className="login-input" type="text" id="name" value={categoryData.name} onChange={handleChange} required />
          </div>
          <div className="modal-button">
          {!selectedCategory && <Button onClick={handleAdd} type='submit' text={'Add'} />}
          {selectedCategory && <Button onClick={handleEdit} type='submit' text={'Save'} />}
          </div>
          </div>
        {/* </form> */}
      </Modal>
  )
}

export default CategoriesModal