import axios from "axios";
import authHeader from "../authentication/auth.header";

const API_URL = "http://localhost:57679/api/financialreport";

const config = {
  headers: { Authorization: `Bearer ${authHeader()}` },
};
const getFinancialReports = async (startDate, endDate) => {
  const response = await axios.get(
    API_URL + "?startDate=" + startDate + "&endDate=" + endDate,
    config
  );
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getFinancialReports,
};
