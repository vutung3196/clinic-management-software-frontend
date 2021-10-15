import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import hospitalizedprofileService from "src/services/hospitalizedprofile/hospitalizedprofile.service";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const CreateOrEditHospitalizedProfileModal = ({
  open,
  patient,
  onClose,
  setOpenSuccessModal,
  setOpenErrorModal,
  setNotificationMessage,
  hospitalizedProfile,
  hospitalizedProfiles,
  setHospitalizedProfiles,
  isEditing,
  detailedPatientHospitalizedProfileModal,
  setDetailedPatientHospitalizedProfileModal,
  setHospitalizedProfileId,
}) => {
  console.log("====");
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "all",
  });

  const [description, setDescription] = React.useState("");
  const [diseaseName, setDiseaseName] = React.useState("");
  const [code, setCode] = React.useState("");

  const [patientHospitalizedProfileId, setPatientHospitalizedProfileId] =
    React.useState(0);
  const handleCreateOrEdit = () => {
    if (isEditing === false) {
      hospitalizedprofileService
        .create(patient.id, diseaseName, description, null, code)
        .then(
          (response) => {
            console.log(response.data.id);
            setPatientHospitalizedProfileId(response.data.id);
            setHospitalizedProfileId(response.data.id);
            setDetailedPatientHospitalizedProfileModal(
              !detailedPatientHospitalizedProfileModal
            );
            setOpenSuccessModal(true);
            setNotificationMessage("Tạo mới hồ sơ y tế thành công");
            setCode("");
            setDiseaseName("");
            setDescription("");
            onClose(false);
          },
          (error) => {
            console.log(error);
            //

            if (error.response.data.errors !== undefined) {
              console.log(error.response.data.errors);
              let arr = [];
              var descriptionError = error.response.data.errors.Description;
              if (descriptionError !== undefined) {
                arr.push(descriptionError);
              }
              var doctorError = error.response.data.errors.doctorId;
              if (doctorError !== undefined) {
                arr.push(doctorError);
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
    }
  };

  React.useEffect(() => {
    var currentMillis = new Date().getUTCMilliseconds();
    if (patient !== null) {
      setCode("YT" + patient.id.toString() + currentMillis.toString());
    }
  }, [open]);

  const theme = createTheme();

  const myForm = React.useRef(null);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    // height: "90%",
    overflowX: "auto",
    bgcolor: "background.paper",
    p: 4,
  };

  const handleClose = () => {
    setCode("");
    setDiseaseName("");
    setDescription("");
    onClose();
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <ThemeProvider theme={theme}>
          {/* <CssBaseline /> */}
          {/* <AppBar position="absolute" color="default" elevation={0}></AppBar> */}
          <Container component="main" maxWidth="s" sx={{ mb: 4 }}>
            {/* <Paper
              variant="outlined"
              sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
            > */}
            <React.Fragment>
              <React.Fragment sx={style}>
                <form
                  ref={myForm}
                  onSubmit={handleSubmit(handleCreateOrEdit)}
                  novalidate
                >
                  <Typography component="h2" variant="h5" align="center">
                    Hồ sơ y tế
                  </Typography>
                  <Typography component="h6" align="center">
                    Mã hồ sơ: {code}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="firstName"
                        name="firstName"
                        label="Họ và tên"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        value={patient.fullName}
                        readonly
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="lastName"
                        name="lastName"
                        label="NGÀY THÁNG NĂM SINH"
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                        value={patient.dateOfBirthDetail}
                        readonly
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="address1"
                        name="address1"
                        label="Giới tính"
                        fullWidth
                        variant="standard"
                        value={patient.gender}
                        readonly
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="address2"
                        name="address2"
                        label="Điện thoại"
                        fullWidth
                        variant="standard"
                        value={patient.phoneNumber}
                        readonly
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="city"
                        name="city"
                        label="Số nhà"
                        fullWidth
                        variant="standard"
                        value={patient.addressDetail}
                        readonly
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="state"
                        name="state"
                        label="Đường, phố"
                        fullWidth
                        variant="standard"
                        value={patient.addressStreet}
                        readonly
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="zip"
                        name="zip"
                        label="Quận, huyện"
                        fullWidth
                        variant="standard"
                        value={patient.addressDistrict}
                        readonly
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="country"
                        name="country"
                        label="Thành phố"
                        fullWidth
                        variant="standard"
                        value={patient.addressCity}
                        readonly
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="country"
                        label="Mã số thẻ BHYT (nếu có)"
                        fullWidth
                        autoComplete="shipping country"
                        variant="standard"
                        value={patient.medicalInsuranceCode}
                        readonly
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="country"
                        name="country"
                        fullWidth
                        variant="standard"
                        label="Tên bệnh"
                        value={diseaseName}
                        placeholder="Tên bệnh"
                        onChange={(e) => setDiseaseName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="country"
                        name="country"
                        fullWidth
                        variant="standard"
                        label="Mô tả"
                        value={description}
                        placeholder="Mô tả"
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      variant="contained"
                      // type="submit"
                      onClick={handleCreateOrEdit}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      LƯU
                    </Button>
                    <Button
                      variant="contained"
                      onClick={onClose}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      HỦY
                    </Button>
                  </Box>
                </form>
              </React.Fragment>
            </React.Fragment>
            {/* </Paper> */}
          </Container>
        </ThemeProvider>
        {/* <DetailedPatientHospitalizedProfileModal
          modal={detailedPatientHospitalizedProfileModal}
          onClose={setDetailedPatientHospitalizedProfileModal}
          patient={patient}
          // clinic={clinic}
          // patientHospitalizedProfileId={patientHospitalizedProfileId}
        /> */}
      </Box>
    </Modal>
  );
};

export default CreateOrEditHospitalizedProfileModal;
