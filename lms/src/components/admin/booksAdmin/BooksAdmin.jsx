import React, { useEffect, useState } from "react";
import AdminHOC from "../../shared/HOC/AdminHOC";
import "./BooksAdmin.css";
import { FaSearch } from "react-icons/fa";
import Button from "../../shared/button/Button";
import BooksModal from "./BooksModal";
import Table from "../../shared/table/Table";
import Paginate from "../../shared/pagination/Paginate";
import { createBook, deleteBooks, fetchAllBooks } from "../../service/BookService";
import AssignUserModal from "./AssignUserModal";

const BooksAdmin = () => {
  const [search, setSearch] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null)
  const [bookList, setBookList] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  const [pageSize, setPageSize] = useState(11)
  const [totalPages, setTotalPages] = useState(0)

  const loadBooks = async () => {
    try{
      const data = await fetchAllBooks(pageNumber, pageSize, search);
      setBookList(data?.content)
      setTotalPages(data?.totalPages)
    }
    catch(error){
      console.log(error)
    }
  }

  const handleOpenModal = (book=null) => {
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
        title: "Book ID"
    },
    {
        index: 2,
        title: "Title"
    },
    {
      index: 3,
      title: "Author"
  },
    {
        index: 5,
        title: "Quantity"
    },
    {
        index: 6,
        title: "Modifications"
    },
    {
        index: 7,
        title: "Issuances"
    }
  ]

  const handleSaveBook = async (bookData) => {
    try {
      if (selectedBook) {
        // Update existing user
        await updateBook(selectedBook.id, userData);
      } else {
        // Create new user
        await createBook(bookData);
      }
      await loadBooks();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  async function handleDeleteBook(bookObj){
    console.log(bookObj)
    try{
      await deleteBooks(bookObj.id);
      await loadBooks()
    }
    catch(error){
      console.log(error)
    }
  }

  const openAssignUser = (book=null) => {
    setSelectedBook(book);
    setIsAssignModalOpen(true);
  }
  const closeAssignUser = () => {
    setIsAssignModalOpen(false);
    setSelectedBook(null);
  };

  const handleAddBook = () => {
    loadBooks();
  }

  useEffect(() => {
    loadBooks();
  }, [search])

  useEffect(()=> {
    loadBooks();
  }, [pageNumber, pageSize])

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
      <Button text="Add Book" type="button" onClick={() => handleOpenModal(null)}/>
      </div>
      </div>
      <Table onEditClick={handleOpenModal} fields={fields} entries={bookList} type={'book'} onDeleteClick={handleDeleteBook} onAssignClick={openAssignUser} />
      <BooksModal title={selectedBook ? 'Edit Book' : 'Add New Book'} isModalOpen={isModalOpen} handleSaveBook={handleSaveBook} handleCloseModal={handleCloseModal} handleAddBook={handleAddBook} selectedBook={selectedBook} />
      <AssignUserModal title={'Assign To User'} isAssignModalOpen={isAssignModalOpen} closeAssignModal={closeAssignUser} selectedBook={selectedBook} />
      <div className="paginate"><Paginate currentPage={pageNumber} totalPages={totalPages} onPageChange={setPageNumber} /></div>
    </div>
  );
};

export default AdminHOC(BooksAdmin);
