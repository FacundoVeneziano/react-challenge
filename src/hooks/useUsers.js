import { useState, useEffect } from "react";

import axios from "axios";
import { useLoading } from "../context/LoadingProvider";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState([]);
  const { showLoading, hideLoading } = useLoading();

  /** GET USERS */
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    showLoading();
    try {
      const { data } = await axios.get(process.env.REACT_APP_USERS_URL);

      setUsers(data);
    } catch (err) {
      setError(err);
    } finally {
      hideLoading();
    }
  };

  return {
    users,
    error,
    getUsers,
  };
};

export default useUsers;
