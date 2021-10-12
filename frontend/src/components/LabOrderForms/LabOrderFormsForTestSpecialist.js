import React, { useState, useEffect } from "react";
import laborderformService from "src/services/laborderform/laborderform.service";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
} from "@coreui/react";

import * as Icon from "react-bootstrap-icons";
import ArticleIcon from "@mui/icons-material/Article";
import SingleLabOrderFormModal from "./SingleLabOrderFormModal";

const LabOrderFormsForTestSpecialist = () => {
  const [labOrderForms, setLabOrderForms] = useState([]);
  const [labOrderForm, setLabOrderForm] = useState([]);

  const [labTests, setLabTests] = useState([]);

  const [detailedModal, setDetailedModal] = React.useState(false);

  const handleCloseDetailedModal = () => setDetailedModal(false);

  const cursorPointerStyle = {
    cursor: "pointer",
  };
  const [patient, setPatient] = useState("");

  const retrieveAll = () => {
    laborderformService
      .getByRole()
      .then((response) => {
        console.log("really");
        console.log(response.data);
        setLabOrderForms(response.data);
      })
      .catch((e) => {
        setLabOrderForms([]);
        console.log(e);
      });
  };

  useEffect(retrieveAll, []);

  const fields = [
    {
      key: "code",
      label: "MÃ PHIẾU CHỈ ĐỊNH",
      _style: { width: "8%" },
    },
    { key: "patientDetailedInformation", label: "THÔNG TIN BỆNH NHÂN" },
    { key: "doctorName", label: "Bác sĩ khám" },
    { key: "description", label: "MÔ TẢ" },
    { key: "status", label: "TRẠNG THÁI" },
    { key: "createdAt", label: "GIỜ CẬP NHẬT" },
    {
      key: "view",
      label: "XEM",
      _style: { width: "2%" },
      sorter: false,
      filter: false,
    },
    {
      key: "print",
      label: "IN",
      _style: { width: "3%" },
      sorter: false,
      filter: false,
    },
  ];

  const rowsPerPageOption = {
    label: "Số bản ghi trên trang",
    values: [5, 10, 20],
  };

  const toggleView = (row) => {
    setPatient(row.patientInformation);
    setLabTests(row.labTests);
    setLabOrderForm(row);
    setDetailedModal(true);
  };

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Danh sách cần khám</CCardHeader>
            <CCardBody>
              <CDataTable
                items={labOrderForms}
                fields={fields}
                columnFilter
                hover
                striped
                bordered
                size="sm"
                itemsPerPageSelect={rowsPerPageOption}
                itemsPerPage={10}
                sorter
                pagination
                scopedSlots={{
                  view: (row) => {
                    return (
                      <td className="py-2">
                        <ArticleIcon
                          style={cursorPointerStyle}
                          onClick={() => {
                            toggleView(row);
                          }}
                        />
                      </td>
                    );
                  },
                  print: (row) => {
                    return (
                      <td className="py-2">
                        <Icon.Printer
                          size="23"
                          style={cursorPointerStyle}
                          onClick={() => {
                            window.open("/laborderform/" + row.id);
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
      </CRow>
      <SingleLabOrderFormModal
        open={detailedModal}
        onClose={handleCloseDetailedModal}
        labTests={labTests}
        patient={patient}
        labOrderForm={labOrderForm}
      />
    </>
  );
};

export default LabOrderFormsForTestSpecialist;
