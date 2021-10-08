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

const CreateVisitingDoctorFormAndPaymentModal = ({
  open,
  patient,
  onClose,
}) => {
  const handleCreate = (patientId) => {
    console.log("let's smile please, everybody think you are approachable");
  };

  let formRef = React.createRef();

  const [doctorId, setDoctorId] = React.useState(0);
  const [doctorName, setDoctorName] = React.useState("");
  const [description, setDescription] = React.useState("zzz");
  const [paymentDescription, setPaymentDescription] = React.useState("");
  const [formState, setFormState] = React.useState({});

  const [steps, setSteps] = React.useState([
    "Shipping address",
    "Review your order",
  ]);

  const theme = createTheme();

  const [step, setStep] = React.useState(0);
  const myForm = React.useRef(null);

  const handleNext = () => {
    console.log("==============");
    console.log(myForm.current);
    console.log("==============");
    console.log(myForm.current.checkValidity());
    if (myForm.current.checkValidity() === false) {
      console.log(myForm.current);

      return;
    }
    setStep(step + 1);
  };

  //   const handleNext = () => {
  //     if (!myForm.current.checkValidity()) {
  //        return;
  //     }
  //     let newSkipped = skipped;
  //     if (isStepSkipped(activeStep)) {
  //         newSkipped = new Set(newSkipped.values());
  //         newSkipped.delete(activeStep);
  //     }

  //     setActiveStep(prevActiveStep => prevActiveStep + 1);
  //     setSkipped(newSkipped);
  // };

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
          />
        );
      case 1:
        return <VisitingDoctorSecondStep patient={patient} />;
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
    <Modal open={open} onClose={onClose}>
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
                  <form action="/" method="POST" ref={myForm}>
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
                          onClick={handleNext}
                          sx={{ mt: 3, ml: 1 }}
                        >
                          LƯU VÀ IN
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          onClick={handleNext}
                          sx={{ mt: 3, ml: 1 }}
                        >
                          TIẾP THEO
                        </Button>
                      )}
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
            </Paper>
          </Container>
        </ThemeProvider>
      </Box>
    </Modal>
  );
};

export default CreateVisitingDoctorFormAndPaymentModal;
