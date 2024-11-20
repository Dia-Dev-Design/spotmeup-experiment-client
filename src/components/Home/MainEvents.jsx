import React, { useEffect, useState, useRef } from "react";
import { findAllEvents } from "../../services/events.service";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCoverflow,
} from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css/bundle";

const MainEvents = ({ events }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const handleSlideChange = () => {
    const currentActiveIndex = swiperRef?.current?.realIndex;

    setActiveIndex(currentActiveIndex);
  };

  const handleNextSlide = () => {
    swiperRef.current?.slideNext();
  };

  const handlePrevSlide = () => {
    swiperRef.current?.slidePrev();
  };
  const navigate = useNavigate();
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

  const filteredEvents = events?.filter((event) => {
    const eventDate = new Date(event.date);
    const today = new Date();
    return eventDate.setHours(0, 0, 0, 0) >= today.setHours(0, 0, 0, 0);
  });

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    let hours12 = parseInt(hours, 10);
    const period = hours12 >= 12 ? "PM" : "AM";
    hours12 = hours12 % 12 || 12;
    return `${hours12}:${minutes} ${period}`;
  };

  const handleChangePage = (eventId, index) => {
    if (activeIndex === index) {
      navigate(`/event-details/${eventId}`);
    }
  };

  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      slidesPerView={"auto"}
      centeredSlides={true}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 150,
        modifier: 1,
        slideShadows: true,
      }}
      className="mySwiper"
      pagination={{
        clickable: true,
        renderCustom: (swiper, current, total) => {
          let bullets = "";
          for (let i = 1; i <= total; i++) {
            bullets += `
              <span class="${i === current ? "custom-bullet active" : "custom-bullet"}">
                ${i}
              </span>
            `;
          }
          return `<div class="custom-pagination">${bullets}</div>`;
        },
      }}
      // pagination={true}
      loop={true}
      modules={[ A11y, EffectCoverflow, Pagination]}
      onSlideChange={handleSlideChange}
      onSwiper={(swiperInstance) => {
        swiperRef.current = swiperInstance;
      }}
    >
      {events &&
        events
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 10)
          .map((event, index) => (
            <SwiperSlide
              key={event._id}
              onClick={() => handleChangePage(event._id, index)}
              style={{
                paddingBottom: "0rem",
                borderRadius: "20px",
              }}
            >
              <img
                src={event?.images[0] ? event?.images[0] : "/no-image.jpg"}
                alt="event-logo"
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: "20px",
                }}
              />

              {console.log(`Active Index ${activeIndex} - Index ${index}`)}

              {/* {index === activeIndex && (
                <>
                  <h1 style={{ color: "red", textAlign: "center" }}>
                    Este está activo
                  </h1>
                </>
              )} */}
            </SwiperSlide>
          ))}
    </Swiper>
  );
};

export default MainEvents;
