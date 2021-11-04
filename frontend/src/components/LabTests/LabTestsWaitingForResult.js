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
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import ViewLabTestModal from "./ViewLabTestModal";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const LabTestsWaitingForResult = ({ status }) => {
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

  const constlabTest = {
    id: 2,
    createdAt: "10/11/2021",
    labOrderFormId: 2,
    labOrderFormCode: "CĐ7591",
    description: "đầu gối trái",
    medicalServiceName: "MRI đầu gối",
    doctorVisitingFormCode: null,
    statusDisplayed: "Đang chờ kết quả",
    status: 2,
    doctorVisitingFormId: 16,
    patientDetailedInformation: "Vũ Tùng-Nam-0 tuổi",
    result: "khớp gối bình thường.",
    imageFiles: [
      {
        id: 3,
        publicId: "hapham/2021-10-13/pkn2tzahcnolmspjlwy7",
        filePath: null,
        base64Image: null,
        url: "http://res.cloudinary.com/dzftzmcxb/image/upload/v1634117967/hapham/2021-10-13/pkn2tzahcnolmspjlwy7.png",
        secureUrl:
          "https://res.cloudinary.com/dzftzmcxb/image/upload/v1634117967/hapham/2021-10-13/pkn2tzahcnolmspjlwy7.png",
        createdAt: "10/13/2021",
        name: "signature (1)",
        description: null,
      },
      {
        id: 6,
        publicId: "hapham/2021-10-13/soizrdmlxcgu954tujec",
        filePath: null,
        base64Image: null,
        url: "http://res.cloudinary.com/dzftzmcxb/image/upload/v1634119329/hapham/2021-10-13/soizrdmlxcgu954tujec.png",
        secureUrl:
          "https://res.cloudinary.com/dzftzmcxb/image/upload/v1634119329/hapham/2021-10-13/soizrdmlxcgu954tujec.png",
        createdAt: "10/13/2021",
        name: "signature (1)",
        description: null,
      },
      {
        id: 7,
        publicId: "hapham/2021-10-13/cw8w30s9fdsfbs0uiueh",
        filePath: null,
        base64Image: null,
        url: "http://res.cloudinary.com/dzftzmcxb/image/upload/v1634119377/hapham/2021-10-13/cw8w30s9fdsfbs0uiueh.png",
        secureUrl:
          "https://res.cloudinary.com/dzftzmcxb/image/upload/v1634119377/hapham/2021-10-13/cw8w30s9fdsfbs0uiueh.png",
        createdAt: "10/13/2021",
        name: "signature",
        description: null,
      },
      {
        id: 8,
        publicId: "hapham/2021-10-13/p9jkb1caa8peefisnt8v",
        filePath: null,
        base64Image: null,
        url: "http://res.cloudinary.com/dzftzmcxb/image/upload/v1634119472/hapham/2021-10-13/p9jkb1caa8peefisnt8v.png",
        secureUrl:
          "https://res.cloudinary.com/dzftzmcxb/image/upload/v1634119472/hapham/2021-10-13/p9jkb1caa8peefisnt8v.png",
        createdAt: "10/13/2021",
        name: "signature",
        description: null,
      },
      {
        id: 9,
        publicId: "hapham/2021-10-13/ycxguvfeunw30evmeq5n",
        filePath: null,
        base64Image: null,
        url: "http://res.cloudinary.com/dzftzmcxb/image/upload/v1634119606/hapham/2021-10-13/ycxguvfeunw30evmeq5n.png",
        secureUrl:
          "https://res.cloudinary.com/dzftzmcxb/image/upload/v1634119606/hapham/2021-10-13/ycxguvfeunw30evmeq5n.png",
        createdAt: "10/13/2021",
        name: "signature",
        description: null,
      },
    ],
    patientInformation: {
      id: 7,
      clinicId: 1,
      fullName: "Vũ Tùng",
      emailAddress: "mr.mocmoc@gmail.com",
      phoneNumber: "+84912068946",
      gender: "Nam",
      createdAt: "10/04/2021",
      updatedAt: "10/04/2021",
      addressDetail: "399",
      addressCity: "Thành phố Hà Nội",
      addressStreet: "Hoang Mai",
      addressDistrict: "Hoang Mai ",
      dateOfBirth: "2021-10-08T13:38:13",
      dateOfBirthDetail: "10/08/2021",
      age: 0,
      medicalInsuranceCode: "3132393913",
    },
    clinicInformation: null,
    doctorName: "Doctor 1",
    index: 0,
  };
  const [labTest, setLabTest] = useState(constlabTest);
  const [labTests, setLabTests] = useState([]);
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
  const [patient, setPatient] = useState(constPatient);

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
        for (let i = 0; i < response.data.length; i++) {
          response.data[i].index = i + 1;
        }
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
    { key: "patientDetailedInformation", label: "THÔNG TIN BỆNH NHÂN" },
    { key: "doctorName", label: "Bác sĩ khám" },
    { key: "description", label: "MÔ TẢ" },
    { key: "statusDisplayed", label: "TRẠNG THÁI" },
    { key: "createdAt", label: "GIỜ CẬP NHẬT" },
    {
      key: "edit",
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
  ];

  const rowsPerPageOption = {
    label: "Số bản ghi trên trang",
    values: [5, 10, 20],
  };

  const toggleEdit = (row) => {
    console.log(row);
    console.log("ahihihi");
    setPatient(row.patientInformation);
    setId(row.id);
    setLabTest(row);
    setLabTestModal(!labTestModal);
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
          edit: (row) => {
            return (
              <td className="py-2">
                <Icon.PencilSquare
                  name="cilpencil"
                  size="22"
                  style={cursorPointerStyle}
                  onClick={() => toggleEdit(row)}
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
      <EditLabTestModal
        patient={patient}
        modal={labTestModal}
        onClose={setLabTestModal}
        labTest={labTest}
        labTests={labTests}
        setLabTests={setLabTests}
        setOpenSuccessModal={setOpenSuccessModal}
        setOpenErrorModal={setOpenErrorModal}
        setNotificationMessage={setNotificationMessage}
        isEditForTestNeededToBePerformed={false}
      />
    </>
  );
};

export default LabTestsWaitingForResult;
