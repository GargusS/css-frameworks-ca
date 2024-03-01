export const addAuthToken = (token) => {
  localStorage.setItem("accessToken", token);
};

export const getAuthToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken;
};
