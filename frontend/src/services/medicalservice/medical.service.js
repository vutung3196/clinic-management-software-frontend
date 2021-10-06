import axios from "axios";
import authHeader from "../authentication/auth.header";

const API_URL = "http://localhost:57679/api/medicalservice";

const config = {
  headers: { Authorization: `Bearer ${authHeader()}` },
};

const getDoctorVisitingFormMedicalService = async () => {
  const response = await axios.get(
    API_URL + "/doctorvisitingformmedicalservice",
    config
  );
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getDoctorVisitingFormMedicalService,
};
