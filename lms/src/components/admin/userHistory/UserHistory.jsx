import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Table from '../../shared/table/Table'
import AdminHOC from '../../shared/HOC/AdminHOC'
import { userHistory } from '../../../service/IssuanceService'
import Paginate from '../../shared/pagination/Paginate'

const UserHistory = () => {

  const {mobileNumber} = useParams();

  const [userHistoryData, setUserHistoryData] = useState([])
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  

    const fields = [
    {
        index: 1,
        title: "Id"
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
  }
  ]

      const loadUserHistory = async () => {
        try{
          const data = await userHistory(mobileNumber, pageNumber, pageSize);
          setUserHistoryData(data?.content);
          setTotalPages(data?.totalPages)
        } catch(error){
          console.log(error);
        }
      }

      useEffect(() => {
        loadUserHistory();
      }, [pageNumber, pageSize]);


  return (
    <div className="admin-section">
      <h2 className="admin-page-header" style={{marginTop: '10px'}}>User's History</h2>
      <div className="admin-page-mid">
      </div>
        <Table fields={fields} entries={userHistoryData} type={'user-history'}/>
        <div className="paginate">
        <Paginate
          currentPage={pageNumber}
          totalPages={totalPages}
          onPageChange={setPageNumber}
        />
      </div>
    </div>
  )
}

export default AdminHOC(UserHistory)