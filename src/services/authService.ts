import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const signup = async (email: string, password: string) => {
  try {
    const data = {
      email: email,
      password: password,
    };
    const url = API_URL + "/auth/signup";
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: data,
      url,
    }

    const response = await axios(options);
    
    return response.data;
  } catch(err) {
    return err;
  }
}

export const login = async (email: string, password: string) => {
  try {
    const data = {
      email: email,
      password: password,
    };
    const url = API_URL + "/auth/login";
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: data,
      url,
    }

    const response = await axios(options);
    
    return response.data;
  } catch(err) {
    return err;
  }
}

export const changePassword = async (email: string, oldPassword: string, newPassword: string) => {
  try {
    const data = {
      email: email,
      old_password: oldPassword,
      new_password: newPassword,
    };
    const url = API_URL + "/auth/change-password";
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: data,
      url,
    }

    const response = await axios(options);
    
    return response.data;
  } catch(err) {
    return err;
  }
}