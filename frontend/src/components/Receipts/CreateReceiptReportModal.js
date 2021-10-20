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
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const CreateReceiptReportModal = ({
  open,
  onClose,
  setOpenSuccessModal,
  setOpenErrorModal,
  setNotificationMessage,
}) => {
  console.log("====");
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "all",
  });

  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [containingPatientName, setContainingPatientName] =
    React.useState(false);
  const [containingPatientEmail, setContainingPatientEmail] =
    React.useState(false);
  const [containingPatientAddress, setContainingPatientAddress] =
    React.useState(false);
  const [containingPatientPhoneNumber, setContainingPatientPhoneNumber] =
    React.useState(false);
  const handleViewReport = () => {
    console.log(startDate.toJSON());
    console.log(endDate.toJSON());
    window.open(
      "/receiptreport" +
        "?startDate=" +
        startDate.toJSON() +
        "&endDate=" +
        endDate.toJSON() +
        "&containingPatientName=" +
        containingPatientName +
        "&containingPatientEmail=" +
        containingPatientEmail +
        "&setContainingPatientPhoneNumber=" +
        containingPatientPhoneNumber +
        "&containingPatientAddress=" +
        containingPatientAddress
    );
    setOpenSuccessModal(true);
    setNotificationMessage("Xuất bảng kê thành công");
    onClose(false);
  };

  React.useEffect(() => {
    console.log();

    // var currentMillis = new Date().getUTCMilliseconds();
    // if (patient !== null) {
    //   setCode("YT" + patient.id.toString() + currentMillis.toString());
    // }
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
                  onSubmit={handleSubmit(handleViewReport)}
                  novalidate
                >
                  <Typography component="h3" variant="h5" align="center">
                    Lập bảng kê
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <LocalizationProvider
                        locale={vi}
                        dateAdapter={AdapterDateFns}
                      >
                        <Stack spacing={1} sx={{ width: 250 }}>
                          <DesktopDatePicker
                            label="Ngày bắt đầu"
                            value={startDate}
                            minDate={new Date("1900-01-01")}
                            onChange={(newValue) => {
                              setStartDate(newValue);
                            }}
                            variant="standard"
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </Stack>
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <LocalizationProvider
                        locale={vi}
                        dateAdapter={AdapterDateFns}
                      >
                        <Stack spacing={1} sx={{ width: 250 }}>
                          <DesktopDatePicker
                            label="Ngày kết thúc"
                            value={endDate}
                            minDate={new Date("1900-01-01")}
                            onChange={(newValue) => {
                              setEndDate(newValue);
                            }}
                            variant="standard"
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </Stack>
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography component="h7" align="left">
                        Thông tin chọn:
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <FormControlLabel
                        disabled
                        control={<Checkbox disabled checked />}
                        label="Mã phiếu thu"
                      />
                      <FormControlLabel
                        disabled
                        control={<Checkbox disabled checked />}
                        label="Ngày thu"
                      />
                      <FormControlLabel
                        disabled
                        control={<Checkbox disabled checked />}
                        label="Khoản thu"
                      />
                      <FormControlLabel
                        disabled
                        control={<Checkbox disabled checked />}
                        label="Số lượng"
                      />
                      <FormControlLabel
                        disabled
                        control={<Checkbox disabled checked />}
                        label="Đơn giá"
                      />
                      <FormControlLabel
                        disabled
                        control={<Checkbox disabled checked />}
                        label="Tổng cộng"
                      />
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              defaultChecked
                              checked={containingPatientName}
                              onChange={(e) => {
                                console.log(
                                  "target checked? - ",
                                  e.target.checked
                                );
                                setContainingPatientName(e.target.checked);
                              }}
                              value="checkedA"
                              inputProps={{
                                "aria-label": "primary checkbox",
                              }}
                            />
                          }
                          label="Tên người nộp"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              defaultChecked
                              checked={containingPatientEmail}
                              onChange={(e) => {
                                console.log(
                                  "target checked? - ",
                                  e.target.checked
                                );
                                setContainingPatientEmail(e.target.checked);
                              }}
                              value="checkedA"
                              inputProps={{
                                "aria-label": "primary checkbox",
                              }}
                            />
                          }
                          label="Email"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              defaultChecked
                              checked={containingPatientAddress}
                              onChange={(e) => {
                                console.log(
                                  "target checked? - ",
                                  e.target.checked
                                );
                                setContainingPatientAddress(e.target.checked);
                              }}
                              value="checkedA"
                              inputProps={{
                                "aria-label": "primary checkbox",
                              }}
                            />
                          }
                          label="Địa chỉ"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              defaultChecked
                              checked={containingPatientPhoneNumber}
                              onChange={(e) => {
                                console.log(
                                  "target checked? - ",
                                  e.target.checked
                                );
                                setContainingPatientPhoneNumber(
                                  e.target.checked
                                );
                              }}
                              value="checkedA"
                              inputProps={{
                                "aria-label": "primary checkbox",
                              }}
                            />
                          }
                          label="Số điện thoại"
                        />
                      </FormGroup>
                    </Grid>
                  </Grid>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      variant="contained"
                      // type="submit"
                      onClick={handleViewReport}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      Tạo
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

export default CreateReceiptReportModal;
