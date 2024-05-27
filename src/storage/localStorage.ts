type User = {
  userId: string;
  name: string;
};

export const isLogined = () => {
  const isLoggined = localStorage.getItem("user_id");
  if (isLoggined == "0" || isLoggined == "") return null;
  return isLoggined;
};

export const setLogined = (body: User) => {
  localStorage.setItem(body.userId, "1");
};

export const setLogout = (body: User) => {
  localStorage.setItem(body.userId, "0");
};
