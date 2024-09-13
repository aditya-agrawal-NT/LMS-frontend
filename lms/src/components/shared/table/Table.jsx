import React from 'react'
import edit from "../../../assets/edit.png";
import deleteLogo from "../../../assets/delete.png";
import assignUser from "../../../assets/clipboard.png";
import assignBook from "../../../assets/book.png";
import Button from '../button/Button';
import { useNavigate } from "react-router-dom";
import Tooltip from '../tooltip/Tooltip';

const Table = ({onEditClick, fields, entries, type, onDeleteClick, onAssignClick}) => {

    const navigate = useNavigate()

    const handleViewBookClick = () => {
        navigate("/book-history");
      };
      const handleViewUserClick = () => {
        navigate("/user-history");
      };

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
          {entries?.map((item) => (
            item.role !== 'ROLE_ADMIN' && <tr key={item.index}>

                {Object.entries(item).map(([key, value]) => (
                    ((type ==='user' && key !== 'role' && key !== 'token') || (type ==='dash-user' && key !== 'role') || (type==='book' && key !=='image' && key !== 'categoryName') || (type==='category') || (type==='issuance') || (type==='dash-category')) && 
                    
                    value && <td key={key}>
                      {typeof value === 'object' ? key === 'user' ? value.name : value.title : value}
                    </td>
                ))}

              {(type !== 'dash-category' && type !=='dash-user') && <td>
                <div className="modifications">
                {type !== 'dash-category' && 
                <Tooltip tooltipText="Edit">
                  <img src={edit} alt='edit' className="edit-logo" onClick={()=>onEditClick(item)}></img>
                  </Tooltip>}
                {(type !== 'issuance' && type !== 'dash-category') && 
                <Tooltip tooltipText="Delete">
                <img src={deleteLogo} alt="delete" className="edit-logo" onClick={() => onDeleteClick(item)}></img></Tooltip>}
                {type === 'user' && 
                <Tooltip tooltipText="Issue">
                <img src={assignBook} alt="assign" className="edit-logo" onClick={()=>onAssignClick(item)}></img></Tooltip>}
                {type === 'book' && 
                <Tooltip tooltipText="Issue">
                <img src={assignUser} alt="assign" className="edit-logo" onClick={()=>onAssignClick(item)}></img></Tooltip>}
                </div>
              </td>}
              {type === 'book' && <td>
                <div className="view-btn">
                    <Button text='View' className="books-view" onClick={handleViewBookClick} />
                </div>
              </td>}
              {type === 'user' && <td>
                <div className="view-btn">
                    <Button text='View' className="books-view" onClick={handleViewUserClick} />
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