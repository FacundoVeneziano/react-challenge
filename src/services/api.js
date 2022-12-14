import axios from "axios";

const createUser = (data) => {
  return axios.post(process.env.REACT_APP_USERS_URL, data);
};

const editUser = ({ _id, ...rest }) => {
  return axios.put(`${process.env.REACT_APP_USERS_URL}/${_id}`, rest);
};

const deleteUser = (id) => {
  return axios.delete(`${process.env.REACT_APP_USERS_URL}/${id}`);
};

export { createUser, deleteUser, editUser };
