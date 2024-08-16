import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findEvent } from "../../services/events.service";

const ESales = () => {
  const param = useParams();
  const [btnSelected, setBtnSelected] = useState("Tickets");

  const handleSelectFilter = (e) => {
    setBtnSelected(e.target.value);
  };

  const GetOneEvent = async () => {
    try {
      const response = await findEvent(param.eventIdParam);

      if (response.success) {
        console.log("The Actual Event:", response);
      }
    } catch (error) {
      console.error("The Actual Event Error:", error.response);
    }
  };

  useEffect(() => {
    GetOneEvent();
  }, []);

  // console.log("Params:", param);

  console.log("SelectedValue", btnSelected);
  return (
    <div>
      <h1 className="total-sales-title">Total Sales So Far</h1>

      <div className="button-filter-container">
        <button
          value="Tickets"
          onClick={handleSelectFilter}
          className={btnSelected === "Tickets" ? "selected-value" : ""}
        >
          Tickets
        </button>
        <button
          value="Tables"
          onClick={handleSelectFilter}
          className={btnSelected === "Tables" ? "selected-value" : ""}
        >
          Tables
        </button>
        <button
          value="Layout"
          onClick={handleSelectFilter}
          className={btnSelected === "Layout" ? "selected-value" : ""}
        >
          Layout
        </button>
      </div>

      


    </div>
  );
};

export default ESales;
