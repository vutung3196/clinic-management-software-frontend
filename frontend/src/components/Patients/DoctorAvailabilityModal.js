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

const DoctorAvailabilityModal = ({ open, id, onClose }) => {
  const theme = createTheme();

  function createData(name, status) {
    return { name, status };
  }

  const doctors = [
    createData("Doctor 1", "Đang tiếp nhận 1 bệnh nhân"),
    createData("Doctor 1", "Đang tiếp nhận 1 bệnh nhân"),
    createData("Doctor 1", "Đang tiếp nhận 1 bệnh nhân"),
    createData("Doctor 1", "Đang tiếp nhận 1 bệnh nhân"),
    createData("Doctor 1", "Đang tiếp nhận 1 bệnh nhân"),
    createData("Doctor 1", "Đang tiếp nhận 1 bệnh nhân"),
    createData("Doctor 1", "Đang tiếp nhận 1 bệnh nhân"),
  ];

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    bgcolor: "background.paper",
    p: 4,
    height: 600,
    overflowX: "auto",
  };

  const selectDoctor = (row) => {
    console.log(row);
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
          Danh sách bác sĩ
        </Typography>
        <Paper sx={{ width: "100%", overflowX: "auto" }}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Họ và tên</TableCell>
                  <TableCell align="right">Trạng thái</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {doctors.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    hover
                    onClick={() => selectDoctor(row)}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" onClick={onClose} sx={{ mt: 3, mr: 1 }}>
            THOÁT
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DoctorAvailabilityModal;
