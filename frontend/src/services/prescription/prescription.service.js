import axios from "axios";
import authHeader from "../authentication/auth.header";

const API_URL = "http://localhost:57679/api/prescription/";
const API_URL_CLINIC = "http://localhost:57679/api/prescription/clinic/";

const config = {
  headers: { Authorization: `Bearer ${authHeader()}` },
};

const getPrescriptions = async (patientId) => {
  const response = await axios.request({
    url: API_URL,
    method: "get",
    params: {
      patientId: patientId,
    },
  });
  console.log(response.data);
  return response.data;
};

const getPrescriptionsByClinicId = async (clinicId) => {
  const response = await axios.request({
    url: API_URL_CLINIC + clinicId,
    method: "get",
  });
  return response.data;
};

const create = async (
  diagnosedDescription,
  revisitDate,
  doctorSuggestion,
  medicationInformation,
  patientHospitalizedProfileId,
  medicalInsuranceCode,
  code,
  patientDoctorVisitingFormId,
  diseaseNote
) => {
  const response = await axios.post(
    API_URL,
    {
      diagnosedDescription,
      revisitDate,
      doctorSuggestion,
      medicationInformation,
      patientHospitalizedProfileId,
      medicalInsuranceCode,
      code,
      patientDoctorVisitingFormId,
      diseaseNote,
    },
    config
  );
  return response.data;
};

const editPrescription = async (
  prescritionId,
  visitReason,
  diagnosedDescription,
  revisitDate,
  doctorSuggestion,
  medicationInformation
) => {
  const response = await axios.put(
    API_URL + prescritionId,
    {
      visitReason: visitReason,
      diagnosedDescription: diagnosedDescription,
      revisitDate: revisitDate,
      doctorSuggestion: doctorSuggestion,
      medicationInformation: medicationInformation,
    },
    config
  );
  return response.data;
};

const deletePrescription = async (id) => {
  const response = await axios.delete(API_URL + id, config);
  return response.data;
};

const getPrescription = async (id) => {
  const response = await axios.get(API_URL + id, config);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getPrescriptions,
  getPrescription,
  create,
  editPrescription,
  deletePrescription,
  getPrescriptionsByClinicId,
};
