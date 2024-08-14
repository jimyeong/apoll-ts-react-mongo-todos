const getFamilyName = () => {
  return localStorage.getItem("familyName");
};
const getSurName = () => {
  return localStorage.getItem("givenName");
};
const getEmail = () => {
  return localStorage.getItem("email");
};
const getName = () => {
  return localStorage.getItem("name");
};
const getPicture = () => {
  return localStorage.getItem("userPicture");
};
const isLogin = () => {
  return localStorage.getItem("login");
};
const logout = () => {
  localStorage.setItem("login", "-1");
  localStorage.setItem("familyName", "");
  localStorage.setItem("givenName", "");
  localStorage.setItem("email", "");
  localStorage.setItem("name", "");
  localStorage.setItem("userPicture", "");
};

export {
  getFamilyName,
  getSurName,
  getEmail,
  getName,
  getPicture,
  isLogin,
  logout,
};
