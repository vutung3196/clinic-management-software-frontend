import React, { useState, useEffect } from "react";
import { CCard, CCardHeader } from "@coreui/react";
import medicationService from "src/services/medicationservice/medication.service";

const MedicationSelection = ({
  medicationList,
  setMedicationList,
  setNumberMedicationChildren,
  numberMedicationChildren,
}) => {
  console.log("here is the selection");
  const [allMedications, setAllMedications] = useState([]);
  const [medicationsByGroup, setMedicationsByGroup] = useState([]);
  console.log(medicationList);
  const retrieveAllMedicalServices = () => {
    medicationService
      .get()
      .then((response) => {
        console.log("============================");
        console.log(response.data);
        setAllMedications(response.data);
      })
      .catch((e) => {
        setAllMedications([]);
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveAllMedicalServices();
  }, []);

  const getMedicationItems = (medications) => {
    setMedicationsByGroup(medications);
  };

  const addMedicalServiceItem = (medicalService) => {
    var newMedicalService = {
      index: numberMedicationChildren,
      id: medicalService.id,
      quantity: medicalService.quantity,
      name: medicalService.name,
      usage: medicalService.usage,
    };
    if (
      medicationList !== undefined &&
      medicationList[medicationList.length - 1] !== undefined &&
      medicationList[medicationList.length - 1].id === 0
    ) {
      let items = [...medicationList];
      let item = { ...items[items.length - 1] };
      item = newMedicalService;
      if (medicationList.length === 1) {
        item.index = 0;
      }
      items[items.length - 1] = item;
      setMedicationList(items);
    } else {
      var result = medicationList.find((obj) => {
        return obj.id === medicalService.id;
      });
      if (result !== undefined) {
        let item = result;
        item.quantity = parseInt(item.quantity) + 1;
        if (medicationList.length === 1) {
          item.index = 0;
        }
        var a = [...medicationList];
        var updateIndex = a.map((item) => item.id).indexOf(result.id);
        a[updateIndex] = item;
        setMedicationList(a);
        return;
      }
      setMedicationList((prev) => [...medicationList, newMedicalService]);
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
                    onClick={() => addMedicalServiceItem(entry)}
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
