import React, { useState, useEffect } from "react";
import hospitalizedprofileService from "src/services/hospitalizedprofile/hospitalizedprofile.service";
import receiptService from "src/services/receipt/receipt.service";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CCollapse,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import * as Icon from "react-bootstrap-icons";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
// import ReadOnlyDetailedPatientHospitalizedProfileModal from "./ReadOnlyDetailedPatientHospitalizedProfileModal";
import ArticleIcon from "@mui/icons-material/Article";
import CreateReceiptReportModal from "./CreateReceiptReportModal";
import ViewReceiptModal from "./ViewReceiptModal";
// import EditHospitalizedProfileModal from "./EditHospitalizedProfileModal";
// import PatientHospitalizedProfileDeleteModal from "./PatientHospitalizedProfileDeleteModal";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Receipts = () => {
  const [receipts, setReceipts] = useState([]);
  const [receipt, setReceipt] = useState("");
  const [details, setDetails] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [id, setId] = useState("");
  const [openSuccessModal, setOpenSuccessModal] = React.useState(false);
  const [openErrorModal, setOpenErrorModal] = React.useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [deleteModal, setDeleteModal] = React.useState(false);

  const [receiptReportModal, setReceiptReportModal] = useState(false);
  const [hospitalizedModal, setHospitalizedModal] = useState(false);

  const [hospitalizedProfile, setHospitalizedProfile] = React.useState("");
  const [patientHospitalizedProfileId, setPatientHospitalizedProfileId] =
    React.useState("");
  const [clinic, setClinic] = React.useState("");
  const [
    detailedPatientHospitalizedProfileModal,
    setDetailedPatientHospitalizedProfileModal,
  ] = React.useState(false);

  const handleCloseSuccessModal = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccessModal(false);
  };

  const handleCloseErrorModal = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenErrorModal(false);
  };

  const constPatient = {
    id: 1,
    fullName: "",
    emailAddress: "tungvu3196@gmail.com",
    phoneNumber: "31231231",
    occupation: null,
    gender: "Nữ",
    createdAt: "09/24/2021",
    updatedAt: null,
    addressDetail: "59/102",
    addressCity: "Hanoi",
    addressStreet: "Truong Chinh",
    addressDistrict: "Dong Da",
    dateOfBirth: "2021-10-04T09:00:53",
    dateOfBirthDetail: "10/04/2021",
    medicalInsuranceCode: "0312312313",
  };

  const cursorPointerStyle = {
    cursor: "pointer",
  };
  const [patient, setPatient] = useState(constPatient);
  const [viewReceiptModal, setViewReceiptModal] = useState(false);

  const toggleEditHospitalizedProfile = (row, index) => {
    console.log("===============");
    console.log(row);
    setPatient(row.patientInformation);
    setHospitalizedProfile(row);
    setHospitalizedModal(!hospitalizedModal);
  };

  const retrieveAll = () => {
    receiptService
      .get()
      .then((response) => {
        var result = response.data;
        for (let index = 0; index < result.length; index++) {
          const element = result[index];
          element.index = index + 1;
        }
        setReceipts(response.data);
      })
      .catch((e) => {
        setReceipts([]);
        console.log(e);
      });
  };

  useEffect(retrieveAll, [!receipts]);

  const fields = [
    { key: "code", label: "MÃ PHIẾU THU", _style: { width: "6%" } },
    {
      key: "patientDetailedInformation",
      label: "THÔNG TIN NGƯỜI NỘP",
      _style: { width: "12%" },
    },
    {
      key: "totalDisplayed",
      label: "SỐ TIỀN",

      _style: { width: "6%" },
    },
    {
      key: "description",
      label: "GHI CHÚ",

      _style: { width: "6%" },
    },
    {
      key: "createdAt",
      label: "NGÀY THU",
      _style: { width: "6%" },
    },
    {
      key: "view",
      label: "XEM",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
    {
      key: "print",
      label: "IN",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
  ];

  const rowsPerPageOption = {
    label: "Số bản ghi trên trang",
    values: [5, 10, 20],
  };

  const handleCloseReceiptReportModal = () => setReceiptReportModal(false);
  const handleCloseViewReceiptModal = () => setViewReceiptModal(false);

  const toggleOpenReceiptModal = (row, index) => {
    setReceipt(row);
    setPatient(row.patientInformation);
    setViewReceiptModal(!viewReceiptModal);
  };

  const toggleCreate = () => {
    setReceiptReportModal(!receiptReportModal);
  };

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Danh sách phiếu thu</CCardHeader>
            <div col="2" class="mb-3 mb-xl-0 col-sm-4 col-md-2 ">
              <CButton
                class="btn btn-primary btn-block"
                type="button"
                onClick={() => toggleCreate()}
              >
                Tạo bảng kê
              </CButton>
            </div>
            <CCardBody>
              <CDataTable
                items={receipts}
                fields={fields}
                columnFilter
                hover
                striped
                bordered
                size="sm"
                itemsPerPageSelect={rowsPerPageOption}
                itemsPerPage={10}
                sorter
                pagination
                scopedSlots={{
                  view: (row, index) => {
                    return (
                      <td className="py-2">
                        <ArticleIcon
                          style={cursorPointerStyle}
                          onClick={() => {
                            toggleOpenReceiptModal(row, index);
                          }}
                        />
                      </td>
                    );
                  },
                  print: (row, index) => {
                    return (
                      <td className="py-2">
                        <Icon.Printer
                          size="23"
                          style={cursorPointerStyle}
                          onClick={() => window.open("/receipt/" + row.id)}
                        />
                      </td>
                    );
                  },
                }}
              ></CDataTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <Snackbar
        open={openSuccessModal}
        autoHideDuration={3000}
        onClose={handleCloseSuccessModal}
      >
        <Alert
          onClose={handleCloseSuccessModal}
          severity="success"
          sx={{ width: "100%" }}
        >
          {notificationMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openErrorModal}
        autoHideDuration={3000}
        onClose={handleCloseErrorModal}
      >
        <Alert
          onClose={handleCloseErrorModal}
          severity="error"
          sx={{ width: "100%" }}
        >
          {notificationMessage}
        </Alert>
      </Snackbar>
      <CreateReceiptReportModal
        open={receiptReportModal}
        onClose={handleCloseReceiptReportModal}
        setOpenSuccessModal={setOpenSuccessModal}
        setOpenErrorModal={setOpenErrorModal}
        setNotificationMessage={setNotificationMessage}
      />

      <ViewReceiptModal
        open={viewReceiptModal}
        onClose={handleCloseViewReceiptModal}
        receipt={receipt}
        patient={patient}
      />
    </>
  );
};

export default Receipts;
