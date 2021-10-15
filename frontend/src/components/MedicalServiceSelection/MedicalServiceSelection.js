import React, { useState, useEffect } from "react";
import { CCard, CCardHeader } from "@coreui/react";
import medicalService from "src/services/medicalservice/medical.service";

const MedicalServiceSelection = ({
  medicalServiceList,
  setMedicalServiceList,
  setNumberMedicalServicesChildren,
  numberMedicalServicesChildren,
}) => {
  const [allMedicalServices, setAllMedicalServices] = useState([]);
  const [medicalServicesByGroup, setMedicalServicesByGroup] = useState([]);

  const retrieveAllMedicalServices = () => {
    medicalService
      .getMedicalServiceWithGroup()
      .then((response) => {
        setAllMedicalServices(response.data);
      })
      .catch((e) => {
        setAllMedicalServices([]);
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveAllMedicalServices();
  }, []);

  const getMedicalServiceItems = (medicalServices) => {
    setMedicalServicesByGroup(medicalServices);
  };

  const addMedicalServiceItem = (medicalService) => {
    var newMedicalService = {
      index: numberMedicalServicesChildren,
      id: medicalService.id,
      quantity: medicalService.quantity,
      name: medicalService.name,
      description: "",
    };
    if (
      medicalServiceList !== undefined &&
      medicalServiceList[medicalServiceList.length - 1] !== undefined &&
      medicalServiceList[medicalServiceList.length - 1].id === 0
    ) {
      let items = [...medicalServiceList];
      let item = { ...items[items.length - 1] };
      item = newMedicalService;
      if (medicalServiceList.length === 1) {
        item.index = 0;
      }
      items[items.length - 1] = item;
      setMedicalServiceList(items);
    } else {
      var result = medicalServiceList.find((obj) => {
        return obj.id === medicalService.id;
      });
      if (result !== undefined) {
        // let item = result;
        // item.quantity += 1;
        // if (medicalServiceList.length === 1) {
        //   item.index = 0;
        // }
        // var a = [...medicalServiceList];
        // var updateIndex = a.map((item) => item.id).indexOf(result.id);
        // a[updateIndex] = item;
        // setMedicalServiceList(a);
        return;
      }
      setMedicalServiceList((prev) => [
        ...medicalServiceList,
        newMedicalService,
      ]);
      setNumberMedicalServicesChildren(numberMedicalServicesChildren + 1);
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
                {allMedicalServices.map((entry) => (
                  <li
                    class="medication-li"
                    onClick={() =>
                      getMedicalServiceItems(entry.medicalServices)
                    }
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
                {medicalServicesByGroup.map((entry) => (
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

export default MedicalServiceSelection;
