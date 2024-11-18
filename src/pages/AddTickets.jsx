import React, { useState } from "react";
import NavBar from "../components/ToolsC/NavBar";
import { QRCode } from "react-qrcode-logo";
import WhatApp from "../components/ToolsC/WhatApp";

const AddTickets = ({ handleTickets, selectedEvent }) => {
  console.log("selectedEvent:", selectedEvent);
  const [addAll, setAddAll] = useState(null);
  const [separate, setSeparate] = useState(null);
  const [addSeparateOption, setaddSeparateOption] = useState(true);

  return (
    <div>
      <button onClick={handleTickets}>Go Back</button>
      {/* <NavBar /> */}
      {/* <h1>{selectedEvent?.name}</h1> */}

      <div
        className={
          addSeparateOption
            ? "merge-tickets"
            : "addticket-qr-container"
        }
      >
        {selectedEvent &&
          selectedEvent.tickets.map((ticket, index) => (
            <div
              key={ticket?._id}
              className={
                addSeparateOption
                  ? `merge-tickets-child merge-tickets-child-${index}`
                  : "addticket-qr-container"
              }
            >
              {/* ------ Separate Tickets ------- */}
              <QRCode value={ticket.qrcode} key={index} />

              {!addSeparateOption && (
                <>
                  <button className="send-email-tickets-btn">Send Email</button>

                  <WhatApp />
                  <img src="../../public/addToAppleWallet.svg" alt="" />
                </>
              )}
            </div>
          ))}
      </div>
      <div className="adding-types-container">
        <button>Add All</button>
        <button>Add Separately & Transfer</button>
      </div>
    </div>
  );
};

export default AddTickets;
