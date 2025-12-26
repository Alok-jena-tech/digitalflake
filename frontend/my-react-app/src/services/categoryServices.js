import { fetchData } from "./api"
import Cookies from "js-cookie"

export const getAllCategory=async(data="")=>{
const token=Cookies.get("token")

try{
    const response=await fetchData(`categories/getAllCategory?q=${data}`,{
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

export const categoryupdate=async(data,id)=>{
  const token=Cookies.get("token")

try{
    const response=await fetchData(`categories/updateCategory/${id}`,{
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

export const createCategory=async(data)=>{
  const token=Cookies.get("token")

try{
    const response=await fetchData(`categories/createCategoty`,{
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

export const deleteCategory=async(id)=>{
  const token=Cookies.get("token")


try{
    const response=await fetchData(`categories/deleteCategory/${id}`,{
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