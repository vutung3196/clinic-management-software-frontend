import axios from "axios";
import authHeader from "../authentication/auth.header";

const API_URL = "http://localhost:57679/api/PatientHospitalizedProfile/";
const MOVE_TO_END_QUEUE_API_URL =
  "http://localhost:57679/api/PatientVisitingDoctorForm/movetoend";
const DOCTOR_AVAILABILITY_FORM_URL =
  "http://localhost:57679/api/PatientVisitingDoctorForm/doctoravailability";

const config = {
  headers: { Authorization: `Bearer ${authHeader()}` },
};

const getById = async (id) => {
  const response = await axios.get(API_URL + id, config);
  return response.data;
};

const get = async () => {
  const response = await axios.get(API_URL, config);
  return response.data;
};

const getByPatient = async (patientId) => {
  const response = await axios.get(
    API_URL + "getbypatient?patientId=" + patientId,
    config
  );
  return response.data;
};

const create = (patientId, diseaseName, description, revisitDate, code) => {
  return axios
    .post(
      API_URL,
      {
        patientId,
        diseaseName,
        description,
        revisitDate,
        code,
      },
      config
    )
    .then((response) => {
      return response.data;
    });
};

const edit = (id, diseaseName, description, revisitDate) => {
  return axios
    .put(
      API_URL + id,
      {
        diseaseName: diseaseName,
        description: description,
        revisitDate: revisitDate,
      },
      config
    )
    .then((response) => {
      return response.data;
    });
};

const deleteById = async (id) => {
  const response = await axios.delete(API_URL + id, config);
  return response.data;
};

export default {
  getById,
  create,
  deleteById,
  getByPatient,
  edit,
  get,
};
