import axios from "axios";
import authHeader from "../authentication/auth.header";

const API_URL = "http://localhost:57679/api/PatientVisitingDoctorForm/";
const DOCTOR_AVAILABILITY_FORM_URL =
  "http://localhost:57679/api/PatientVisitingDoctorForm/doctoravailability";

const config = {
  headers: { Authorization: `Bearer ${authHeader()}` },
};

const getDoctorAvailabilities = async () => {
  console.log(config);
  const response = await axios.get(DOCTOR_AVAILABILITY_FORM_URL, config);
  return response.data;
};

const getPatient = async (id) => {
  console.log("Here is patient service");
  console.log(id);
  const response = await axios.get(API_URL + id, config);
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

const editPatient = async (
  patientId,
  fullName,
  dateOfBirth,
  gender,
  phoneNumber,
  emailAddress,
  addressDetail,
  addressStreet,
  addressDistrict,
  addressCity,
  medicalInsuranceCode
) => {
  const response = await axios.put(
    API_URL + patientId,
    {
      fullName,
      dateOfBirth,
      gender,
      phoneNumber,
      emailAddress,
      addressDetail,
      addressStreet,
      addressDistrict,
      addressCity,
      medicalInsuranceCode,
    },
    config
  );
  return response.data;
};

const deletePatient = async (patientId) => {
  const response = await axios.delete(API_URL + patientId, config);
  return response.data;
};

export default {
  getPatient,
  getDoctorAvailabilities,
  create,
  editPatient,
  deletePatient,
};
