export const handleInputChange = (setFunction) => (event) => {
  setFunction(event.target.value);
};

// export
export const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(":");
  let hours12 = parseInt(hours, 10);
  const period = hours12 >= 12 ? "PM" : "AM";
  hours12 = hours12 % 12 || 12;
  return `${hours12}:${minutes} ${period}`;
};

export const formatDate = (dateString) => {
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
