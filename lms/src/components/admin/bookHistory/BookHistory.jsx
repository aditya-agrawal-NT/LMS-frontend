import React from 'react'
import Table from '../../shared/table/Table'
import AdminHOC from '../../shared/HOC/AdminHOC'

const BookHistory = () => {

    const fields = [
        {
            index: 1,
            title: "ID"
        },
        {
            index: 2,
            title: "Book"
        },
        {
          index: 3,
          title: "Issue"
        },
        {
            index: 5,
            title: "Expected Return"
        }
        ,
        {
            index: 6,
            title: "Actual Return"
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

       const entries = [
    {
      index: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      quantity: 5,
    },
    { index: 2, title: "1984", author: "George Orwell", quantity: 8 },
    {
      index: 3,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      quantity: 3,
    },
    {
        index: 4,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        quantity: 5,
      },
      { index: 5, title: "1984", author: "George Orwell", quantity: 8 },
      {
        index: 6,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        quantity: 3,
      },
      { index: 7, title: "1984", author: "George Orwell", quantity: 8 },
      {
        index: 8,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        quantity: 3,
      },
      { index: 9, title: "1984", author: "George Orwell", quantity: 8 },
      {
        index: 10,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        quantity: 3,
      },
  ];


  return (
    <div className="admin-section">
      <h2 className="admin-page-header" style={{marginTop: '10px'}}>Book History</h2>
      <div className="admin-page-mid">
      </div>
        <Table fields={fields} entries={entries} type={'issuance'}/>
    </div>
  )
}

export default AdminHOC(BookHistory)