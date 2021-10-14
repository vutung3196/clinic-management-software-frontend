import axios from "axios";
import authHeader from "../authentication/auth.header";

const API_URL = "http://localhost:57679/api/medication/";

const config = {
  headers: { Authorization: `Bearer ${authHeader()}` },
};

const get = async () => {
  const response = await axios.get(API_URL, config);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get,
};
