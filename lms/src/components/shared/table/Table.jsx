import React from 'react'
import edit from "../../../assets/edit.png";
import deleteLogo from "../../../assets/delete.png";
import assignUser from "../../../assets/clipboard.png";
import assignBook from "../../../assets/book.png";
import Button from '../button/Button';
import { useNavigate } from "react-router-dom";

const Table = ({onEditClick, fields, entries, type, onDeleteClick}) => {

    const navigate = useNavigate()

    const handleViewClick = () => {
        navigate("/issuancesAdmin");
      };

      // const handleAssignBook = () => {
      //   console.log("assigned")
      // }

  return (
    <div className="table-container">
      <div className="table-parent">
      <table className="books-table">
        <thead>
            <tr>
                {fields && fields.length && fields.map((item) => (
                    <th key={item.index}>
                        {item.title}
                    </th>
                ))}
            </tr>
        </thead>
        <tbody>
          {entries.map((item) => (
            item.role !== 'ROLE_ADMIN' && <tr key={item.index}>

                {Object.entries(item).map(([key, value]) => (
                    ((type ==='user' && key !== 'role') || (type==='book' && key !=='image' && key !== 'categoryName') || (type==='category')) && <td key={key}>{value}</td>
                ))}

              <td>
                <div className="modifications">
                <img src={edit} alt='edit' className="edit-logo" onClick={()=>onEditClick(item)}></img>
                <img src={deleteLogo} alt="delete" className="edit-logo" onClick={() => onDeleteClick(item)}></img>
                {type === 'user' && <img src={assignBook} alt="assign" className="edit-logo" ></img>}
                {type === 'book' && <img src={assignUser} alt="assign" className="edit-logo" ></img>}
                </div>
              </td>
              {type === 'book' && <td>
                <div className="view-btn">
                    <Button text='View' className="books-view" onClick={handleViewClick} />
                </div>
              </td>}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
  )
}

export default Table