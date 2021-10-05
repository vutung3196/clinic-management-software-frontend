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
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import Modal from "@mui/material/Modal";

const CreateVisitingDoctorFormAndPaymentModal = ({
  open,
  patient,
  onClose,
}) => {
  const handleCreate = (patientId) => {
    console.log("let's smile please, everybody think you are approachable");
  };

  const steps = ["Shipping address", "Payment details", "Review your order"];

  const theme = createTheme();

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const setDeleteModal = () => {
    onClose(false);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <AddressForm patient={patient} />;
      case 1:
        return <PaymentForm />;
      case 2:
        return <Review />;
      default:
        throw new Error("Unknown step");
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    p: 4,
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar
            position="absolute"
            color="default"
            elevation={0}
            sx={{
              position: "relative",
              borderBottom: (t) => `1px solid ${t.palette.divider}`,
            }}
          >
            {/* <Toolbar>
              <Typography variant="h6" color="inherit" noWrap>
                Tạo phiếu khám
              </Typography>
            </Toolbar> */}
          </AppBar>
          <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper
              variant="outlined"
              sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
            >
              <Typography component="h1" variant="h4" align="center">
                Phiếu khám
              </Typography>
              <React.Fragment>
                {activeStep === steps.length ? (
                  <React.Fragment>
                    <Typography variant="h5" gutterBottom>
                      Thank you for your order.
                    </Typography>
                    <Typography variant="subtitle1">
                      Your order number is #2001539. We have emailed your order
                      confirmation, and will send you an update when your order
                      has shipped.
                    </Typography>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {getStepContent(activeStep)}
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      {activeStep !== 0 && (
                        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                          Quay lại
                        </Button>
                      )}
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 3, ml: 1 }}
                      >
                        {activeStep === steps.length - 1 ? "LƯU" : "TIẾP THEO"}
                      </Button>
                      <Button
                        variant="contained"
                        onClick={onClose}
                        sx={{ mt: 3, ml: 1 }}
                      >
                        HỦY
                      </Button>
                    </Box>
                  </React.Fragment>
                )}
              </React.Fragment>
            </Paper>
          </Container>
        </ThemeProvider>
      </Box>
    </Modal>
  );
};

export default CreateVisitingDoctorFormAndPaymentModal;
