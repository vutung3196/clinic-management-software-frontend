import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const VisitingDoctorReadOnlyStep = ({
  patient,
  description,
  doctorName,
  visitingFormCode,
}) => {
  console.log("ahahahhaa");
  console.log(patient);
  return (
    <React.Fragment>
      <Typography component="h1" variant="h4" align="center">
        Phiếu khám
      </Typography>
      <Typography component="h6" align="center">
        Mã phiếu: {visitingFormCode}
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
            required
            fullWidth
            variant="standard"
            label="Lý do khám"
            value={description}
            placeholder="Lý do khám"
            // onChange={(e) => setDescription(e.target.value)}
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
            value={doctorName}
            // onClick={() => handleOpenDoctorVisitingFormModal()}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default VisitingDoctorReadOnlyStep;
