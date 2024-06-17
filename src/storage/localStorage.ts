type User = {
  userId: string;
  name: string;
  token: string;
};

export const isToken = () => {
  const isLoggined = localStorage.getItem("token");
  if (isLoggined == "0" || isLoggined == "") return null;
  return isLoggined;
};

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const deleteToken = () => {
  localStorage.removeItem("token");
};
