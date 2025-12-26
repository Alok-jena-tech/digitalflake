import React, { useState } from 'react';
import styles from './listHeader.module.css';

const ListHeader = ({ title, onSearchChange, onAddNewClick,icon }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    const newTerm = event.target.value;
    setSearchTerm(newTerm);
    if (onSearchChange) {
      onSearchChange(newTerm);
    }
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.titleSection}>
        <div className={styles.iconBlock}>
          {icon}
        </div>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.searchBox}>
          <span className={styles.searchIcon}>&#x1F50D;</span>
          <input
            type="text"
            placeholder={`Search ${title.toLowerCase()}...`}
            value={searchTerm}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
        </div>
      </div>        
        
        <button
          className={styles.addNewButton}
          onClick={onAddNewClick}
        >
          Add New
        </button>
    </div>
  );
};

export default ListHeader;