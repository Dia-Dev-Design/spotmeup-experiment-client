import React, { useEffect, useContext, useState } from "react";
import NavBar from "../components/ToolsC/NavBar";
import {
  getAllTicketInTransaction,
  findBoughtTicketsByUserEvent,
} from "../services/ticket.service";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { formatTime, formatDate } from "../services/tools.service";
import AddTickets from "./AddTickets";

const TicketsPage = () => {
  const param = useParams();
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState(null);
  const [showAddTickets, setShowAddTickets] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  console.log("addTickets:", showAddTickets);

  const handleTickets = () => {
    setShowAddTickets((prev) => !prev);
    if (selectedEvent) {
      setSelectedEvent(null);
    }
  };

  const handleSelectedEvent = (index) => {
    setSelectedEvent((prev) => ({
      ...prev,
      name: events[index].name,
      tickets: events[index].tickets,
    }));
  };

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
          <h1 className="past-next-title-font">
            {selectedEvent ? selectedEvent.name : "My Tickets"}
          </h1>

          {showAddTickets ? (
            <div className="past-next-carousel" onClick={handleTickets}>
              {events &&
                events.map((event, index) => (
                  <div
                    className="past-next-events-map"
                    key={index}
                    onClick={() => handleSelectedEvent(index)}
                  >
                    <img
                      src={
                        event.images &&
                        event.images.length > 0 &&
                        event.images[0] !== ""
                          ? event.images[0]
                          : "/no-image.jpg"
                      }
                      alt="event-logo"
                      className="preview-ticket-logo-flyer"
                    />
                    <div className="past-next-right-side">
                      <h1 className="past-next-name">{event.name}</h1>
                      <h1 className="past-next-field">
                        {formatDate(event.date)}
                      </h1>
                      <h1 className="past-next-field">
                        {formatTime(event.time)}
                      </h1>
                      <h1 className="past-next-field">
                        {event.address.city}, {event.address.state}
                      </h1>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <AddTickets
              handleTickets={handleTickets}
              selectedEvent={selectedEvent}
            />
          )}
        </div>
        <div className="past-next-title">
          <h1 className="past-next-title-font">Past Events</h1>
        </div>
      </div>
    </div>
  );
};

export default TicketsPage;
