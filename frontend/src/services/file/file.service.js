import axios from "axios";
import authHeader from "../authentication/auth.header";

const API_URL = "http://localhost:57679/api/files";
const config = {
  headers: { Authorization: `Bearer ${authHeader()}` },
};

const upload = async (labTestId, cloudinaryFiles) => {
  const response = await axios.post(
    API_URL,
    {
      labTestId,
      cloudinaryFiles,
    },
    config
  );
  return response.data;
};

const getByLabTestId = async (id) => {
  const response = await axios.get(API_URL + "?labTestId=" + id, config);
  return response.data;
};

const edit = async (id, fileName, description) => {
  const response = await axios.put(
    API_URL + "/" + id,
    {
      fileName,
      description,
    },
    config
  );
  return response.data;
};

const deleteFile = async (id) => {
  const response = await axios.delete(API_URL + "/" + id, config);
  return response.data;
};

export default {
  upload,
  getByLabTestId,
  edit,
  deleteFile,
};
