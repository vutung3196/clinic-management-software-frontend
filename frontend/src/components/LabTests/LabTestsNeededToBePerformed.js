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

import * as Icon from "react-bootstrap-icons";
import ArticleIcon from "@mui/icons-material/Article";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import labtestService from "src/services/labtest/labtest.service";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const LabTestsNeededToBePerformed = ({ status }) => {
  const [labOrderForm, setLabOrderForm] = useState([]);
  const [labTests, setLabTests] = useState([]);
  const [doctorVisitingForm, setDoctorVisitingForm] = useState("");
  const [details, setDetails] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [id, setId] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [paymentModal, setPaymentModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [doctorVisitingFormModal, setDoctorVisitingFormModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = React.useState(false);
  const [openErrorModal, setOpenErrorModal] = React.useState(false);
  const [detailedModal, setDetailedModal] = React.useState(false);

  const handleClosePaymentModal = () => setPaymentModal(false);
  const handleCloseDetailedModal = () => setDetailedModal(false);

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

  const cursorPointerStyle = {
    cursor: "pointer",
  };
  const [patient, setPatient] = useState("");

  const toggleCreatePayment = (row) => {
    if (row.status === "Đã thanh toán") {
      setOpenErrorModal(true);
      setNotificationMessage("Phiếu chỉ định này đã được thanh toán");
      return;
    }
    console.log("+++++");
    console.log(row);
    setPatient(row.patientInformation);
    setId(row.id);
    setLabOrderForm(row);
    setPaymentModal(true);
  };

  const toggleDelete = (row) => {
    setDeleteModal(!deleteModal);
    setId(row.id);
  };

  const handleCloseDoctorVisitingFormModal = () =>
    setDoctorVisitingFormModal(false);

  const retrieveAll = () => {
    labtestService
      .getByStatus(status)
      .then((response) => {
        console.log("really");
        console.log(response.data);
        setLabTests(response.data);
      })
      .catch((e) => {
        setLabTests([]);
        console.log(e);
      });
  };

  useEffect(retrieveAll, []);

  const fields = [
    {
      key: "index",
      label: "STT",
      _style: { width: "1%" },
    },
    { key: "labOrderFormCode", label: "MÃ PHIẾU CHỈ ĐỊNH" },

    { key: "patientDetailedInformation", label: "THÔNG TIN BỆNH NHÂN" },
    { key: "medicalServiceName", label: "Tên xét nghiệm" },
    { key: "description", label: "MÔ TẢ" },
    { key: "doctorName", label: "Bác sĩ chỉ định" },
    { key: "status", label: "TRẠNG THÁI" },
    { key: "createdAt", label: "NGÀY TẠO" },
    {
      key: "view",
      label: "CẬP NHẬT",
      _style: { width: "2%" },
      sorter: false,
      filter: false,
    },
    {
      key: "print",
      label: "IN",
      _style: { width: "3%" },
      sorter: false,
      filter: false,
    },
    {
      key: "delete",
      label: "XẾP SAU",
      _style: { width: "3%" },
      sorter: false,
      filter: false,
    },
  ];

  const rowsPerPageOption = {
    label: "Số bản ghi trên trang",
    values: [5, 10, 20],
  };

  const toggleView = (row) => {
    setPatient(row.patientInformation);
    setId(row.id);
    setLabTests(row.labTests);
    setLabOrderForm(row);
    setDetailedModal(true);
  };

  const handleChangeStatus = (event) => {
    // setStatus(event.target.value);
  };

  return (
    <>
      <CDataTable
        items={labTests}
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
          view: (row) => {
            return (
              <td className="py-2">
                <ArticleIcon
                  style={cursorPointerStyle}
                  onClick={() => {
                    toggleView(row);
                  }}
                />
              </td>
            );
          },
          print: (row) => {
            return (
              <td className="py-2">
                <Icon.Printer
                  size="23"
                  style={cursorPointerStyle}
                  onClick={() => {
                    window.open("/laborderform/" + row.id);
                  }}
                />
              </td>
            );
          },
          delete: (row) => {
            return (
              <td className="py-2">
                <ArrowDownwardIcon
                  fontSize="small"
                  style={cursorPointerStyle}
                  onClick={() => {
                    // toggleAddFirstElementToTheEndOfAQueue(row, index);
                  }}
                />
              </td>
            );
          },
        }}
      ></CDataTable>
      {/* <SingleLabOrderFormModal
        open={detailedModal}
        onClose={handleCloseDetailedModal}
        labTests={labTests}
        patient={patient}
        labOrderForm={labOrderForm}
      /> */}
    </>
  );
};

export default LabTestsNeededToBePerformed;
