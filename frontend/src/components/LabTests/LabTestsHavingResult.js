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
import labtestService from "src/services/labtest/labtest.service";
import EditLabTestModal from "./EditLabTestModal";
import ViewLabTestModal from "./ViewLabTestModal";

const LabTestsHavingResult = ({ status }) => {
  const [labTests, setLabTests] = useState([]);
  const [labOrderForm, setLabOrderForm] = useState([]);
  const [doctorVisitingForm, setDoctorVisitingForm] = useState("");
  const [details, setDetails] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [id, setId] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [labTestModal, setLabTestModal] = useState(false);

  const [paymentModal, setPaymentModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [doctorVisitingFormModal, setDoctorVisitingFormModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = React.useState(false);
  const [openErrorModal, setOpenErrorModal] = React.useState(false);
  const [detailedModal, setDetailedModal] = React.useState(false);
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
  const [patient, setPatient] = useState(constPatient);
  const [labTest, setLabTest] = useState("");

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

  const toggleEdit = (row, index) => {
    setPatient(row.patientInformation);
    setId(row.id);
    setLabTest(row);
    setLabTestModal(!labTestModal);
  };

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
    setLabTests(row.labTests);
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
      _style: { width: "8%" },
    },
    { key: "labOrderFormCode", label: "MÃ PHIẾU CHỈ ĐỊNH" },

    { key: "patientDetailedInformation", label: "THÔNG TIN BỆNH NHÂN" },
    { key: "doctorName", label: "Chỉ định" },
    { key: "description", label: "MÔ TẢ" },
    { key: "doctorName", label: "Bác sĩ chỉ định" },
    { key: "statusDisplayed", label: "TRẠNG THÁI" },
    { key: "createdAt", label: "GIỜ CẬP NHẬT" },
    {
      key: "view",
      label: "XEM",
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
          view: (row, index) => {
            return (
              <td className="py-2">
                <ArticleIcon
                  style={cursorPointerStyle}
                  onClick={() => {
                    toggleEdit(row, index);
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
                    window.open("/labtest/" + row.id);
                  }}
                />
              </td>
            );
          },
        }}
      ></CDataTable>
      <ViewLabTestModal
        patient={patient}
        modal={labTestModal}
        onClose={setLabTestModal}
        labTest={labTest}
        labTests={labTests}
        setLabTests={setLabTests}
      />
    </>
  );
};

export default LabTestsHavingResult;
