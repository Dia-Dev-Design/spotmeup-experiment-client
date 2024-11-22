import React from "react";
import EventCard from "../../assets/icons/event-card.svg"

const UpcomingEvents = ({ events }) => {
  const formatDate = (dateString) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    const differenceInTime =
      eventDate.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0); // Ignore time part
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

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    let hours12 = parseInt(hours, 10);
    const period = hours12 >= 12 ? "PM" : "AM";
    hours12 = hours12 % 12 || 12;
    return `${hours12}:${minutes} ${period}`;
  };
  const filteredEvents = events?.filter((event) => {
    const eventDate = new Date(event.date);
    const today = new Date();
    return eventDate.setHours(0, 0, 0, 0) >= today.setHours(0, 0, 0, 0);
  });

  return (
    <div className="upcoming-events-container">
      <div className="upcoming-events-title">
        <h1 className="find-your-spot">Find your Spot</h1>
        <h1 className="browse-events">BROWSE EVENTS</h1>
      </div>

      <div className="upcoming-events-infite">
        <img src={EventCard} alt="Event Card" />
        <img src={EventCard} alt="Event Card" />
        <img src={EventCard} alt="Event Card" />
        <img src={EventCard} alt="Event Card" />
        <img src={EventCard} alt="Event Card" />
      </div>
    </div>
  );
};

export default UpcomingEvents;
