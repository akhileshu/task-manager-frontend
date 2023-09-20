import axios from "axios";
import { rootUrl } from "../../constants";
const url=`${rootUrl}/auth`
axios.defaults.withCredentials = true; //auto send cookies

export async function createUser(userData) {
  try {
    const response=await axios.post(`${url}/register`, userData); // Returns a response object
    if(response.status===201)return response
    else throw new Error(response);
  } catch (error) {
    // console.log(error)
    throw new Error(error.message);
  }
}
export async function updateUser(userData) {
  //todo: should do it in seperate feature/api
  try {
    const response=await axios.patch(`${rootUrl}/user/update/${userData._id}`, userData); // Returns a response object
    if(response.status===200)return response
    else throw new Error(response);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function loginUser(loginInfo) {
  try {
    const response = await axios.post(`${url}/login`, loginInfo);
    if (response.status === 200) {

      return response;
    } else {

      throw new Error(response);

    }
  } catch (error) {
    // console.log({ error });
    const errorMessage =
      error?.response?.data?.message || "An error occurred during login.";
      // console.log(errorMessage)
    throw new Error(errorMessage); // Store the error message string in the Redux state  }
  }
}


export async function isAuthinticated() {
  try {
    const response = await axios.get(`${url}/checkUser`); // Returns a response object
    if (response.status === 200) return response;
    else {
      throw new Error(response);
    }
  } catch (error) {
    // console.log(error)
    throw new Error(error);
  }
}
export async function logout() {
  return await axios.post(`${url}/logout`); // Returns a response object
}
