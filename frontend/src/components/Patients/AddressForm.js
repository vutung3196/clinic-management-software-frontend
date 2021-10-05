import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import DoctorAvailabilityModal from "./DoctorAvailabilityModal";

const AddressForm = (props) => {
  const [doctorVisitingFormModal, setDoctorVisitingFormModal] =
    React.useState(false);

  const handleOpenDoctorVisitingFormModal = () => {
    setDoctorVisitingFormModal(true);
    console.log("================");
  };
  const handleCloseDoctorVisitingFormModal = () =>
    setDoctorVisitingFormModal(false);

  //   const toggleDelete = () => {
  //     setDeleteModal(!deleteModal);
  //   };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Mã phiếu: PK123456
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="firstName"
            name="firstName"
            label="Họ và tên"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={props.patient.fullName}
            readonly
            // InputLabelProps={{
            //   shrink: true,
            // }}
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
            value={props.patient.dateOfBirthDetail}
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
            value={props.patient.gender}
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
            value={props.patient.phoneNumber}
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
            value={props.patient.addressDetail}
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
            value={props.patient.addressStreet}
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
            value={props.patient.addressDistrict}
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
            value={props.patient.addressCity}
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
            value={props.patient.medicalInsuranceCode}
            readonly
          />
        </Grid>
        <Grid item xs={12}>
          <TextareaAutosize
            aria-label="empty textarea"
            minRows={3}
            required
            label="Lý do khám"
            placeholder="Lý do khám"
            style={{ width: 300 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="country"
            name="country"
            required
            label="Bác sĩ khám: "
            fullWidth
            variant="standard"
            value="John Doe 1"
            onClick={() => handleOpenDoctorVisitingFormModal()}
          />
        </Grid>
        {/* <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes" />
            }
            label="Use this address for payment details"
          />
        </Grid> */}
      </Grid>
      <DoctorAvailabilityModal
        open={doctorVisitingFormModal}
        onClose={handleCloseDoctorVisitingFormModal}
      />
    </React.Fragment>
  );
};

export default AddressForm;
