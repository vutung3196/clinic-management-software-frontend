import React from "react";
import PatientService from "../../services/patient/patient.service";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { DataGrid } from "@mui/x-data-grid";
// import { DataGrid } from "@material-ui/data-grid";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import patientdoctorvisitingformService from "src/services/patientdoctorvisitingform/patientdoctorvisitingform.service";
import labtestService from "src/services/labtest/labtest.service";

const DiagnosedDescriptionModal = ({
  open,
  onClose,
  setDiagnosedDescription,
}) => {
  const theme = createTheme();

  const [doctorAvalabilities, setDoctorAvailabilities] = React.useState([]);
  const [diseaseGroup, setDiseaseGroup] = React.useState("");
  const [diseaseGroups, setDiseaseGroups] = React.useState([]);
  const [disease, setDisease] = React.useState("");
  const [diseases, setDiseases] = React.useState("");
  const [diseaseNames, setDiseaseNames] = React.useState("");

  const retrieveDoctorAvailablities = () => {
    labtestService
      .getDiseases()
      .then((response) => {
        console.log(response.data);
        setDiseases(response.data);
        setDiseaseGroup(response.data[0].diseaseGroupName);
        setDiseaseNames(response.data[0].diseaseNames);
        setDisease(response.data[0].diseaseNames[0]);
      })
      .catch((e) => {
        setDiseases([]);
        console.log(e);
      });
  };

  React.useEffect(retrieveDoctorAvailablities, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    p: 4,
    height: 300,
    overflowX: "auto",
  };

  const selectDisease = () => {
    setDiagnosedDescription(disease);
    onClose(true);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Danh sách bệnh
        </Typography>
        <Paper sx={{ width: "100%" }}>
          <Grid item xs={12} sm={7}>
            <Autocomplete
              options={diseases}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Nhóm bệnh"
                  margin="normal"
                  fullWidth
                />
              )}
              value={diseaseGroup}
              onChange={(event, newValue) => {
                if (newValue != null) {
                  setDiseaseGroup(newValue.diseaseGroupName);
                  if (newValue.diseaseNames !== undefined) {
                    // setDiseases(newValue.diseaseNames);
                    setDiseaseNames(newValue.diseaseNames);
                    setDisease(newValue.diseaseNames[0]);
                  }
                }
              }}
              getOptionLabel={(option) => {
                if (typeof option === "string") {
                  return option;
                }
                if (option.diseaseGroupName) {
                  return option.diseaseGroupName;
                }
                return option.diseaseGroupName;
              }}
            />
          </Grid>
          <Grid item xs={12} sm={10}>
            <Autocomplete
              options={diseaseNames}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Tên bệnh"
                  margin="normal"
                  fullWidth
                />
              )}
              value={disease}
              onChange={(event, newValue) => {
                setDisease(newValue);
              }}
              getOptionLabel={(option) => option}
            />
          </Grid>
        </Paper>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            onClick={() => selectDisease()}
            sx={{ mt: 3, mr: 1 }}
          >
            LƯU
          </Button>
          <Button variant="contained" onClick={onClose} sx={{ mt: 3, mr: 1 }}>
            THOÁT
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DiagnosedDescriptionModal;
