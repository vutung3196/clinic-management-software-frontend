import React from "react";
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
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { vi } from "date-fns/locale";
import PhoneInput from "react-phone-number-input";
import clinicService from "src/services/clinicservice/clinic.service";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const RegisterPage = () => {
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

  const handleCreate = () => {
    if (password !== verifiedPassword) {
      setOpenErrorModal(true);
      setNotificationMessage("Mật khẩu và xác nhận mật khẩu phải khớp nhau");
      return;
    }
    clinicService
      .createClinic(
        clinicName,
        emailAddress,
        username,
        phoneNumber,
        password,
        false
      )
      .then(
        (response) => {
          setOpenSuccessModal(true);
          setNotificationMessage(
            "Tạo mới tài khoản thành công, bạn sẽ nhận được email khi tài khoản được phê duyệt"
          );
        },
        (error) => {
          if (error.response.data.errors !== undefined) {
            let arr = [];
            var error1 = error.response.data.errors.UserName;
            if (error1 !== undefined) {
              arr.push(error1);
            }
            var error2 = error.response.data.errors.Password;
            if (error2 !== undefined) {
              arr.push(error2);
            }

            var errorMessage = "";
            for (let index = 0; index < arr.length; index++) {
              errorMessage += arr[index];
              if (index !== arr.length - 1) {
                errorMessage += " và ";
              }
            }
            setOpenErrorModal(true);
            setNotificationMessage(errorMessage);
          }
        }
      );
  };

  const { register, handleSubmit, errors, formState } = useForm({
    mode: "all",
  });

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
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
                      <PhoneInput
                        defaultCountry="VN"
                        id="filled-full-width"
                        placeholder="Số điện thoại di động (ví dụ 912068946)"
                        value={phoneNumber}
                        onChange={setPhoneNumber}
                      />
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

export default RegisterPage;
