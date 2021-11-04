import axios from "axios";
import authHeader from "../authentication/auth.header";

const API_URL = "http://localhost:57679/api/user/";

const config = {
  headers: { Authorization: `Bearer ${authHeader()}` },
};

const getUsers = async () => {
  const response = await axios.get(API_URL, config);
  console.log(response.data);
  return response.data;
};

const createUser = async (
  emailAddress,
  userName,
  password,
  fullName,
  enabled,
  role,
  medicalServiceGroupId
) => {
  const response = await axios.post(
    API_URL,
    {
      emailAddress: emailAddress,
      userName,
      password,
      fullName: fullName,
      enabled,
      role: role,
      medicalServiceGroupForTestSpecialistId: medicalServiceGroupId,
    },
    config
  );
  return response.data;
};

const editUser = async (
  id,
  emailAddress,
  userName,
  password,
  fullName,
  enabled,
  role,
  medicalServiceGroupId
) => {
  const response = await axios.put(
    API_URL + id,
    {
      emailAddress,
      userName,
      password,
      fullName: fullName,
      enabled,
      role: role,
      medicalServiceGroupForTestSpecialistId: medicalServiceGroupId,
    },
    config
  );
  return response.data;
};

const deactivateUser = async (id) => {
  const response = await axios.delete(API_URL + id, config);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getUsers,
  deactivateUser,
  createUser,
  editUser,
};
