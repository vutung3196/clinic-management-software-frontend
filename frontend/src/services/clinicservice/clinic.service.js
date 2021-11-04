import axios from "axios";
import authHeader from "../authentication/auth.header";

const API_URL = "http://localhost:57679/api/clinicservice";
const CLINIC_INFORMATION_API_URL = "http://localhost:57679/api/clinic/";
const CLINIC_SERVICES_API_URL =
  "http://localhost:57679/api/clinicservice/service";
const CLINIC_SERVICE_GROUP_API_URL =
  "http://localhost:57679/api/clinicservicegroup";

const config = {
  headers: { Authorization: `Bearer ${authHeader()}` },
};

const getClinicServiceForClinicServiceManagementPage = async (clinicId) => {
  const response = await axios.request({
    url: CLINIC_SERVICES_API_URL + "?clinicId=" + clinicId,
    method: "get",
  });
  return response.data;
};

const getAllClinics = async () => {
  console.log("aaaaaa");
  console.log(config.headers);
  const response = await axios.get(CLINIC_INFORMATION_API_URL, config);
  return response.data;
};

const createClinic = async (
  name,
  phoneNumber,
  emailAddress,
  userName,
  password,
  addressDetail,
  addressStreet,
  addressDistrict,
  addressCity,
  enabled,
  firstTimeRegistration
) => {
  const response = await axios.post(CLINIC_INFORMATION_API_URL, {
    name,
    phoneNumber,
    emailAddress,
    userName,
    password,
    addressDetail,
    addressStreet,
    addressDistrict,
    addressCity,
    enabled,
    firstTimeRegistration,
  });
  return response.data;
};

const getClinicService = async (clinicId) => {
  const response = await axios.request({
    url: API_URL + clinicId,
    method: "get",
  });
  return response.data;
};

const getClinicInformation = async (clinicId) => {
  const response = await axios.get(
    CLINIC_INFORMATION_API_URL + clinicId,
    config
  );
  return response.data;
};

const getClinicServiceGroups = async (clinicId) => {
  const response = await axios.get(
    CLINIC_SERVICE_GROUP_API_URL + "?clinicId=" + clinicId,
    config
  );
  return response.data;
};

const editClinic = async (
  id,
  name,
  phoneNumber,
  emailAddress,
  username,
  password,
  addressDetail,
  addressStreet,
  addressDistrict,
  addressCity,
  enabled
) => {
  const response = await axios.put(
    CLINIC_INFORMATION_API_URL + id,
    {
      name: name,
      phoneNumber,
      emailAddress: emailAddress,
      username: username,
      password: password,
      addressDetail,
      addressStreet,
      addressDistrict,
      addressCity,
      enabled: enabled,
    },
    config
  );
  return response.data;
};

const createClinicService = async (
  clinicId,
  name,
  description,
  groupId,
  price
) => {
  const response = await axios.post(
    CLINIC_SERVICES_API_URL,
    {
      clinicId,
      name,
      description,
      groupId,
      price,
    },
    config
  );
  return response.data;
};

const editClinicService = async (
  id,
  clinicId,
  name,
  description,
  groupId,
  price
) => {
  const response = await axios.put(
    CLINIC_SERVICES_API_URL + "/" + id,
    {
      clinicId,
      name,
      description,
      groupId,
      price,
    },
    config
  );
  return response.data;
};

const deleteClinicService = async (id) => {
  const response = await axios.delete(
    CLINIC_SERVICES_API_URL + "/" + id,

    config
  );
  return response.data;
};

const getCurrentClinicService = async (clinicId) => {
  const response = await axios.request({
    url: API_URL,
    method: "get",
    params: {
      clinicId: clinicId,
    },
  });
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getClinicService,
  getClinicInformation,
  getCurrentClinicService,
  editClinic,
  getClinicServiceForClinicServiceManagementPage,
  createClinicService,
  editClinicService,
  deleteClinicService,
  getClinicServiceGroups,
  getAllClinics,
  createClinic,
};
