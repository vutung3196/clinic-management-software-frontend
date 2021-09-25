import React, { useState, useEffect } from "react";
import * as Icon from "react-bootstrap-icons";
import CIcon from "@coreui/icons-react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
} from "@coreui/react";
import userService from "src/services/user/user.service";
import DeactivateUserModal from "./DeactivateUserModal";
import EditUserModal from "./EditUserModal";

const UserManagement = () => {
  const constUser = {
    phoneNumber: null,
    id: 0,
    userName: "",
    firstName: null,
    lastName: null,
    enabled: 1,
    isEnabled: false,
    clinicId: 0,
    role: "",
  };

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(constUser);
  const [userId, setUserId] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // modal
  const [deactivateModal, setDeactivateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const retrieveUsers = () => {
    userService
      .getUsers()
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(retrieveUsers, []);

  const fields = [
    {
      key: "userName",
      label: "Tên đăng nhập",
      _style: { width: "8%" },
    },
    { key: "fullName", label: "Họ tên" },
    { key: "roleDescription", label: "NHÓM NGƯỜI DÙNG" },
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
    if (!item.enabled) {
      alert("Người dùng đã khóa");
    } else {
      setUser(item);
      setDeactivateModal(!deactivateModal);
    }
  };

  const openEditModal = (item) => {
    console.log(item);
    setIsEditing(true);
    setUser(item);
    setEditModal(!editModal);
  };

  const openCreate = (item) => {
    setUser(constUser);
    setIsEditing(false);
    setEditModal(!editModal);
  };

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>Danh sách người dùng</CCardHeader>
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
              items={users}
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
      <DeactivateUserModal
        modal={deactivateModal}
        onClose={setDeactivateModal}
        users={users}
        setUsers={setUsers}
        user={user}
      />
      <EditUserModal
        modal={editModal}
        onClose={setEditModal}
        users={users}
        setUsers={setUsers}
        user={user}
        isEditing={isEditing}
      />{" "}
    </CRow>
  );
};

export default UserManagement;
