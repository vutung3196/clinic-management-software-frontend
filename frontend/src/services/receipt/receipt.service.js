import axios from "axios";
import authHeader from "../authentication/auth.header";

const API_URL = "http://localhost:57679/api/receipt";

const config = {
  headers: { Authorization: `Bearer ${authHeader()}` },
};

const createReceipt = async (
  type,
  payerName,
  total,
  description,
  clinicId,
  receiptDate
) => {
  const response = await axios.post(API_URL, {
    type: type,
    payerName: payerName,
    total: total,
    description: description,
    clinicId: clinicId,
    receiptDate: receiptDate,
  });
  return response.data;
};

const get = async () => {
  const response = await axios.get(API_URL, config);
  return response.data;
};

const getReport = async (startDate, endDate) => {
  const response = await axios.get(
    API_URL +
      "/receiptreport?" +
      "startDate=" +
      startDate +
      "&endDate=" +
      endDate,
    config
  );
  return response.data;
};

const getById = async (id) => {
  const response = await axios.get(API_URL + "/" + id, config);
  return response.data;
};

const deleteReceipt = async (id) => {
  const response = await axios.delete(API_URL + "/" + id, config);
  return response.data;
};

const editReceipt = async (
  id,
  type,
  payerName,
  total,
  description,
  clinicId,
  receiptDate
) => {
  const response = await axios.put(API_URL + "/" + id, {
    type: type,
    payerName: payerName,
    total: total,
    description: description,
    clinicId: clinicId,
    receiptDate: receiptDate,
  });
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  createReceipt,
  get,
  getById,
  deleteReceipt,
  editReceipt,
  getReport,
};
