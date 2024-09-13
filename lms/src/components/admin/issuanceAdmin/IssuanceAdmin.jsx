import React, { useEffect, useState } from "react";
import AdminHOC from "../../shared/HOC/AdminHOC";
import Table from "../../shared/table/Table";
import Paginate from "../../shared/pagination/Paginate";
import { fetchAllIssuances } from "../../../service/IssuanceService";

const IssuanceAdmin = () => {

  const [selectedIssuance, setSelectedIssuance] = useState(null)
  const [issuanceList, setIssuanceList] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [totalPages, settotalPages] = useState(0)

  const loadIssuances = async () => {
    try{
      const data = await fetchAllIssuances(pageNumber, pageSize);
      console.log('data', data)
      setIssuanceList(data?.content)
      settotalPages(data?.totalPages)
    } catch(error) {
      console.log(error)
    }
  }

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
        title: "Return time"
    },
    {
        index: 6,
        title: "Status"
    },
    {
      index: 7,
      title: "Type"
  },
  {
    index: 8,
    title: "Actions"
},
  ]

  useEffect(()=>{
    loadIssuances();
    console.log("useEffect" ,issuanceList)
  },[pageNumber, pageSize])


  return (
    <div className="admin-section">
      <h2 className="admin-page-header" style={{marginTop: '10px'}}>Book Issuances</h2>
      <div className="admin-page-mid">
      </div>
      <Table fields={fields} entries={issuanceList} type={'issuance'}/>
      <div className="paginate"><Paginate currentPage={pageNumber} totalPages={totalPages} onPageChange={setPageNumber} /></div>
    </div>
  );
};

export default AdminHOC(IssuanceAdmin);
