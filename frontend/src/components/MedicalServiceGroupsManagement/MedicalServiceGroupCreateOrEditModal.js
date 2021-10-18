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

const MedicalServiceGroupCreateOrEditModal = ({
  modal,
  onClose,
  groups,
  setGroups,
  medicalServiceGroup,
  isEditing,
  setOpenSuccessModal,
  setOpenErrorModal,
  setNotificationMessage,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (isEditing === true) {
      setName(medicalServiceGroup.name);
      setDescription(medicalServiceGroup.description);
    } else {
      setName("");
      setDescription("");
    }
  }, [medicalServiceGroup, isEditing]);

  const onChangeName = (name) => {
    setName(name);
  };

  const onChangeDescription = (description) => {
    setDescription(description);
  };

  const handleCreate = () => {
    if (isEditing === false) {
      medicalService.createMedicalServiceGroup(name, description).then(
        (response) => {
          let group = response.data;
          groups = [group].concat(groups);
          setGroups(groups);
          setOpenSuccessModal(true);
          setNotificationMessage("Tạo mới nhóm xét nghiệm thành công");
          onClose(false);
        },
        (error) => {
          if (error.response.data.errors !== undefined) {
            let arr = [];
            var error1 = error.response.data.errors.AddressStreet;
            if (error1 !== undefined) {
              arr.push(error1);
            }
            var error2 = error.response.data.errors.MedicalInsuranceCode;
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
        .editMedicalServiceGroup(medicalServiceGroup.id, name, description)
        .then(
          (response) => {
            let updatedPatient = response.data;
            var updateIndex = groups
              .map((item) => item.id)
              .indexOf(medicalServiceGroup.id);
            groups[updateIndex] = updatedPatient;
            setGroups(groups);
            setOpenSuccessModal(true);
            setNotificationMessage("Cập nhật nhóm chỉ định thành công");
            onClose(false);
          },
          (error) => {
            if (error.response.data.errors !== undefined) {
              let arr = [];
              var error1 = error.response.data.errors.AddressStreet;
              if (error1 !== undefined) {
                arr.push(error1);
              }
              var error2 = error.response.data.errors.MedicalInsuranceCode;
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
        <CModalTitle>Nhóm xét nghiệm</CModalTitle>
      </CModalHeader>
      <form onSubmit={handleSubmit(handleCreate)} novalidate>
        <CModalBody>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="fullName"
                name="fullName"
                label="Tên nhóm xét nghiệm"
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

export default MedicalServiceGroupCreateOrEditModal;
