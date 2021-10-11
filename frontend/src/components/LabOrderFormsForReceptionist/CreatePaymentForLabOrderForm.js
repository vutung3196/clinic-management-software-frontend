import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const CreatePaymentForLabOrderForm = ({
  open,
  handleClose,
  patient,
  labTests,
}) => {
  console.log(patient);
  const theme = createTheme();

  const [paymentDescription, setPaymentDescription] = React.useState("");
  const [total, setTotal] = React.useState(0);
  const [paymentCode, setPaymentCode] = React.useState("");

  React.useEffect(() => {
    var currentMillis = new Date().getUTCMilliseconds();
    setPaymentCode("PT" + patient.id + currentMillis.toString());
    var total = 0;
    for (var i = 0; i < labTests.length; i++) {
      total = total + labTests[i].price;
    }
    setTotal(total);
  }, [patient, labTests]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: "70%",
    overflowX: "auto",
    bgcolor: "background.paper",
    p: 4,
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <ThemeProvider theme={theme}></ThemeProvider>
        <Typography component="h1" variant="h4" align="center">
          Phiếu thu
        </Typography>
        <Typography component="h6" align="center">
          Mã phiếu: {paymentCode}
        </Typography>
        {/* <Box > */}
        <Grid container spacing={3}>
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
              label="Địa chỉ"
              fullWidth
              variant="standard"
              value={
                patient.addressDetail +
                ", " +
                patient.addressStreet +
                ", " +
                patient.addressDistrict +
                ", " +
                patient.addressCity
              }
              readonly
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography gutterBottom sx={{ mt: 2 }}>
              Dịch vụ
            </Typography>
            <div className="aaa">
              <TableContainer>
                <Table
                  size="small"
                  sx={{ minWidth: 650 }}
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>STT</TableCell>
                      <TableCell>Dịch vụ</TableCell>
                      <TableCell>Số lượng</TableCell>
                      <TableCell>Đơn giá</TableCell>
                      <TableCell>Tổng cộng</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {labTests.map((row, index) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        hover
                      >
                        <TableCell component="th" scope="row">
                          {index + 1}
                        </TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>{row.price}</TableCell>
                        <TableCell>{row.price}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell rowSpan={3} />
                      <TableCell rowSpan={3} />
                      <TableCell rowSpan={3} />
                      <TableCell align="">Tổng tiền: </TableCell>
                      <TableCell>{total}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="firstName"
              name="firstName"
              label="Ghi chú"
              fullWidth
              variant="standard"
              value={paymentDescription}
              onChange={(e) => setPaymentDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom>
              Ngày thu tiền: {new Date().toLocaleDateString("vn-VI")}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default CreatePaymentForLabOrderForm;
