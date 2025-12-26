const BASE_URL = "http://localhost:5000/api";

export const fetchData = async (endpoint, options) => {
  const response = await fetch(`${BASE_URL}/${endpoint}`, options);
  let data;

  try {
    data = await response.json(); 
  } catch (err) {
 // backend didn't send JSON
    return {
      success: false,
      message: "Invalid JSON response from server",
      error: err.message,
    };  }

  if (!response.ok) {
    console.log("API ERROR:", data);
    return data; 
  }

  return data;
};




// export const fetchData = async (endpoint, options = {}) => {
//   try {
//     const response = await fetch(`${BASE_URL}/${endpoint}`, options);

//     let data;
//     try {
//       data = await response.json();
//     } catch {
//       throw new Error("Invalid JSON response");
//     }

//     if (!response.ok) {
//       return {
//         success: false,
//         status: response.status,
//         message: data?.message || "Request failed",
//       };
//     }

//     return data;
//   } catch (err) {
//     return {
//       success: false,
//       message: err.message || "Network error",
//     };
//   }
// };
