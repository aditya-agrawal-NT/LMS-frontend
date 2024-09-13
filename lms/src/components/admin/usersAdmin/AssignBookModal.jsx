import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBooks } from "../../../service/BookService";
import { createIssuance } from "../../../service/IssuanceService";
import Modal from "../../shared/modal/Modal";
import Button from "../../shared/button/Button";

const AssignBookModal = ({
  title,
  isAssignModalOpen,
  closeAssignModal,
  selectedUser,
}) => {


  const initialState = {
    userId: selectedUser?.id || "",
    bookId: "",
    type: "In house",
    returnTime: "",
  };

  const navigate = useNavigate();

  const [assignBookData, setAssignBookData] = useState({
    ...initialState,
    userId: selectedUser?.id,
  });
  const [bookList, setBookList] = useState([]);
  const [author, setAuthor] = useState("");

  const resetState = () => setAssignBookData(initialState);
  const loadBooks = async () => {
    const data = await fetchBooks();
    setBookList(data);
  };

  useEffect(() => {
    setAssignBookData({
      bookId: "",
      returnTime: "",
      type: "In house",
      userId: selectedUser?.id || "",
    });
  }, [selectedUser]);

  useEffect(() => {
    if (isAssignModalOpen === false) {
      resetState();
      setAuthor("");
    }
  }, [isAssignModalOpen]);

  useEffect(() => {
    loadBooks();
  }, []);

  const handleAssign = async () => {
    console.log(assignBookData);

    try {
      const data = await createIssuance(assignBookData);
      console.log(data);
      navigate("/issuance");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setAssignBookData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    if (id === "bookId") {
      setAssignBookData((prevData) => {
        setAuthor(getBookDetails(value, "author"));
        return {
          ...prevData,
          bookId: getBookDetails(value, "id"),
        };
      });
    }
  };

  const getBookDetails = (text = "", what = "id") => {
    const arr = text.split(".");
    const id = arr[0];
    const name = arr[1];
    console.log(arr, id, name);

    return what === "id" ? parseInt(id) : name;
  }

  return (
    <Modal isOpen={isAssignModalOpen} onClose={closeAssignModal} title={title}>
      <div className="">
        <div className="form-group">
          <label
            htmlFor="userId"
            className="label-text"
            style={{ marginBottom: "5px" }}
          >
            User:
          </label>
          <select
            id="userId"
            className="login-input modal-select"
            defaultValue={selectedUser?.id}
            value={selectedUser?.id}
            disabled
          >
            <option selected value={selectedUser?.id}>
              {selectedUser?.name}
            </option>
          </select>
        </div>
        <div className="form-group">
          <label
            htmlFor="bookId"
            className="label-text"
            style={{ marginBottom: "5px" }}
          >
            Book:
          </label>
          <select
            className="login-input modal-select"
            value={`${assignBookData.bookId}.${author}`}
            id="bookId"
            onChange={(e) => {
              handleChange(e);
            }}
            required
          >
            <option value="">Select Book</option>
            {bookList.map((book) => (
              <option key={book?.id} value={`${book?.id}.${book?.author}`}>
                {book.title}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label
            htmlFor="author"
            className="label-text"
            style={{ marginBottom: "5px" }}
          >
            Author:
          </label>
          <input
            className="login-input"
            type="text"
            id="author"
            value={author}
            disabled
          />
        </div>
        
        <div className="form-group">
          <label
            htmlFor="type"
            className="label-text"
            style={{ marginBottom: "5px" }}
          >
            Type:
          </label>
          <select
            defaultValue={assignBookData.type}
            className="login-input modal-select"
            value={assignBookData.type}
            id="type"
            onChange={handleChange}
            required
          >
            {/* <option selected value="">Select type</option> */}
            <option selected value={"In house"}>
              {"In house"}
            </option>
            <option value={"Take away"}>{"Take away"}</option>
          </select>
        </div>

        <div className="form-group">
          <label
            htmlFor="returnTime"
            className="label-text"
            style={{ marginBottom: "5px" }}
          >
            Expected Return:
          </label>
          <input
            className="login-input"
            type="datetime-local"
            id="returnTime"
            value={assignBookData.returnTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="modal-button">
          <Button onClick={handleAssign} type="submit" text={"Assign"} />
        </div>
      </div>
    </Modal>
  );
};

export default AssignBookModal;
