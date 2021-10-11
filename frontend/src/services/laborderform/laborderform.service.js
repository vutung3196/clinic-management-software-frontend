import axios from "axios";
import authHeader from "../authentication/auth.header";

const API_URL = "http://localhost:57679/api/laborderform/";

const config = {
  headers: { Authorization: `Bearer ${authHeader()}` },
};

const getById = async (id) => {
  const response = await axios.get(API_URL + id, config);
  return response.data;
};

const create = (
  description,
  labTests,
  patientHospitalizedProfileId,
  code,
  patientDoctorVisitingFormId
) => {
  return axios
    .post(
      API_URL,
      {
        description,
        labTests,
        patientHospitalizedProfileId,
        code,
        patientDoctorVisitingFormId,
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
};
