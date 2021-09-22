import React, { useState, useEffect } from "react";
import * as Icon from "react-bootstrap-icons";
import CIcon from "@coreui/icons-react";
import authService from "../../services/authentication/auth.service";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CDropdownItem as option,
} from "@coreui/react";
import clinicService from "../../services/clinicservice/clinic.service";
import EditClinicModal from "./EditClinicModal";
import DeactivateClinicModal from "./DeactivateClinicModal";

const ClinicManagement = () => {
  const constClinic = {
    id: 1,
    name: "Hà Phạm Clinic",
    emailAddress: "tungvu3196@gmail.com",
    phoneNumber: "1231311",
    address: "Nam Dinh12",
    userName: "tungvu3196",
    password: null,
  };

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [clinics, setClinics] = useState([]);
  const [clinic, setClinic] = useState(constClinic);
  const [userId, setUserId] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // modal
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const retrieveClinics = () => {
    clinicService
      .getAllClinics()
      .then((response) => {
        console.log(response.data);
        setClinics(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(retrieveClinics, []);

  const fields = [
    {
      key: "name",
      label: "TÊN PHÒNG KHÁM",
      _style: { width: "8%" },
    },
    { key: "address", label: "Địa chỉ" },
    { key: "phoneNumber", label: "SỐ ĐIỆN THOẠI" },
    { key: "username", label: "TÀI KHOẢN ADMIN" },
    { key: "username", label: "TÀI KHOẢN ADMIN" },
    { key: "status", label: "Trạng thái" },
    { key: "createdAt", label: "NGÀY TẠO" },
    {
      key: "edit",
      label: "SỬA",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
    {
      key: "deactivate",
      label: "KHÓA",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
  ];

  const cursorPointerStyle = {
    cursor: "pointer",
  };

  const openDeactivateModal = (item) => {
    setClinic(item);
    setDeleteModal(!deleteModal);
  };

  const openEditModal = (item) => {
    console.log(item);
    setIsEditing(true);
    setClinic(item);
    setEditModal(!editModal);
  };

  const openCreate = (item) => {
    setClinic(constClinic);
    setIsEditing(false);
    setEditModal(!editModal);
  };

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>Danh sách phòng khám</CCardHeader>
          <div col="2" class="mb-3 mb-xl-0 col-sm-4 col-md-2 ">
            <CButton
              class="btn btn-primary btn-block"
              type="button"
              onClick={() => openCreate()}
            >
              Thêm mới
            </CButton>
          </div>
          <CCardBody>
            <CDataTable
              items={clinics}
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
                edit: (item) => {
                  return (
                    <td className="py-2">
                      <Icon.PencilSquare
                        size="25"
                        style={cursorPointerStyle}
                        onClick={() => {
                          openEditModal(item);
                        }}
                      ></Icon.PencilSquare>
                    </td>
                  );
                },
                deactivate: (item) => {
                  return (
                    <td className="py-2">
                      <CIcon
                        name="cilTrash"
                        size="xl"
                        style={cursorPointerStyle}
                        onClick={() => {
                          openDeactivateModal(item);
                        }}
                      />
                    </td>
                  );
                },
              }}
            ></CDataTable>
          </CCardBody>
        </CCard>
      </CCol>
      <DeactivateClinicModal
        modal={deleteModal}
        onClose={setDeleteModal}
        clinics={clinics}
        setClinics={setClinics}
        clinic={clinic}
      />
      <EditClinicModal
        modal={editModal}
        onClose={setEditModal}
        clinics={clinics}
        setClinics={setClinics}
        clinic={clinic}
        isEditing={isEditing}
      />{" "}
    </CRow>
  );
};

export default ClinicManagement;
