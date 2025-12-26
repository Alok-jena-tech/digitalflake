import { fetchData } from "./api"
import Cookies from "js-cookie"
export const getAllSubCategory=async(data="")=>{
  const token=Cookies.get("token")


try{
    const response=await fetchData(`subcategories/getAllSubCategories?q=${data}`,{
        method:"GET",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization:`Bearer ${token}`
      },

    })
    return response;
}catch(err){
console.error("catecory fetch error",err)
}
}

export const subCategoryupdate=async(data,id)=>{
  const token=Cookies.get("token")

try{
    const response=await fetchData(`subcategories/updateSubCategories/${id}`,{
        method:"PUT",
        headers: {
        Accept: "application/json",
        Authorization:`Bearer ${token}`
      },
      body: data,

    })
    return response;
}catch(err){
console.error("catecory fetch error",err)
}}

export const createSubCategory=async(data)=>{
  const token=Cookies.get("token")

try{
    const response=await fetchData(`subcategories/createSubCategories`,{
        method:"POST",
        headers: {
        Accept: "application/json",
        Authorization:`Bearer ${token}`
      },
      body: data,

    })
    return response;
}catch(err){
console.error("catecory fetch error",err)
}}

export const deleteSubCategory=async(id)=>{
  const token=Cookies.get("token")


try{
    const response=await fetchData(`subcategories/deleteSubCategories/${id}`,{
        method:"DELETE",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization:`Bearer ${token}`
      },

    })
    return response;
}catch(err){
console.error("catecory fetch error",err)
}
}