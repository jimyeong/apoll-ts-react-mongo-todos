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

export const setToken = (body: User, token: string) => {
  localStorage.setItem(body.token, token);
};

export const deleteToken = (body: User) => {
  localStorage.setItem(body.token, "0");
};
