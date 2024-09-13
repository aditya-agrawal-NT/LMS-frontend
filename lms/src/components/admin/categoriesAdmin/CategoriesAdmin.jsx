import React, { useEffect, useState } from "react";
import AdminHOC from "../../shared/HOC/AdminHOC";
import Button from "../../shared/button/Button";
import { FaSearch } from "react-icons/fa";
import Table from "../../shared/table/Table";
import CategoriesModal from "./CategoriesModal";
import Paginate from "../../shared/pagination/Paginate";
import {
  createCategory,
  deleteCategory,
  fetchAllCategories,
} from "../../../service/CategoryService";
import Toast from "../../shared/toast/Toast";

const CategoriesAdmin = () => {
  const [search, setSearch] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(11);
  const [totalPages, setTotalPages] = useState(0);

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("");

  const loadCategories = async () => {
    try {
      const data = await fetchAllCategories(pageNumber, pageSize, search);
      setCategoryList(data?.content);
      setTotalPages(data?.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenModal = (category = null) => {
    setIsModalOpen(true);
    setSelectedCategory(category);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  const fields = [
    {
      index: 1,
      title: "Category ID",
    },
    {
      index: 2,
      title: "Category",
    },
    // {
    //     index: 3,
    //     title: "Total Books"
    // },
    {
      index: 4,
      title: "Actions",
    },
  ];

  const handleAddCategory = () => {
    loadCategories();
  };

  const handleSaveCategory = async (categoryData) => {
    try {
      if (selectedCategory) {
        // Update existing user
        //await updatecategory(selectedCategory.mobileNumber, categoryData);
      } else {
        // Create new user
        await createCategory(categoryData);
      }
      await loadCategories();
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  async function deleteCategories(categoryObj) {
    try {
      const data = await deleteCategory(categoryObj.id);
      setToastMessage("Category deleted successfully!");
      setToastType("success");
      setShowToast(true);
      loadCategories();
    } catch (error) {
      setToastMessage("Error occurred while deleting the category.");
      setToastType("error");
      setShowToast(true);
    }
  }

  useEffect(() => {
    loadCategories();
  }, [pageNumber, pageSize]);

  useEffect(() => {
    loadCategories();
  }, [search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSearchClick = async () => {
    await loadCategories();
  };

  return (
    <div className="admin-section">
      <div className="admin-page-mid">
        <h2 className="admin-page-header">Available Categories</h2>
        <div className="admin-page-search">
          <div className="search">
            <input
              type="text"
              placeholder="Search Categories"
              className="searchbar"
              onChange={handleSearchChange}
            ></input>
            <div className="search-icon" onClick={handleSearchClick}>
              <FaSearch />
            </div>
          </div>
          <Button
            text="Add Category"
            type="button"
            onClick={() => handleOpenModal(null)}
          />
        </div>
      </div>
      <Table
        onEditClick={handleOpenModal}
        fields={fields}
        entries={categoryList}
        type={"category"}
        onDeleteClick={deleteCategories}
      />
      <CategoriesModal
        title={selectedCategory ? "Edit Category" : "Add New Category"}
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        handleSaveCategory={handleSaveCategory}
        handleAddCategory={handleAddCategory}
        selectedCategory={selectedCategory}
        setToastMessage={setToastMessage} // Pass toast state to BooksModal
        setToastType={setToastType}
        setShowToast={setShowToast}
      />
      <div className="paginate">
        <Paginate
          currentPage={pageNumber}
          totalPages={totalPages}
          onPageChange={setPageNumber}
        />
      </div>
      <Toast message={toastMessage} type={toastType} show={showToast} onClose={() => setShowToast(false)} />
    </div>
  );
};

export default AdminHOC(CategoriesAdmin);
