import React from "react";
import {
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
} from "@coreui/react";
import PatientService from "../../services/patient/patient.service";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import VisitingDoctorFirstStep from "./VisitingDoctorFirstStep";
import VisitingDoctorSecondStep from "./VisitingDoctorSecondStep";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import medicalService from "src/services/medicalservice/medical.service";
import patientdoctorvisitingformService from "src/services/patientdoctorvisitingform/patientdoctorvisitingform.service";

const CreateVisitingDoctorFormAndPaymentModal = ({
  open,
  patient,
  onClose,
  setOpenSuccessModal,
  setOpenErrorModal,
  setNotificationMessage,
}) => {
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
  // const [formState, setFormState] = React.useState({});

  const [steps, setSteps] = React.useState([
    "Shipping address",
    "Review your order",
  ]);

  const handleCreate = () => {
    patientdoctorvisitingformService
      .create(
        visitingFormCode,
        description,
        doctorId,
        paymentDescription,
        patient.id,
        paymentCode
      )
      .then(
        (response) => {
          setOpenSuccessModal(true);
          setNotificationMessage("Tạo mới phiếu khám thành công");
          onClose(false);
          window.location.reload();

          window.open(
            "/doctorvisitingform/" + response.data.doctorVisitingFormId
          );
          window.open("/receipt/" + response.data.receiptId);
        },
        (error) => {
          console.log("=========");
          console.log(error.response.data.errors);
          if (error.response.data.errors !== undefined) {
            console.log(error.response.data.errors);
            let arr = [];
            var descriptionError = error.response.data.errors.Description;
            if (descriptionError !== undefined) {
              arr.push(descriptionError);
            }
            var doctorError = error.response.data.errors.DoctorId;
            if (doctorError !== undefined) {
              arr.push(doctorError);
            }

            var paymentDescriptionError =
              error.response.data.errors.PaymentDescription;

            if (paymentDescriptionError !== undefined) {
              arr.push(paymentDescriptionError);
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

  const retrieveMedicalServices = () => {
    medicalService
      .getDoctorVisitingFormMedicalService()
      .then((response) => {
        var arr = [];
        arr.push(response.data);
        setMedicalServices(arr);
        setTotal(response.data.total);
      })
      .catch((e) => {
        setMedicalServices([]);
        console.log(e);
      });
  };

  const closeModal = () => {
    onClose(!open);
  };

  const handleClose = () => {
    setVisitingFormCode("");
    setPaymentCode("");
    setDescription("");
    setPaymentDescription("");
    setStep(0);
    onClose();
  };

  React.useEffect(() => {
    var currentMillis = new Date().getUTCMilliseconds();
    setVisitingFormCode(
      "PK" + patient.id.toString() + currentMillis.toString()
    );
    setPaymentCode("PT" + patient.id.toString() + currentMillis.toString());
    retrieveMedicalServices();
  }, [patient.id, open]);

  const theme = createTheme();

  const [step, setStep] = React.useState(0);
  const myForm = React.useRef(null);

  const handleNext = () => {
    // console.log(myForm.current.checkValidity());
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <VisitingDoctorFirstStep
            patient={patient}
            description={description}
            setDescription={setDescription}
            doctorId={doctorId}
            doctorName={doctorName}
            setDoctorName={setDoctorName}
            setDoctorId={setDoctorId}
            visitingFormCode={visitingFormCode}
          />
        );
      case 1:
        return (
          <VisitingDoctorSecondStep
            patient={patient}
            paymentDescription={paymentDescription}
            setPaymentDescription={setPaymentDescription}
            medicalServices={medicalServices}
            total={total}
            paymentCode={paymentCode}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: "90%",
    overflowX: "auto",
    bgcolor: "background.paper",
    p: 4,
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar position="absolute" color="default" elevation={0}></AppBar>
          <Container component="main" maxWidth="s" sx={{ mb: 4 }}>
            <Paper
              variant="outlined"
              sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
            >
              <React.Fragment>
                <React.Fragment>
                  <form
                    ref={myForm}
                    onSubmit={handleSubmit(handleCreate)}
                    novalidate
                  >
                    {getStepContent(step)}
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      {step !== 0 && (
                        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                          Quay lại
                        </Button>
                      )}
                      {step === steps.length - 1 ? (
                        <Button
                          variant="contained"
                          // type="submit"
                          onClick={handleCreate}
                          sx={{ mt: 3, ml: 1 }}
                        >
                          LƯU VÀ IN
                        </Button>
                      ) : description === "" || doctorName === "" ? (
                        <Button
                          variant="contained"
                          disabled="true"
                          onClick={handleNext}
                          sx={{ mt: 3, ml: 1 }}
                        >
                          TIẾP THEO
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          // disabled="false"
                          onClick={handleNext}
                          sx={{ mt: 3, ml: 1 }}
                        >
                          TIẾP THEO
                        </Button>
                      )}
                      <Button
                        variant="contained"
                        onClick={handleClose}
                        sx={{ mt: 3, ml: 1 }}
                      >
                        HỦY
                      </Button>
                    </Box>
                  </form>
                </React.Fragment>
              </React.Fragment>
            </Paper>
          </Container>
        </ThemeProvider>
      </Box>
    </Modal>
  );
};

export default CreateVisitingDoctorFormAndPaymentModal;
