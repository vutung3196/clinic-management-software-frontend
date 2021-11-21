import React, { useState, useEffect } from "react";
import {
  CModal,
  CButton,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Grid";
import medicalService from "src/services/medicalservice/medical.service";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

const MedicalServiceCreateOrEditModal = ({
  modal,
  onClose,
  medicalServices,
  setMedicalServices,
  medicalServiceElement,
  isEditing,
  setOpenSuccessModal,
  setOpenErrorModal,
  setNotificationMessage,
}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [medicalServiceGroupId, setMedicalServiceGroupId] = useState("");
  const [medicalServiceGroups, setMedicalServiceGroups] = useState([]);
  const [description, setDescription] = useState("");

  const retrieveGroups = () => {
    medicalService
      .getAllMedicalServiceGroups()
      .then((response) => {
        console.log(response.data);
        setMedicalServiceGroups(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveGroups();
    if (isEditing === true) {
      setName(medicalServiceElement.name);
      setDescription(medicalServiceElement.description);
      setPrice(medicalServiceElement.price);
      setMedicalServiceGroupId(medicalServiceElement.groupId);
    } else {
      setName("");
      setDescription("");
      setPrice("");
    }
  }, [modal, medicalService, isEditing]);

  const onChangeName = (name) => {
    setName(name);
  };

  const onChangeDescription = (description) => {
    setDescription(description);
  };

  const handleCreate = () => {
    if (isEditing === false) {
      medicalService
        .createMedicalService(name, description, price, medicalServiceGroupId)
        .then(
          (response) => {
            let newMedicalService = response.data;
            medicalServices = [newMedicalService].concat(medicalServices);
            setMedicalServices(medicalServices);
            setOpenSuccessModal(true);
            setNotificationMessage("Tạo mới xét nghiệm thành công");
            onClose(false);
          },
          (error) => {
            if (error.response.data.errors !== undefined) {
              let arr = [];
              var error1 = error.response.data.errors.Name;
              if (error1 !== undefined) {
                arr.push(error1);
              }
              var error2 = error.response.data.errors.Description;
              if (error2 !== undefined) {
                arr.push(error2);
              }

              error2 = error.response.data.errors.Price;
              if (error2 !== undefined) {
                arr.push(error2);
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
    } else {
      medicalService
        .editMedicalService(
          medicalServiceElement.id,
          name,
          description,
          price,
          medicalServiceGroupId
        )
        .then(
          (response) => {
            let updatedPatient = response.data;
            var updateIndex = medicalServices
              .map((item) => item.id)
              .indexOf(medicalServiceElement.id);
            medicalServices[updateIndex] = updatedPatient;
            setMedicalServices(medicalServices);
            setOpenSuccessModal(true);
            setNotificationMessage("Cập nhật thông tin xét nghiệm thành công");
            onClose(false);
          },
          (error) => {
            if (error.response.data.errors !== undefined) {
              let arr = [];
              var error1 = error.response.data.errors.Name;
              if (error1 !== undefined) {
                arr.push(error1);
              }
              var error2 = error.response.data.errors.Description;
              if (error2 !== undefined) {
                arr.push(error2);
              }

              error2 = error.response.data.errors.Price;
              if (error2 !== undefined) {
                arr.push(error2);
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

  const closeModal = () => {
    onClose(false);
  };

  const { register, handleSubmit, errors, formState } = useForm({
    mode: "all",
  });

  return (
    <CModal show={modal} onClose={closeModal}>
      <CModalHeader closeButton>
        <CModalTitle>Xét nghiệm</CModalTitle>
      </CModalHeader>
      <form onSubmit={handleSubmit(handleCreate)} novalidate>
        <CModalBody>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                id="fullName"
                name="fullName"
                label="Tên xét nghiệm"
                fullWidth
                variant="standard"
                value={name}
                onChange={(e) => onChangeName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                id="fullName"
                name="fullName"
                label="Giá tiền (VNĐ)"
                type="number"
                fullWidth
                variant="standard"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel id="demo-simple-select-label">
                Nhóm xét nghiệm
              </InputLabel>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                sx={{ width: "100%" }}
                value={medicalServiceGroupId}
                label="Nhóm xét nghiệm"
                onChange={(e) => setMedicalServiceGroupId(e.target.value)}
              >
                {medicalServiceGroups !== undefined &&
                medicalServiceGroups.length > 0
                  ? medicalServiceGroups.map((entry) => (
                      <MenuItem value={entry.id}>{entry.name}</MenuItem>
                    ))
                  : ""}
              </Select>
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="fullName"
                name="fullName"
                label="Mô tả"
                fullWidth
                variant="standard"
                value={description}
                onChange={(e) => onChangeDescription(e.target.value)}
              />
            </Grid>
          </Grid>
        </CModalBody>

        <CModalFooter>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            // disabled={isSubmitting}
          >
            Lưu
          </Button>

          <CButton color="secondary" onClick={() => closeModal()}>
            Hủy
          </CButton>
        </CModalFooter>
      </form>
    </CModal>
  );
};

export default MedicalServiceCreateOrEditModal;
