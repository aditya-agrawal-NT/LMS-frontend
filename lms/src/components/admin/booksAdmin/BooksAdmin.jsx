import React, { useEffect, useState } from "react";
import AdminHOC from "../../shared/HOC/AdminHOC";
import "./BooksAdmin.css";
import { FaSearch } from "react-icons/fa";
import Button from "../../shared/button/Button";
import BooksModal from "./BooksModal";
import Table from "../../shared/table/Table";
import Paginate from "../../shared/pagination/Paginate";
import {
  createBook,
  deleteBooks,
  fetchAllBooks,
} from "../../../service/BookService";
import AssignUserModal from "./AssignUserModal";
import Toast from "../../shared/toast/Toast";

const BooksAdmin = () => {
  const [search, setSearch] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookList, setBookList] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(11);
  const [totalPages, setTotalPages] = useState(0);

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("");

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

  // const handleSaveBook = async (bookData) => {
  //   try {
  //     if (selectedBook) {
  //       // Update existing book
  //       await updateBook(selectedBook.id, bookData);

  //       setToastMessage("Book updated successfully!");
  //       // setShowToast(true);
  //       setToastType("success");
  //     } else {
  //       // Create new book
  //       await createBook(bookData);
  //       console.log("Create book Toast Called")
  //       setToastMessage("Book added successfully!");
  //       // setShowToast(true);
  //       setToastType("success");
  //     }
      
  //     setShowToast(true);
  //     console.log({toastMessage, toastType, showToast})
  //     await loadBooks();
  //     console.log("books loaded after operation")
  //     handleCloseModal(); //new
  //   } catch (error) {
  //     setToastMessage("Error occurred while saving the book.");
  //     setToastType("error");
  //     setShowToast(true);
  //   }
  //   console.log("Toast Message:", toastMessage);
  //   console.log("Toast Type:", toastType);
  //   console.log("Show Toast:", showToast);
  // };

  async function handleDeleteBook(bookObj) {
    //console.log(bookObj)
    try {
      await deleteBooks(bookObj.id);

      setToastMessage("Book deleted successfully!");
      setToastType("success");
      setShowToast(true);

      await loadBooks();
    } catch (error) {
      setToastMessage("Error occurred while deleting the book.");
      setToastType("error");
      setShowToast(true);
    }
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
              <FaSearch />
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
        onDeleteClick={handleDeleteBook}
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
    </div>
  );
};

export default AdminHOC(BooksAdmin);
