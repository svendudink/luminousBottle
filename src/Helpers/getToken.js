const getToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    console.log("token", token);
    console.log("String(token)", String(token));
    return token;
  } else {
    return false;
  }
};

export { getToken };
