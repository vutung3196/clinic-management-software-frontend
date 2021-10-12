import React, { useState, useEffect } from "react";
import laborderformService from "src/services/laborderform/laborderform.service";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
} from "@coreui/react";
import LabTestsHavingResult from "./LabTestsHavingResult";
import LabTestsNeededToBePerformed from "./LabTestsNeededToBePerformed";
import LabTestsWaitingForResult from "./LabTestsWaitingForResult";

import * as Icon from "react-bootstrap-icons";
import ArticleIcon from "@mui/icons-material/Article";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export const CustomLabTests = ({ status }) => {
  console.log("================================================");
  console.log(status);
  if (status === 1) {
    return <LabTestsNeededToBePerformed status={status} />;
  } else if (status === 2) {
    return <LabTestsWaitingForResult status={status} />;
  } else if (status === 3) {
    return <LabTestsHavingResult status={status} />;
  } else {
    return <LabTestsNeededToBePerformed status={status} />;
  }
};

const LabTests = () => {
  const [status, setStatus] = React.useState(1);

  const setInitStatus = () => {
    setStatus(1);
  };

  // useEffect(setStatus(1), [status]);

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardBody>
            <CCardHeader>Danh sách xét nghiệm</CCardHeader>
            <Box sx={{ marginLeft: 3, maxWidth: 300, maxHeight: 5 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Trạng thái
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  label="Trạng thái"
                  onChange={handleChangeStatus}
                >
                  <MenuItem value={1}>Đang chờ thực hiện xét nghiệm</MenuItem>
                  <MenuItem value={2}>Đang chờ kết quả xét nghiệm</MenuItem>
                  <MenuItem value={3}>Đã có kết quả xét nghiệm</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <CustomLabTests status={status} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default LabTests;
