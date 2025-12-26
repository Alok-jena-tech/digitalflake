import React from "react";
import styles from "./table.module.css";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";

const Table = ({ headers, data, onEdit, onDelete, showActions = true }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header.label}</th>
            ))}
            {showActions && <th>Actions</th>}
          </tr>
        </thead>
        {data.length > 0 ? (
          <tbody>
            {data.map((item, rowIndex) => (
              <tr key={rowIndex}>
                {headers.map((header, colIndex) => (
                  <td key={colIndex}>
                    {header.render
                      ? header.render(item, rowIndex)
                      : item[header.key]}
                  </td>
                ))}

                {showActions && (
                  <td className={styles.actionsCell}>
                    <button
                      onClick={() => onEdit(item)}
                      className={styles.editButton}
                    >
                      <FaRegEdit />
                    </button>
                    <button
                      onClick={() => onDelete(item)}
                      className={styles.deleteButton}
                    >
                      <RiDeleteBinLine />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td
                colSpan={headers.length + (showActions ? 1 : 0)}
                className={styles.noDataCell}
              >
                No data available
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default Table;
