import React from "react";
import NavBar from "../components/ToolsC/NavBar";
import { QRCode } from "react-qrcode-logo";
import WhatApp from "../components/ToolsC/WhatApp";

const AddTickets = ({ handleTickets, selectedEvent }) => {
  console.log("selectedEvent:", selectedEvent);

  return (
    <div>
      <button onClick={handleTickets}>Go Back</button>
      {/* <NavBar /> */}
      {/* <h1>{selectedEvent?.name}</h1> */}
      <div className="addtickets-container">
        {selectedEvent &&
          selectedEvent.tickets.map((ticket, index) => (
            <div key={ticket?._id} className="addticket-qr-container">
              <QRCode value={ticket.qrcode} key={index} />
              <button className="send-email-tickets-btn">Send Email</button>
              <WhatApp />
              <img src="../../public/addToAppleWallet.svg" alt="" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default AddTickets;
