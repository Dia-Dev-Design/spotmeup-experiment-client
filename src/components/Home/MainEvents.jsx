import { useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MainEvents = ({ events }) => {
  const getMiddleIndex = () => Math.floor((events?.length || 0) / 2);
  const [currentIndex, setCurrentIndex] = useState(getMiddleIndex());
  const navigate = useNavigate();

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === (events?.length || 0) - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? (events?.length || 0) - 1 : prevIndex - 1
    );
  };

  const getVisibleIndices = (currentIdx, totalLength) => {
    const indices = [];
    // Get 2 cards before and 2 cards after the current card
    for (let i = -2; i <= 2; i++) {
      let index = currentIdx + i;
      // // Handle circular rotation. Normalize the index to create infinite rotation
      while (index < 0) index += totalLength;
      while (index >= totalLength) index -= totalLength;
      indices.push(index);
    }
    return indices;
  };

  const getCardStyle = (visiblePosition) => {
    let translateX = 0;
    let rotateY = 0;
    let scale = 1;
    let opacity = 1;
    let zIndex = 5;
    let filter = "none";

    switch (visiblePosition) {
      case -2: // Leftmost card
        translateX = -400;
        rotateY = 45; // Rotate right side toward viewer
        scale = 0.8; // Reduce size
        // opacity = 0.6; // Partially fade out
        zIndex = 1; // Place behind other cards
        filter = "saturate(0) brightness(0.4)";
        break;
      case -1: // Left card
        translateX = -200;
        rotateY = 25; // Slight rotation
        scale = 0.9;
        // opacity = 0.8;
        zIndex = 2;
        filter = "saturate(0.4) brightness(0.6)";
        break;
      case 0: // Center card
        translateX = 0;
        rotateY = 0;
        scale = 1;
        opacity = 1;
        zIndex = 5;
        break;
      case 1: // Right card
        translateX = 200;
        rotateY = -25;
        scale = 0.9;
        // opacity = 0.8;
        zIndex = 2;
        filter = "saturate(0.4) brightness(0.6)";
        break;
      case 2: // Rightmost card
        translateX = 400;
        rotateY = -45;
        scale = 0.8;
        // opacity = 0.6;
        zIndex = 1;
        filter = "saturate(0) brightness(0.4)";
        break;
      default:
        return {
          opacity: 0,
          visibility: "hidden",
          transform: "scale(0.8)",
          zIndex: 0,
        };
    }

    return {
      transform: `perspective(1000px) translateX(${translateX}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      zIndex,
      filter,
      transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
    };
  };

  const getDotStyle = (visiblePosition) => {
    let scale = 1;
    let opacity = 1;

    switch (visiblePosition) {
      case -2:
      case 2:
        scale = 0.6;
        opacity = 0.4;
        break;
      case -1:
      case 1:
        scale = 0.8;
        opacity = 0.6;
        break;
      case 0:
        scale = 1;
        opacity = 1;
        break;
      default:
        return {
          opacity: 0,
          visibility: "hidden",
          transform: "scale(0)",
        };
    }

    return {
      transform: `scale(${scale})`,
      opacity,
      transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
    };
  };

  useEffect(() => {
    if (events?.length) {
      const timer = setInterval(nextSlide, 5000);
      return () => clearInterval(timer);
    }
  }, [events]);

  const handleChangePage = (eventId, index) => {
    if (currentIndex === index) {
      navigate(`/event-details/${eventId}`);
    }
  };

  if (!events?.length) {
    return (
      <div className="flex items-center justify-center h-[900px] bg-black text-white">
        <p>No featured Events</p>
      </div>
    );
  }

  const visibleIndices = getVisibleIndices(currentIndex, events.length);

  return (
    <div className="relative w-full max-w-7xl mx-auto h-[700px] bg-black">
      <div className="absolute left-1/2 top-[35%] -translate-x-1/2 -translate-y-1/2 w-full">
        <div className="relative h-[500px] w-full max-w-6xl mx-auto flex items-center justify-center">
          {visibleIndices.map((eventIndex, displayIndex) => (
            <div
              key={events[eventIndex]._id}
              className="absolute w-[480px] h-[480px] hover:cursor-pointer"
              style={getCardStyle(displayIndex - 2)} // -2 to 2 positions
              onClick={() =>
                handleChangePage(events[eventIndex]._id, eventIndex)
              }
            >
              <div className="w-full h-full rounded-lg shadow-xl overflow-hidden hover:shadow-3xl transition-shadow duration-300">
                <img
                  src={
                    events[eventIndex]?.images[0]
                      ? events[eventIndex].images[0]
                      : "/no-image.jpg"
                  }
                  alt={`Event ${eventIndex + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-[180px] left-1/2 -translate-x-1/2 flex items-center justify-center space-x-16 z-20">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={prevSlide}
          className="cursor-pointer rotate-180"
          role="button"
          aria-label="Previous slide"
        >
          <g id="Arrows">
            <path
              id="Vector"
              d="M5 12H19"
              stroke="#B19FFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              id="Vector_2"
              d="M12 5L19 12L12 19"
              stroke="#B19FFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>

        {/* Dots between arrows */}
        <div className="flex space-x-4">
          {visibleIndices.map((index, displayIndex) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="w-3 h-3 rounded-full bg-purple-300 transition-all duration-300"
              style={getDotStyle(displayIndex - 2)}
              role="tab"
              aria-selected={index === currentIndex}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={nextSlide}
          className="cursor-pointer"
          role="button"
          aria-label="Next slide"
        >
          <g id="Arrows">
            <path
              id="Vector"
              d="M5 12H19"
              stroke="#B19FFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              id="Vector_2"
              d="M12 5L19 12L12 19"
              stroke="#B19FFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-black p-8">
        {events[currentIndex] && (
          <div className="max-w-2xl mx-auto text-white text-center">
            <h2 className="text-3xl font-bold mb-4">
              {events[currentIndex].name}
            </h2>
            <p className="text-lg mb-6">
              {events[currentIndex].date} • {events[currentIndex].time}{" "}
            </p>
            <button
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-full font-semibold transition-colors"
              onClick={() =>
                navigate(`/event-details/${events[currentIndex]._id}`)
              }
            >
              Reserve Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainEvents;
