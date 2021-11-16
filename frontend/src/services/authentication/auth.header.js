const authHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  if (user && user.accessToken) {
    return user.accessToken;
  } else {
    return {};
  }
};

export default authHeader;
