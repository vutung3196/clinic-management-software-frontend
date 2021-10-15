import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import VisitingDoctorFirstStep from "../Patients//VisitingDoctorFirstStep";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import patientdoctorvisitingformService from "src/services/patientdoctorvisitingform/patientdoctorvisitingform.service";
import VisitingDoctorReadOnlyStep from "../Patients/VisitingDoctorReadOnlyStep";

const EditDoctorVisitingFormModal = ({
  open,
  patient,
  onClose,
  setOpenSuccessModal,
  setOpenErrorModal,
  setNotificationMessage,
  doctorVisitingForm,
  doctorVisitingForms,
  setDoctorVisitingForms,
  isEditing,
}) => {
  console.log("====");
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "all",
  });

  const [doctorId, setDoctorId] = React.useState(0);
  const [doctorName, setDoctorName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [paymentDescription, setPaymentDescription] = React.useState("");
  const [visitingFormCode, setVisitingFormCode] = React.useState("");
  const [paymentCode, setPaymentCode] = React.useState("");
  const [medicalServices, setMedicalServices] = React.useState([]);
  const [total, setTotal] = React.useState(0);

  const handleEdit = () => {
    if (isEditing === true) {
      patientdoctorvisitingformService
        .edit(
          doctorVisitingForm.id,
          doctorVisitingForm.code,
          description,
          doctorId,
          false
        )
        .then(
          (response) => {
            let updatedForm = response.data;
            updatedForm.doctorName = doctorName;
            console.log(updatedForm);
            var updateIndex = doctorVisitingForms
              .map((item) => item.id)
              .indexOf(doctorVisitingForm.id);
            var a = [...doctorVisitingForms];
            a[updateIndex] = updatedForm;
            setDoctorVisitingForms(a);
            setOpenSuccessModal(true);
            setNotificationMessage("Cập nhật bệnh nhân thành công");
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

  const handleClose = () => {
    setDescription("");
    setVisitingFormCode("");
    setDoctorId("");
    setDoctorName("");
    onClose(false);
  };

  React.useEffect(() => {
    setDescription(doctorVisitingForm.description);
    setVisitingFormCode(doctorVisitingForm.code);
    setDoctorId(doctorVisitingForm.doctorId);
    setDoctorName(doctorVisitingForm.doctorName);
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
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar position="absolute" color="default" elevation={0}></AppBar>
          <Container component="main" maxWidth="s" sx={{ mb: 4 }}>
            {/* <Paper
              variant="outlined"
              sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
            > */}
            <React.Fragment>
              <React.Fragment>
                <form
                  ref={myForm}
                  onSubmit={handleSubmit(handleEdit)}
                  novalidate
                >
                  {isEditing === true ? (
                    <VisitingDoctorFirstStep
                      patient={patient}
                      description={description}
                      setDescription={setDescription}
                      doctorId={doctorId}
                      doctorName={doctorName}
                      setDoctorName={setDoctorName}
                      setDoctorId={setDoctorId}
                      visitingFormCode={visitingFormCode}
                      isEditing={isEditing}
                    />
                  ) : (
                    <VisitingDoctorReadOnlyStep
                      patient={patient}
                      description={description}
                      doctorName={doctorName}
                      visitingFormCode={visitingFormCode}
                    />
                  )}
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    {isEditing === true ? (
                      <Button
                        variant="contained"
                        // type="submit"
                        onClick={handleEdit}
                        sx={{ mt: 3, ml: 1 }}
                      >
                        LƯU
                      </Button>
                    ) : (
                      ""
                    )}
                    <Button
                      variant="contained"
                      onClick={() => handleClose()}
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
      </Box>
    </Modal>
  );
};

export default EditDoctorVisitingFormModal;
