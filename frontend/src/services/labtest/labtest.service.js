import axios from "axios";
import authHeader from "../authentication/auth.header";

const API_URL = "http://localhost:57679/api/labtest/";
const API_DISEASE = "http://localhost:57679/api/disease/";
const MOVE_TO_END_QUEUE_API_URL =
  "http://localhost:57679/api/labtest/movetoend";
const MOVE_TO_BEGINNING_QUEUE_API_URL =
  "http://localhost:57679/api/labtest/movetobeginning";

const config = {
  headers: { Authorization: `Bearer ${authHeader()}` },
};

const getById = async (id) => {
  const response = await axios.get(API_URL + id, config);
  return response.data;
};

const getDiseases = async () => {
  const response = await axios.get(API_DISEASE);
  return response.data;
};

const getByStatus = async (status) => {
  const response = await axios.get(
    API_URL + "bystatus?status=" + status,
    config
  );
  return response.data;
};

const edit = (id, result, status, currentPageStatus) => {
  return axios
    .put(
      API_URL + id,
      {
        result,
        status,
        currentPageStatus,
      },
      config
    )
    .then((response) => {
      return response.data;
    });
};

const movetoend = (id) => {
  return axios
    .put(MOVE_TO_END_QUEUE_API_URL, { id }, config)
    .then((response) => {
      return response.data;
    });
};

const movetobeginning = (id) => {
  return axios
    .put(MOVE_TO_BEGINNING_QUEUE_API_URL, { id }, config)
    .then((response) => {
      return response.data;
    });
};

const createPayment = (
  id,
  paymentDescription,
  paymentCode,
  labTests,
  total
) => {
  return axios
    .post(
      API_URL + "pay/" + id,
      {
        paymentDescription,
        paymentCode,
        labTests,
        total,
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
  edit,
  deleteById,
  createPayment,
  getByStatus,
  movetoend,
  movetobeginning,
  getDiseases,
};
