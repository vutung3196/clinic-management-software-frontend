import React, { useState, useEffect } from "react";
import PatientService from "../../services/patient/patient.service";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CDropdownItem as option,
  CCollapse,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import * as Icon from "react-bootstrap-icons";
import PatientCreateModal from "./PatientCreateModal";
import PatientDeleteModal from "./PatientDeleteModal";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [details, setDetails] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [id, setId] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [detailedModal, setDetailedModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [visible, setVisible] = useState(false);
  const [prescriptionModal, setPresciptionModal] = useState(false);
  const [prescriptionsHistory, setPrescriptionHistory] = useState([]);
  const [patientProfile, setPatientProfile] = useState("");
  const [profileModal, setProfileModal] = useState(false);
  const [diseaseStages, setDiseaseStages] = useState([]);
  const constPatient = {
    id: 1,
    fullName: "",
    emailAddress: "tungvu3196@gmail.com",
    phoneNumber: "31231231",
    occupation: null,
    gender: "Nữ",
    createdAt: "09/24/2021",
    updatedAt: null,
    addressDetail: "59/102",
    addressCity: "Hanoi",
    addressStreet: "Truong Chinh",
    addressDistrict: "Dong Da",
    dateOfBirth: "2021-10-04T09:00:53",
    dateOfBirthDetail: "10/04/2021",
    medicalInsuranceCode: "0312312313",
  };

  const cursorPointerStyle = {
    cursor: "pointer",
  };
  const [patient, setPatient] = useState(constPatient);

  const toggleEdit = (patient) => {
    console.log(patient);
    setPatient(patient);
    setIsEditing(true);
    setCreateModal(!createModal);
  };

  const toggleDelete = (patientId) => {
    setDeleteModal(!deleteModal);
    setId(patientId);
  };

  const toggleCreate = () => {
    setPatient(constPatient);
    setIsEditing(false);
    setCreateModal(!createModal);
  };

  const toggleProfile = () => {};

  const getRequestParams = (searchPatientName, page, pageSize) => {
    let params = {};

    if (searchPatientName) {
      params["name"] = searchPatientName;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  };

  const retrievePatients = () => {
    PatientService.getPatients()
      .then((response) => {
        setPatients(response.data);
      })
      .catch((e) => {
        setPatients([]);
        console.log(e);
      });
  };

  useEffect(retrievePatients, []);

  const fields = [
    { key: "id", label: "MÃ BỆNH NHÂN", _style: { width: "8%" } },
    { key: "fullName", label: "HỌ TÊN" },
    { key: "gender", label: "GIỚI TÍNH" },
    { key: "dateOfBirthDetail", label: "NGÀY THÁNG NĂM SINH" },
    { key: "phoneNumber", label: "SỐ ĐIỆN THOẠI" },
    { key: "addressCity", label: "ĐỊA CHỈ (TỈNH)" },
    { key: "createdAt", label: "NGÀY TẠO" },
    {
      key: "profile",
      label: "TẠO PHIẾU KHÁM",
      _style: { width: "4%" },
      sorter: false,
      filter: false,
    },
    {
      key: "edit",
      label: "SỬA",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
    {
      key: "delete",
      label: "XÓA",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
  ];

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Danh sách bệnh nhân</CCardHeader>
            <div col="2" class="mb-3 mb-xl-0 col-sm-4 col-md-2 ">
              <CButton
                class="btn btn-primary btn-block"
                type="button"
                onClick={() => toggleCreate()}
              >
                Thêm mới
              </CButton>
            </div>
            <CCardBody>
              <CDataTable
                items={patients}
                fields={fields}
                columnFilter
                hover
                striped
                bordered
                size="sm"
                itemsPerPageSelect
                itemsPerPage={10}
                sorter
                pagination
                scopedSlots={{
                  profile: (item) => {
                    return (
                      <td className="py-2">
                        <Icon.PersonBadge
                          name="cilpencil"
                          size="22"
                          style={cursorPointerStyle}
                          onClick={() => {
                            toggleProfile(item);
                          }}
                        />
                      </td>
                    );
                  },
                  clinic_specific_examination: (item) => {
                    return (
                      <td className="py-2">
                        <CButton
                          color="primary"
                          variant="outline"
                          shape="square"
                          size="sm"
                        >
                          PCĐ
                        </CButton>
                      </td>
                    );
                  },
                  edit: (item) => {
                    return (
                      <td className="py-2">
                        <Icon.PencilSquare
                          name="cilpencil"
                          size="22"
                          style={cursorPointerStyle}
                          onClick={() => toggleEdit(item)}
                        />
                      </td>
                    );
                  },
                  delete: (item) => {
                    return (
                      <td className="py-2">
                        <CIcon
                          name="cilTrash"
                          size="xl"
                          style={cursorPointerStyle}
                          onClick={() => {
                            toggleDelete(item.id);
                          }}
                        />
                      </td>
                    );
                  },
                  details: (item, index) => {
                    return (
                      <CCollapse show={details.includes(index)}>
                        <CCardBody>
                          <h4>{item.username}</h4>
                          <p className="text-muted">
                            User since: {item.registered}
                          </p>
                          <CButton size="sm" color="info">
                            User Settings
                          </CButton>
                          <CButton size="sm" color="danger" className="ml-1">
                            Delete
                          </CButton>
                        </CCardBody>
                      </CCollapse>
                    );
                  },
                }}
              ></CDataTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <PatientDeleteModal
        modal={deleteModal}
        id={id}
        onClose={setDeleteModal}
        patients={patients}
      />
      <PatientCreateModal
        modal={createModal}
        onClose={setCreateModal}
        patients={patients}
        setPatients={setPatients}
        patient={patient}
        isEditing={isEditing}
      />
    </>
  );
};

export default Patients;
