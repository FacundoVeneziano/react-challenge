import React, { useState } from "react";
import Loader from "../components/Loader";

export const LoadingContext = React.createContext();

export const useLoading = () => React.useContext(LoadingContext);

export function LoadingProvider(props) {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider
      value={{
        loading,
        showLoading: () => setLoading(true),
        hideLoading: () => setLoading(false),
      }}
    >
      <>
        {loading && <Loader />}
        {props.children}
      </>
    </LoadingContext.Provider>
  );
}
