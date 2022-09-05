export const formatError = (error) =>
  error?.response?.data?.message ?? "Error, algo salió mal";
