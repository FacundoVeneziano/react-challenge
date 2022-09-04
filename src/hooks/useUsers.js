import { useState, useEffect } from "react";

import axios from "axios";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState([]);

  /** GET USERS */
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const { data } = await axios.get(process.env.REACT_APP_USERS_URL);

      setUsers(data);
    } catch (err) {
      setError(err);
    } finally {
    }
  };

  return {
    users,
    error,
    getUsers,
  };
};

export default useUsers;
