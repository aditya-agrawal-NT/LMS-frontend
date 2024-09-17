import React, { useEffect, useState } from "react";
import AdminHOC from "../../shared/HOC/AdminHOC";
import Table from "../../shared/table/Table";
import Toast from "../../shared/toast/Toast";
import Paginate from "../../shared/pagination/Paginate";
import { fetchAllIssuances } from "../../../service/IssuanceService";
import IssuanceModal from "./IssuanceModal";

const IssuanceAdmin = () => {

  const [selectedIssuance, setSelectedIssuance] = useState(null)
  const [search, setSearch] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [issuanceList, setIssuanceList] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [totalPages, settotalPages] = useState(0)

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("");

  const loadIssuances = async () => {
    try{
      const data = await fetchAllIssuances(pageNumber, pageSize, search);
      console.log('data', data)
      setIssuanceList(data?.content)
      settotalPages(data?.totalPages)
    } catch(error) {
      console.log(error)
    }
  }

  const handleOpenModal = (issunace = null) => {
    setSelectedIssuance(issunace);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedIssuance(null);
  };

  const handleEditIssuance = () => {
    loadIssuances();
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSearchClick = async () => {
    await loadIssuances();
  };

  const fields = [
    {
        index: 1,
        title: "Id"
    },
    {
        index: 2,
        title: "User"
    },
    {
        index: 3,
        title: "Book"
    },
    {
        index: 4,
        title: "Issue time"
    },
    {
        index: 5,
        title: "Expected Return time"
    },
    {
      index: 6,
      title: "Actual Return time"
  },
    {
        index: 7,
        title: "Status"
    },
    {
      index: 8,
      title: "Type"
  },
  {
    index: 9,
    title: "Actions"
},
  ]

  useEffect(()=>{
    loadIssuances();
    console.log("useEffect" ,issuanceList)
  },[pageNumber, pageSize])

  useEffect(() => {
    loadIssuances();
  }, [search]);


  return (
    <div className="admin-section">
      <div className="admin-page-mid">
        <h2 className="admin-page-header">Available Issuances</h2>
        <div className="admin-page-search">
          <div className="search">
            <input
              type="text"
              placeholder="Search By Book or User"
              className="searchbar"
              onChange={handleSearchChange}
            ></input>
            <div className="search-icon" onClick={handleSearchClick}>
            </div>
          </div>
        </div>
      </div>
      <Table
        onEditClick={handleOpenModal}
        fields={fields}
        entries={issuanceList}
        type={"issuance"}
      />
      <IssuanceModal
        title={"Edit Issuance"}
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        selectedIssuance={selectedIssuance}
        handleEditIssuance={handleEditIssuance}
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
      <Toast
        message={toastMessage}
        type={toastType}
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};

export default AdminHOC(IssuanceAdmin);
