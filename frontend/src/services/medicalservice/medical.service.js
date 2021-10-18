import axios from "axios";
import authHeader from "../authentication/auth.header";

const API_URL = "http://localhost:57679/api/medicalservice/";
const API_URL_GROUP = "http://localhost:57679/api/medicalservicegroup/";

const config = {
  headers: { Authorization: `Bearer ${authHeader()}` },
};

const getDoctorVisitingFormMedicalService = async () => {
  const response = await axios.get(
    API_URL + "doctorvisitingformmedicalservice",
    config
  );
  return response.data;
};

const getMedicalServiceWithGroup = async () => {
  const response = await axios.get(API_URL + "bygroup", config);
  return response.data;
};

const getAllMedicalServiceGroups = async () => {
  const response = await axios.get(API_URL_GROUP, config);
  return response.data;
};

const getAllMedicalServices = async () => {
  const response = await axios.get(API_URL, config);
  return response.data;
};

const createMedicalService = async (name, description, price, groupId) => {
  const response = await axios.post(
    API_URL,
    { name, description, price, groupId },
    config
  );
  return response.data;
};

const editMedicalService = async (id, name, description, price, groupId) => {
  const response = await axios.put(
    API_URL + id,
    { name, description, price, groupId },
    config
  );
  return response.data;
};

const deleteMedicalService = async (id) => {
  const response = await axios.delete(API_URL + id, config);
  return response.data;
};

const createMedicalServiceGroup = async (name, description) => {
  const response = await axios.post(
    API_URL_GROUP,
    { name, description },
    config
  );
  return response.data;
};

const editMedicalServiceGroup = async (id, name, description) => {
  const response = await axios.put(
    API_URL_GROUP + id,
    { name, description },
    config
  );
  return response.data;
};

const deleteMedicalServiceGroup = async (id) => {
  const response = await axios.delete(API_URL_GROUP + id, config);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getDoctorVisitingFormMedicalService,
  getMedicalServiceWithGroup,
  getAllMedicalServiceGroups,
  createMedicalServiceGroup,
  editMedicalServiceGroup,
  deleteMedicalServiceGroup,
  getAllMedicalServices,
  createMedicalService,
  editMedicalService,
  deleteMedicalService,
};
