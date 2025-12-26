import React from 'react'
import Form from '../Form'
import { useNavigate } from 'react-router-dom'
import CategoryHook from '../../hooks/CategoryHook'
import { createCategory } from '../../services/categoryServices'
import { useAuthoContext } from '../../context/AuthoContext'
import styles from "./addCategoty.module.css"
import toast from 'react-hot-toast'

const AddCategory = () => {
    const {fetchCategory}=useAuthoContext();
    const navigate=useNavigate();
    const categoryFields = [
    {
      name: "name",
      label: "Category Name",
      type: "text",
      required: true,
      placeholder: "Enter category name",
    },
    {
      name: "image",
      label: "Update Image",
      type: "file",
      accept: "image/*",
      required: true,
    },
    
  ];

const addData=async(data)=>{
    try{
   const respo= await createCategory(data)
   if(respo?.success){
    fetchCategory();
    navigate("/category");
    toast.success(respo?.message);
   }
   else{
    toast.error(respo?.message);
   }
}catch(err){
    console.error("Error adding category:", err);
}}


  return (
    <div className={styles.container} >
      <Form title="Category" fields={categoryFields} onSubmit={addData} onCancel={()=>navigate(-1) } submitButtonText="Add" mode="add"/>
    </div>
  )
}

export default AddCategory
