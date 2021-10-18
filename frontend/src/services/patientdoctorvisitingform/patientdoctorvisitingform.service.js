import axios from "axios";
import authHeader from "../authentication/auth.header";

const API_URL = "http://localhost:57679/api/PatientVisitingDoctorForm/";
const MOVE_TO_END_QUEUE_API_URL =
  "http://localhost:57679/api/PatientVisitingDoctorForm/movetoend";

const MOVE_TO_BEGINNING_QUEUE_API_URL =
  "http://localhost:57679/api/PatientVisitingDoctorForm/movetobeginning";
const DOCTOR_AVAILABILITY_FORM_URL =
  "http://localhost:57679/api/PatientVisitingDoctorForm/doctoravailability";

const config = {
  headers: { Authorization: `Bearer ${authHeader()}` },
};

const getDoctorAvailabilities = async () => {
  const response = await axios.get(DOCTOR_AVAILABILITY_FORM_URL, config);
  return response.data;
};

const getById = async (id) => {
  const response = await axios.get(API_URL + id, config);
  return response.data;
};

const getByRole = async () => {
  const response = await axios.get(API_URL + "byrole", config);
  return response.data;
};

const create = (
  visitingFormCode,
  description,
  doctorId,
  paymentDescription,
  patientId,
  paymentCode
) => {
  return axios
    .post(
      API_URL,
      {
        visitingFormCode,
        description,
        doctorId,
        paymentDescription,
        patientId,
        paymentCode,
      },
      config
    )
    .then((response) => {
      return response.data;
    });
};

const edit = (
  id,
  visitingFormCode,
  description,
  doctorId,
  changeStatusFromWaitingForDoctorToVisitingDoctor
) => {
  return axios
    .put(
      API_URL + id,
      {
        visitingFormCode,
        description,
        doctorId,
        changeStatusFromWaitingForDoctorToVisitingDoctor,
      },
      config
    )
    .then((response) => {
      return response.data;
    });
};

const movetoend = async (id) => {
  return axios
    .put(MOVE_TO_END_QUEUE_API_URL, { id }, config)
    .then((response) => {
      return response.data;
    });
};

const movetobeginning = async (id) => {
  return axios
    .put(MOVE_TO_BEGINNING_QUEUE_API_URL, { id }, config)
    .then((response) => {
      return response.data;
    });
};

const deleteById = async (id) => {
  const response = await axios.delete(API_URL + { id }, config);
  return response.data;
};

export default {
  getById,
  getDoctorAvailabilities,
  create,
  movetoend,
  deleteById,
  getByRole,
  edit,
  movetobeginning,
};
