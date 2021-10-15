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
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { vi } from "date-fns/locale";
import Stack from "@mui/material/Stack";

const EditHospitalizedProfileModal = ({
  open,
  patient,
  onClose,
  patientHospitalizedProfile,
  patientHospitalizedProfiles,
  setPatientHospitalizedProfiles,
  setOpenSuccessModal,
  setOpenErrorModal,
  setNotificationMessage,
}) => {
  console.log("====");
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "all",
  });

  const [description, setDescription] = React.useState("");
  const [diseaseName, setDiseaseName] = React.useState("");
  const [revisitDate, handleRevisitDateChange] = React.useState(new Date());

  const handleCreateOrEdit = () => {
    hospitalizedprofileService
      .edit(
        patientHospitalizedProfile.id,
        diseaseName,
        description,
        revisitDate
      )
      .then(
        (response) => {
          let updatedHospitalizedProfile = patientHospitalizedProfile;
          updatedHospitalizedProfile.description = description;
          updatedHospitalizedProfile.diseaseName = diseaseName;
          updatedHospitalizedProfile.revisitDate = revisitDate;

          updatedHospitalizedProfile.revisitDateDisplayed =
            revisitDate.toLocaleDateString("en-US");
          console.log(updatedHospitalizedProfile);
          var updateIndex = patientHospitalizedProfiles
            .map((item) => item.id)
            .indexOf(patientHospitalizedProfile.id);
          patientHospitalizedProfiles[updateIndex] = updatedHospitalizedProfile;
          setPatientHospitalizedProfiles(patientHospitalizedProfiles);
          setOpenSuccessModal(true);
          setNotificationMessage("Chỉnh sửa hồ sơ y tế thành công");
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
  };

  React.useEffect(() => {
    if (patientHospitalizedProfile !== null) {
      setDiseaseName(patientHospitalizedProfile.diseaseName);
      setDescription(patientHospitalizedProfile.description);
      handleRevisitDateChange(patientHospitalizedProfile.revisitDate);
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
    setDiseaseName("");
    setDescription("");
    onClose();
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="s" sx={{ mb: 4 }}>
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
                    Mã hồ sơ:{" "}
                    {patientHospitalizedProfile !== undefined
                      ? patientHospitalizedProfile.code
                      : ""}
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
                    <Grid item xs={12}>
                      <LocalizationProvider
                        locale={vi}
                        dateAdapter={AdapterDateFns}
                      >
                        <Stack spacing={1} sx={{ width: 250 }}>
                          <DesktopDatePicker
                            label="Ngày tái khám"
                            value={revisitDate}
                            minDate={new Date("1900-01-01")}
                            onChange={(newValue) => {
                              handleRevisitDateChange(newValue);
                            }}
                            variant="standard"
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </Stack>
                      </LocalizationProvider>
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
          </Container>
        </ThemeProvider>
      </Box>
    </Modal>
  );
};

export default EditHospitalizedProfileModal;
