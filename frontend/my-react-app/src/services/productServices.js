import { fetchData } from "./api"
import Cookies from "js-cookie"
export const getAllProduct=async(data="")=>{
const token=Cookies.get("token")

try{
    const response=await fetchData(`products/getAllProducts?q=${data}`,{
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

export const getAllSubCategories=async(id)=>{
const token=Cookies.get("token")

try{
    const response=await fetchData(`products/getAllSubcategory/${id}`,{
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

export const productupdate=async(data,id)=>{
  const token=Cookies.get("token")

try{
    const response=await fetchData(`products/updateProduct/${id}`,{
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

export const createProduct=async(data)=>{
  const token=Cookies.get("token")

try{
    const response=await fetchData(`products/createProduct`,{
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


export const deleteProduct=async(id)=>{
  const token=Cookies.get("token")


try{
    const response=await fetchData(`products/product/${id}`,{
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