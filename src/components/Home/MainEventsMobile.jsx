import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MainEventsMobile = ({ events }) => {
  const getMiddleIndex = () => Math.floor((events?.length || 0) / 2);
  const [currentIndex, setCurrentIndex] = useState(getMiddleIndex());
  const navigate = useNavigate();

  // Navigation functions remain the same as Main Events
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

  // Modified to show only 3 cards (-1, 0, 1) instead of 5
  const getVisibleIndices = (currentIdx, totalLength) => {
    const indices = [];
    // Get 1 card before and 1 card after the current card
    for (let i = -1; i <= 1; i++) {
      let index = currentIdx + i;
      while (index < 0) index += totalLength;
      while (index >= totalLength) index -= totalLength;
      indices.push(index);
    }
    return indices;
  };

  // Adjusted card positioning for mobile view
  const getCardStyle = (visiblePosition) => {
    let translateX = 0;
    let rotateY = 0;
    let scale = 1;
    let opacity = 1;
    let zIndex = 5;

    switch (visiblePosition) {
      case -1: // Left card
        translateX = -160; // Reduced spacing for mobile
        rotateY = 25;
        scale = 0.85;
        opacity = 0.8;
        zIndex = 2;
        break;
      case 0: // Center card
        translateX = 0;
        rotateY = 0;
        scale = 1;
        opacity = 1;
        zIndex = 5;
        break;
      case 1: // Right card
        translateX = 160; // Reduced spacing for mobile
        rotateY = -25;
        scale = 0.85;
        opacity = 0.8;
        zIndex = 2;
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
      transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
    };
  };

  // Simplified dot style for 3 dots
  const getDotStyle = (visiblePosition) => {
    let scale = 1;
    let opacity = 1;

    switch (visiblePosition) {
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

  // Auto-scroll functionality remains the same
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
      <div className="flex items-center justify-center h-[500px] bg-black text-white">
        <p>No featured Events</p>
      </div>
    );
  }

  const visibleIndices = getVisibleIndices(currentIndex, events.length);

  return (
    <div className="relative w-full mx-auto h-[550px] bg-black px-4">
      {/* Main carousel container with adjusted height and padding */}
      <div className="absolute left-1/2 top-[35%] -translate-x-1/2 -translate-y-1/2 w-full">
        <div className="relative h-[360px] w-full max-w-sm mx-auto flex items-center justify-center">
          {visibleIndices.map((eventIndex, displayIndex) => (
            <div
              key={events[eventIndex]._id}
              className="absolute w-[280px] h-[280px] hover:cursor-pointer"
              style={getCardStyle(displayIndex - 1)} // -1 to 1 positions
              onClick={() => handleChangePage(events[eventIndex]._id, eventIndex)}
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

      {/* Navigation buttons with adjusted positioning */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-[35%] -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-colors z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-[35%] -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-colors z-20"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Indicator dots */}
      <div
        className="absolute top-[65%] left-1/2 transform -translate-x-1/2 flex space-x-3 z-20"
        role="tablist"
      >
        {visibleIndices.map((index, displayIndex) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className="w-2 h-2 rounded-full bg-white transition-all duration-300"
            style={getDotStyle(displayIndex - 1)}
            role="tab"
            aria-selected={index === currentIndex}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Event information section */}
      <div className="absolute bottom-0 left-0 right-0 h-[160px] bg-black p-4">
        {events[currentIndex] && (
          <div className="max-w-sm mx-auto text-white text-center">
            <h2 className="text-2xl font-bold mb-2">
              {events[currentIndex].name}
            </h2>
            <p className="text-base mb-4">
              {events[currentIndex].date} • {events[currentIndex].time}
            </p>
            <button
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-full font-semibold transition-colors text-sm"
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

export default MainEventsMobile;