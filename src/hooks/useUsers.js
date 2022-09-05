import { useState, useEffect } from "react";

import axios from "axios";
import { useLoading } from "../context/LoadingProvider";
import { formatError } from "../helpers/errors";

const useUsers = (setAlertMessage) => {
  const [users, setUsers] = useState([]);
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
    } catch (error) {
      setAlertMessage({
        isOpen: true,
        message: formatError(error),
        type: "error",
      });
    } finally {
      hideLoading();
    }
  };

  return {
    users,
    getUsers,
  };
};

export default useUsers;
