import axios from "axios";

const createUser = (data) => {
  return axios.post(process.env.REACT_APP_USERS_URL, data);
};

export { createUser };
