import React, { useEffect, useContext, useState } from "react";
import NavBar from "../components/ToolsC/NavBar";
import {
  getAllTicketInTransaction,
  findBoughtTicketsByUserEvent,
} from "../services/ticket.service";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const TicketsPage = () => {
  const param = useParams();
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState(null);

  //   console.log("User:", user);

  //   const findTicketsInTransaction = async () => {
  //     try {
  //       const response = await getAllTicketInTransaction(
  //         param.transactionIdParam
  //       );
  //       console.log("Get The Ticket Success:", response);
  //     } catch (error) {
  //       console.error("Get The Ticket - Error:", error.response);
  //     }
  //   };

  const findCurrentEvents = async () => {
    try {
      const response = await findBoughtTicketsByUserEvent(user?._id);
      console.log("Find Current Events - Success:", response);
      if (response.success) {
        setEvents(response.events);
      }
    } catch (error) {
      console.error("Find Current Events - Error:", error.response);
    }
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    let hours12 = parseInt(hours, 10);
    const period = hours12 >= 12 ? "PM" : "AM";
    hours12 = hours12 % 12 || 12;
    return `${hours12}:${minutes} ${period}`;
  };

  const formatDate = (dateString) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    const differenceInTime =
      eventDate.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0); 
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

    if (differenceInDays === 0) {
      return "Hoy";
    } else if (differenceInDays === 1) {
      return "Mañana";
    } else if (differenceInDays > 1 && differenceInDays < 7) {
      return `Este ${eventDate.toLocaleString("es-ES", { weekday: "long" })}`;
    } else {
      return new Intl.DateTimeFormat("es-ES", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }).format(eventDate);
    }
  };

  useEffect(() => {
    if (user?._id) {
      findCurrentEvents();
    }
  }, [user?._id]);

  return (
    <div>
      <NavBar />

      <div className="past-next-container">
        <div className="past-next-title">
          <h1 className="past-next-title-font">My Tickets</h1>
          {events &&
            events.map((event, index) => (
              <div className="past-next-events-map">
                <img
                  src={event.images[0]}
                  alt="event-logo"
                  className="preview-ticket-logo-flyer"
                />
                <div className="past-next-right-side">
                  <h1 className="past-next-name">{event.name}</h1>
                  <h1 className="past-next-field">{formatDate(event.date)}</h1>
                  <h1 className="past-next-field">{formatTime(event.time)}</h1>
                  <h1 className="past-next-field">{event.address.city}, {event.address.state}</h1>
                </div>
              </div>
            ))}
        </div>
        <div className="past-next-title">
          <h1 className="past-next-title-font">Past Events</h1>
        </div>
      </div>
    </div>
  );
};

export default TicketsPage;
