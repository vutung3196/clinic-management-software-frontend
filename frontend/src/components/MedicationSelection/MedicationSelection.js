import React, { useState, useEffect } from "react";
import { CCard, CCardHeader } from "@coreui/react";
import medicationService from "../../services/medication/medication.service";
import authService from "../../services/authentication/auth.service";

const MedicationSelection = ({
  medications,
  setMedications,
  setNumberMedicationChildren,
  numberMedicationChildren,
}) => {
  const [allMedications, setAllMedications] = useState([]);
  const [medicationsByGroup, setMedicationsByGroup] = useState([]);

  const retrieveAllMedications = () => {
    var currentUser = authService.getCurrentUser();
    medicationService
      .getCurrentMedicationFromClinic(currentUser.clinicId)
      .then((response) => {
        setAllMedications(response.data);
      })
      .catch((e) => {
        setAllMedications([]);
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveAllMedications();
  }, []);

  const getMedicationItems = (medications) => {
    setMedicationsByGroup(medications);
  };

  const addMedicationItem = (medication) => {
    var newMedication = {
      index: numberMedicationChildren,
      id: medication.id,
      quantity: 0,
      usage: medication.usage,
      name: medication.name,
    };
    if (
      medications !== undefined &&
      medications[medications.length - 1] !== undefined &&
      medications[medications.length - 1].id === 0
    ) {
      let items = [...medications];
      let item = { ...items[items.length - 1] };
      item = newMedication;
      if (medications.length === 1) {
        item.index = 0;
      }
      items[items.length - 1] = item;
      setMedications(items);
    } else {
      setMedications((prev) => [...medications, newMedication]);
      setNumberMedicationChildren(numberMedicationChildren + 1);
    }
  };

  const style1 = {
    position: "relative",
    overflow: "auto",
    width: "auto",
    height: "110px",
  };

  const style2 = {
    height: "110px",
    overflow: "auto",
    width: "auto",
  };

  const style3 = {
    position: "relative",
    overflow: "auto",
    width: "auto",
    height: "414px",
  };

  const style4 = {
    height: "414px",
    overflow: "auto",
    width: "auto",
  };

  return (
    <div>
      <CCard className="mx-1">
        <div id="ioc66_drugcat" class="box66">
          <div class="h">
            <CCardHeader class="title-box">Nhóm</CCardHeader>
          </div>
          <div class="slimScrollDiv" style={style1}>
            <div class="b" style={style2}>
              <ul>
                {allMedications.map((entry) => (
                  <li
                    class="medication-li"
                    onClick={() => getMedicationItems(entry.medications)}
                  >
                    {entry.groupName}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </CCard>
      <CCard className="mx-1">
        <div id="ioc66_druglist" class="box66">
          <div class="h">
            <CCardHeader class="title-box">Danh mục</CCardHeader>
          </div>
          <div class="slimScrollDiv" style={style3}>
            <div class="b" style={style4}>
              <ul>
                {medicationsByGroup.map((entry) => (
                  <li
                    id="48"
                    num="0"
                    unit="Viên"
                    class="medication-li"
                    use="Sáng: 0 viên - Trưa 0 viên - Chiều 0 viên"
                    onClick={() => addMedicationItem(entry)}
                  >
                    {entry.name}
                  </li>
                ))}
              </ul>
            </div>
            <div class="slimScrollBar slimScrollDrug"></div>
            <div class="slimScrollRail slimScrollRailDrug"></div>
          </div>
        </div>
      </CCard>
    </div>
  );
};

export default MedicationSelection;
