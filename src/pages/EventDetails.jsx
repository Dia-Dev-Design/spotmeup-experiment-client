import React, { useEffect, useState, useContext } from "react";
import NavBar from "../components/ToolsC/NavBar";
import { findEvent } from "../services/events.service";
import { useParams, useNavigate } from "react-router-dom";
import DynamicLayout from "../components/ToolsC/DynamicLayout";
import { AuthContext } from "../context/auth.context";

import calendarIcon from "../assets/calendar_icon.svg";
import destinationMarker from "../assets/destination_marker.svg";
import timeIcon from "../../dist/assets/Timer.svg";
import wineBottle from "../../dist/assets/wine-bottle.svg";
import tableSelection from "../../dist/assets/table-selection.svg";
import UpcomingEvents from "../components/Home/UpcomingEvents";
import Footer from "../components/Home/Footer";

const EventDetails = () => {
  const param = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 760);

  const getThisEvent = async () => {
    try {
      const response = await findEvent(param.eventIdParam);
      if (response.success) {
        setEvent(response.event);
      }
      // console.log("GetThisEvent - Response:", response);
    } catch (error) {
      console.error("GetThisEvent - Error:", error.response);
    }
  };

  const [acceppted, setAcceppted] = useState(false);

  const handleAccept = () => {
    console.log("We are accepting or not!!!!!!!");
    setAcceppted((prev) => !prev);

    //must send message to backend relating that they have accepted the terms, possibly to be relayed to bank as well
  };

  const [message, setMessage] = useState(null);

  const moveToDetails = async (eventId) => {
    if (!isLoggedIn) {
      setMessage("You must be logged in to proceed.");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } else if (!acceppted) {
      setMessage("Term & Conditions Must Be Accepted");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } else {
      navigate(`/event-tickets/${eventId}`);
    }
  };

  // console.log("Accepted:", acceppted);

  useEffect(() => {
    getThisEvent();
  }, [param.eventIdParam]);

  const formatDateLong = (dateString) => {
    const date = new Date(dateString);

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return date.toLocaleString("en-US", options);
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    let hours12 = parseInt(hours, 10);
    const period = hours12 >= 12 ? "PM" : "AM";
    hours12 = hours12 % 12 || 12;
    return `${hours12}:${minutes} ${period}`;
  };

  if (!event) {
    return <div>Loading...</div>; // O algún indicador de carga
  }

  if (event) {
    console.log("Event - Object:", event);
  }

  return (
    <div className="event-details-container">
      <NavBar />

      <div className="event-details-grid">
        <div
          style={{
            backgroundImage: `url(${
              event.images && event.images.length > 0
                ? event.images[0]
                : "/no-image.jpg" // URL de la imagen de respaldo
            })`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            // width: "900px",
            // height: "1000px",
          }}
          className="event-image-details place-self-center"
        ></div>

        <div className="event-details-fields">
          <div className="event-details-separator">
            <div>
              <h1 className="event-details-title">{event.name}</h1>
              <div className="event-details-container-two">
                <div className="event-details-group">
                  <h1 className="normalize-font">
                    {formatDateLong(event.date)}
                  </h1>
                  {/* <span className="dot-separator">·</span> */}
                  <h1 className="normalize-font">{formatTime(event.time)}</h1>
                </div>
              </div>
              <h1 className="event-venue-name">{event.venue.name}</h1>
              <h1 className="event-details-title">About Event</h1>
              <h1 className="event-venue-name">
                Enjoy a night out with your friends with open bar, a line-up of
                three DJs and many more other surprises. Don't miss out and come
                enjoy this event!
              </h1>
              <div className="flex flex-col">
                <div className="h-[43.08px] p-2 justify-start items-center gap-2 inline-flex">
                  <div
                    className="w-[26px] h-[27.08px] relative"
                    style={{ backgroundImage: `url(${timeIcon})` }}
                  />
                  <div className="grow shrink basis-0 text-neutral-100 text-base font-normal font-['Archivo'] leading-tight">
                    Age +21
                  </div>
                </div>

                <div className="h-[43.08px] p-2 justify-start items-center gap-2 inline-flex">
                  <div className="w-[26px] h-[27.08px] px-[5px] flex-col justify-center items-center inline-flex">
                    <div
                      className="w-4 h-8 relative flex-col justify-start items-start flex"
                      style={{ backgroundImage: `url(${wineBottle})` }}
                    />
                  </div>
                  <div className="grow shrink basis-0 text-neutral-100 text-base font-normal font-['Archivo'] leading-tight">
                    Bottle Service Included
                  </div>
                </div>

                <div className="h-[43.08px] p-2 justify-start items-center gap-2 inline-flex">
                  <div className="w-[26px] h-[27.08px] pt-[3px] pb-[2.08px] flex-col justify-center items-center inline-flex">
                    <div
                      className="w-[26px] h-[22px] relative flex-col justify-start items-start flex"
                      style={{ backgroundImage: `url(${tableSelection})` }}
                    />
                  </div>
                  <div className="grow shrink basis-0 text-neutral-100 text-base font-normal font-['Archivo'] leading-tight">
                    Table Selection Available
                  </div>
                </div>
              </div>

              <h1 className="event-details-title">About Line Up</h1>
              <h1 className="event-venue-name">
                Music and beats by: Achez & Luka Berges
              </h1>
              <h1 className="event-details-title">About Venue</h1>
              <h1 className="event-venue-name">
                {event?.venue?.address?.city}, {event?.venue?.address?.state},{" "}
                {event?.venue?.address?.street}
              </h1>
            </div>
            <div className="event-details-btn-container"></div>
            {message && <h1 className="event-li-terms-red">{message}</h1>}
            {/* {isMobile && (
              <button
                className="event-details-btn"
                onClick={() => moveToDetails(event._id)}
              >
                Buy Tickets
              </button>
            )}
            {!isMobile && (
              <button
                className="event-details-btn"
                onClick={() => moveToDetails(event._id)}
              >
                Buy Tickets
              </button>
            )} */}
          </div>
          <hr className="term-conditions-hr" />

          {/* {!acceppted && (
            <div className="event-terms-conditions-container">
              <h1 className="event-li-title">Política De Reembolso</h1>
              <ul>
                <li className="event-li-terms">
                  Los reembolsos estarán disponibles únicamente si el promotor
                  cancela el evento debido a causas mayores.
                </li>
                <li className="event-li-terms">
                  No se otorgarán reembolsos por cargos de servicio.
                </li>
                <li className="event-li-terms">
                  Para solicitar un reembolso en caso de cancelación por causas
                  mayores, envíe un correo electrónico a soporte@spotmeup.com
                  con el ID de la orden y los detalles del evento.
                </li>
              </ul>
              <h1 className="event-li-title">Política De Devoluciones</h1>
              <ul>
                <li className="event-li-terms">
                  Las devoluciones se realizarán automáticamente dentro de los 5
                  días laborables una vez se haya determinado que la actividad
                  tiene un motivo válido para cancelar.
                </li>
                <li className="event-li-terms">
                  En caso de cancelación del evento por un motivo válido, los
                  tickets serán reembolsados automáticamente al método de pago
                  original.
                </li>
                <li className="event-li-terms">
                  Si un evento es reprogramado, los tickets serán válidos para
                  la nueva fecha. Si no puede asistir a la nueva fecha, puede
                  solicitar un reembolso dentro de los 14 días posteriores al
                  anuncio de la reprogramación.
                </li>
              </ul>
              <h1 className="event-li-title">Política de Cancelación</h1>
              <ul>
                <li className="event-li-terms">
                  Una vez comprado el ticket, el usuario no puede cancelar su
                  compra.
                </li>
                <li className="event-li-terms">
                  Si el promotor cancela el evento por una razón válida, se le
                  reembolsará el dinero dentro de 5 días laborables.
                </li>
                <li className="event-li-terms">
                  Para más información o asistencia, contacte a nuestro equipo
                  de soporte en soporte@spotmeup.com.
                </li>
              </ul>
              <label htmlFor="checkbox" className="event-li-terms">
                Acepto Los Terminos & Condiciones
              </label>
              <input type="checkbox" name="check" onClick={handleAccept} />
            </div>
          )} */}
        </div>

        <div className="justify-self-center w-[80%]">
          <h1>Purchase Policies</h1>
          <h1>
            Spot Me Up Assures your purchase is subject to our purchase and
            refund <br />
            policy. If any issue arises, please contact the event organizer.
          </h1>
        </div>

        <div className="h-[100%] py-4 bg-[#282828] rounded-lg flex-col justify-center items-center gap-4 inline-flex">
          <div className="self-stretch h-[158px] flex-col justify-start items-start gap-1 flex">
            <div className="self-stretch h-[73px] px-4 flex-col justify-start items-start gap-2 flex">
              <div className="text-white text-[28px] font-bold font-['Space Grotesk']">
                Admission Tickets
              </div>
              <div className="self-stretch justify-start items-start gap-2 inline-flex">
                <div className="grow shrink basis-0 h-[29px] justify-start items-start gap-2 flex">
                  <div className="text-white text-[21px] font-normal font-['Archivo'] leading-[29.40px]">
                    At
                  </div>
                  <div className="text-white text-[21px] font-normal font-['Archivo'] leading-[29.40px]">
                    $1,150
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch h-[81px] px-4 py-1 flex-col justify-start items-start flex">
              <div className="self-stretch h-[73px] flex-col justify-start items-start gap-2 flex">
                <div className="justify-start items-start gap-2 inline-flex">
                  <div className="text-white text-[28px] font-bold font-['Space Grotesk']">
                    Reserve Your Spots
                  </div>
                </div>
                <div className="justify-start items-start gap-2 inline-flex">
                  <div className="text-white text-[21px] font-normal font-['Archivo'] leading-[29.40px]">
                    Starting at
                  </div>
                  <div className="text-white text-[21px] font-normal font-['Archivo'] leading-[29.40px]">
                    $6,000
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[96%] h-[58px] px-4 bg-[#d4af37] rounded-[100px] items-center inline-flex justify-center">
            <div className="justify-start items-start flex">
              <div className="py-4 rounded-lg shadow justify-center items-center flex">
                <div className="text-center text-black text-xl font-bold font-['Space Grotesk']">
                  Buy Tickets
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#1e1e1e]">
        <UpcomingEvents />
        <Footer />
      </div>
    </div>
  );
};

export default EventDetails;
