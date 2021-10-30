import React, { useState, useEffect } from "react";
import * as Icon from "react-bootstrap-icons";
import { Alert } from "reactstrap";
import authService from "../../services/authentication/auth.service";
import Button from "@mui/material/Button";
import TextField from "@mui/material/Button";
import clinicService from "src/services/clinicservice/clinic.service";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import { useForm } from "react-hook-form";
import CIcon from "@coreui/icons-react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { vi } from "date-fns/locale";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";

// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

const InformationManagement = () => {
  const [clinicName, setClinicName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [username, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [verifiedPassword, setVerifiedPassword] = React.useState("");
  const [openSuccessModal, setOpenSuccessModal] = React.useState(false);
  const [openErrorModal, setOpenErrorModal] = React.useState(false);
  const [notificationMessage, setNotificationMessage] = React.useState("");

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

  const handleCreate = () => {};

  const { register, handleSubmit, errors, formState } = useForm({
    mode: "all",
  });

  const retrieveClinicInformation = () => {
    var currentUser = authService.getCurrentUser();
    console.log("=====");
    console.log(currentUser);
    // clinicService
    //   .getClinicInformation(currentUser.clinicId)
    //   .then((response) => {
    //     var clinic = response.data;
    //     setId(clinic.id);
    //     setName(clinic.name);
    //     setEmailAddress(clinic.emailAddress);
    //     setPhoneNumber(clinic.phoneNumber);
    //     setAddress(clinic.address);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  };

  // const handleEdit = () => {
  //   clinicService.editClinic(id, name, phoneNumber, address, "", "", true).then(
  //     (response) => {
  //       console.log(response);
  //       setVisible(true);
  //     },
  //     (error) => {
  //       console.log(error);
  //       console.log(error.response.data.errors.Name);
  //       if (error.response.data.errors !== undefined) {
  //         console.log(error.response.data.errors.Name);
  //         console.log(error.response.data.errors.Name);
  //         console.log(error.response.data.errors.Name);
  //         console.log("rockkk");
  //         var a = error.response.data.errors.Name;
  //         var b = error.response.data.errors.EmailAddress;
  //         let arr = [];
  //         if (a !== undefined) {
  //           arr.push(a);
  //         }
  //         if (b !== undefined) {
  //           arr.push(b);
  //         }
  //         setErrorMessages(arr);
  //         // setVisibleError(true);
  //       }
  //     }
  //   );
  // };

  useEffect(() => {
    retrieveClinicInformation();
  }, []);
  return (
    <div className="">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <form onSubmit={handleSubmit(handleCreate)} novalidate>
                <CCardBody className="p-4">
                  <h1>Đăng ký</h1>
                  <p className="text-muted">Tạo tài khoản</p>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="fullName"
                        name="fullName"
                        label="Tên phòng khám"
                        fullWidth
                        variant="standard"
                        value={clinicName}
                        onChange={(e) => setClinicName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      {/* <PhoneInput
                        defaultCountry="VN"
                        id="filled-full-width"
                        placeholder="Số điện thoại di động (ví dụ 912068946)"
                        value={phoneNumber}
                        onChange={setPhoneNumber}
                      /> */}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="filled-full-width"
                        label="Email (ví dụ: abcde@gmail.com)"
                        type="email"
                        required
                        fullWidth
                        margin="normal"
                        variant="standard"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <TextField
                        id="insurance-code"
                        name="insurance-code"
                        label="Tài khoản Admin"
                        fullWidth
                        required
                        autoComplete="shipping country"
                        variant="standard"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        id="insurance-code"
                        type="password"
                        name="insurance-code"
                        label="Mật khẩu"
                        required
                        fullWidth
                        variant="standard"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        id="insurance-code"
                        name="insurance-code"
                        type="password"
                        required
                        label="Xác nhận mật khẩu"
                        fullWidth
                        variant="standard"
                        value={verifiedPassword}
                        onChange={(e) => setVerifiedPassword(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </CCardBody>
                <CCardFooter className="p-4">
                  <CRow>
                    <CCol xs="12" sm="6">
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        // disabled={isSubmitting}
                      >
                        Đăng ký
                      </Button>
                    </CCol>
                  </CRow>
                </CCardFooter>
              </form>
            </CCard>
          </CCol>
        </CRow>
        <Snackbar
          open={openSuccessModal}
          autoHideDuration={15000}
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
          autoHideDuration={6000}
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
      </CContainer>
    </div>
  );
};

export default InformationManagement;
