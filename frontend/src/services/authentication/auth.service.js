import axios from "axios";
import authHeader from "../authentication/auth.header";

const AUTH_API_URL = "http://localhost:57679/api/tokenauth/auth";

const config = {
  headers: { Authorization: `Bearer ${authHeader()}` },
};

const login = async (username, password) => {
  const response = await axios.post(AUTH_API_URL, { username, password });
  if (response.data.data.accessToken) {
    console.log(response.data);
    localStorage.setItem("user", JSON.stringify(response.data.data));
  }
  console.log(response.data.data.clinicId);

  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authenticated = () => {
  var currentUser = getCurrentUser();
  if (!currentUser) {
    console.log("no user");
    return false;
  }
  console.log("it's true dude");
  console.log("user is authenticated");
  return true;
};

const isAdmin = () => {
  var currentUser = getCurrentUser();
  if (!currentUser) {
    return false;
  }
  if (currentUser.role === "Admin") {
    return true;
  }
  return false;
};

const isReceptionist = () => {
  console.log("bruhhhhhhh");
  var currentUser = getCurrentUser();
  if (!currentUser) {
    return false;
  }
  if (currentUser.role === "Receptionist") {
    return true;
  }
  return false;
};

const isDoctor = () => {
  var currentUser = getCurrentUser();
  if (!currentUser) {
    return false;
  }
  if (currentUser.role === "Doctor") {
    return true;
  }
  return false;
};

const isTestSpecialist = () => {
  var currentUser = getCurrentUser();
  if (!currentUser) {
    return false;
  }
  if (currentUser.role === "TestSpecialist") {
    return true;
  }
  return false;
};

const isMasterAdmin = () => {
  var currentUser = getCurrentUser();
  console.log(currentUser);
  if (!currentUser) {
    return false;
  }
  if (currentUser.role === "MasterAdmin") {
    console.log("it's true lol");
    return true;
  }
  return false;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  login,
  logout,
  getCurrentUser,
  authenticated,
  isAdmin,
  isMasterAdmin,
  isReceptionist,
  isTestSpecialist,
  isDoctor,
};
