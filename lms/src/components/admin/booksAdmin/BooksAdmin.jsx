import React, { useEffect, useState } from "react";
import AdminHOC from "../../shared/HOC/AdminHOC";
import "./BooksAdmin.css";
import Button from "../../shared/button/Button";
import BooksModal from "./BooksModal";
import Table from "../../shared/table/Table";
import Paginate from "../../shared/pagination/Paginate";
import {
  deleteBooks,
  fetchAllBooks,
} from "../../../service/BookService";
import AssignUserModal from "./AssignUserModal";
import Toast from "../../shared/toast/Toast";
import ConfirmDeletePopup from "../../shared/confirmDeletePopup/ConfirmDeletePopup";

const BooksAdmin = () => {
  const [search, setSearch] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookList, setBookList] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("");

  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false)
  const [bookToDelete, setBookToDelete] = useState(null)

  const loadBooks = async () => {
    try {
      const data = await fetchAllBooks(pageNumber, pageSize, search);
      setBookList(data?.content);
      setTotalPages(data?.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenModal = (book = null) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSearchClick = async () => {
    await loadBooks();
  };

  const fields = [
    {
      index: 1,
      title: "Book ID",
    },
    {
      index: 2,
      title: "Title",
    },
    {
      index: 3,
      title: "Author",
    },
    {
      index: 5,
      title: "Total Quantity",
    },
    {
      index: 6,
      title: "Available Quantity",
    },
    {
      index: 7,
      title: "Modifications",
    },
    {
      index: 8,
      title: "Issuances",
    },
  ];

  async function handleDeleteBook() {
    try {
      await deleteBooks(bookToDelete?.id)
      setToastMessage("Book deleted successfully!");
      setToastType("success");
      setShowToast(true);

      await loadBooks();
    } catch (error) {
      setToastMessage("Error occurred while deleting the book.");
      setToastType("error");
      setShowToast(true);
    } finally {
      setIsConfirmPopupOpen(false)
      setBookToDelete(null)
    }
  }

  const handleOpenConfirmDeletePopup = (book) => {
    console.log(book);
    setIsConfirmPopupOpen(true);
    setBookToDelete(book);
  }

  const openAssignUser = (book = null) => {
    setSelectedBook(book);
    setIsAssignModalOpen(true);
  };
  const closeAssignUser = () => {
    setIsAssignModalOpen(false);
    setSelectedBook(null);
  };

  const handleAddBook = () => {
    loadBooks();
  };

  useEffect(() => {
    loadBooks();
  }, [search]);

  useEffect(() => {
    loadBooks();
  }, [pageNumber, pageSize]);

  return (
    <div className="admin-section">
      <div className="admin-page-mid">
        <h2 className="admin-page-header">Available Books</h2>
        <div className="admin-page-search">
          <div className="search">
            <input
              type="text"
              placeholder="Search Books"
              className="searchbar"
              onChange={handleSearchChange}
            ></input>
            <div className="search-icon" onClick={handleSearchClick}>
            </div>
          </div>
          <Button
            text="Add Book"
            type="button"
            onClick={() => handleOpenModal(null)}
          />
        </div>
      </div>
      <Table
        onEditClick={handleOpenModal}
        fields={fields}
        entries={bookList}
        type={"book"}
        onDeleteClick={handleOpenConfirmDeletePopup}
        onAssignClick={openAssignUser}
      />
      <BooksModal
        title={selectedBook ? "Edit Book" : "Add New Book"}
        isModalOpen={isModalOpen}
        // handleSaveBook={handleSaveBook}
        handleCloseModal={handleCloseModal}
        handleAddBook={handleAddBook}
        selectedBook={selectedBook}
        setToastMessage={setToastMessage} // Pass toast state to BooksModal
        setToastType={setToastType}
        setShowToast={setShowToast}
      />
      <AssignUserModal
        title={"Assign To User"}
        isAssignModalOpen={isAssignModalOpen}
        closeAssignModal={closeAssignUser}
        selectedBook={selectedBook}
      />
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
      onConfirm={handleDeleteBook}
      />
    </div>
  );
};

export default AdminHOC(BooksAdmin);
