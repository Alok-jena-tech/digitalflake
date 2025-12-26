import { fetchData } from "./api";

export const userLogin = async (data) => {
  try {
    const response = await fetchData("auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    console.error("Error fatch....", error);
  }
};

export const userSignUp = async (data) => {
  try {
    const response = await fetchData("auth/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    console.error("Error fatch....", error);
  }
};


export const sendOtp = async ({ email}) => {
  try {
    const response = await fetchData("auth/sendopt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify( {email} ),
    });
    return response;
  } catch (err) {
    console.error("Error fetch...", err);
  }
};
export const verifyOtp = async (data) => {
  try {
    const response = await fetchData("auth/verifyopt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response;
  } catch (err) {
    console.error("Error fetch...", err);
  }
};
export const resetpassword = async (data) => {
  try {
    const response = await fetchData("auth/resetpass", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response;
  } catch (err) {
    console.error("Error fetch...", err);
  }
};
