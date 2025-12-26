
import React from 'react';
import styles from './modal.module.css';
import { FaExclamationTriangle } from 'react-icons/fa'; // Using a standard warning icon

const Modal = ({ isOpen, onCancel, onConfirm,type }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        
        <div className={styles.header}>
          <FaExclamationTriangle className={styles.warningIcon} />
          
          <h2 className={styles.title}>{type==="logout" ? "Log Out" : "Delete"}</h2>
        </div>

        <p className={styles.message}>
          Are you sure you want to {type==="logout" ? "Log Out" : "Delete"}?
        </p>

        <div className={styles.actions}>
          <button 
            className={`${styles.button} ${styles.cancelButton}`} 
            onClick={onCancel}
          >
            Delete
          </button>
          
          <button 
            className={`${styles.button} ${styles.confirmButton}`} 
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>

      </div>
    </div>
  );
};

export default Modal;
