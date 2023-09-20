import axios from "axios";
import { rootUrl } from "../../constants";
const url = `${rootUrl}/task`;

export async function createTask(taks) {
  try {
    const response = await axios.post(`${url}/add`, taks); // Returns a response object
    if (response.status === 201) return response;
    else throw new Error(response);
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function updateTask(update) {
  // update->{_id,...}
  try {
    const response = await axios.patch(`${url}/update`, update); // Returns a response object

    if (response.status === 200) return response;
    else throw new Error(response);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteTask(id) {
  try {
    const response = await axios.delete(`${url}/delete/${id}`); // Returns a response object

    if (response.status === 200) return response;
    else throw new Error(response);
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function fetchTasksByUserId(obj) {
  

  const {_id}=obj
  delete obj._id
  // console.log(obj)
  try {
    const response = await axios.get(`${url}/fetch/${_id}`, {
      params: obj,
    }); // Returns a response object

    if (response.status === 200) return response;
    else throw new Error(response);
  } catch (error) {
    throw new Error(error.message);
  }
}
