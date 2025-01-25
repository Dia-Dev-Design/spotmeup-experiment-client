import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const MainEventsMobile = ({ events }) => {
  // Calculates initial carousel center index for balanced display
  const getMiddleIndex = () => Math.floor((events?.length || 0) / 2);
  // State management for current displayed event and animation control
  const [currentIndex, setCurrentIndex] = useState(getMiddleIndex());
  const navigate = useNavigate();

  // Refs for advanced interaction tracking and performance optimization
  const containerRef = useRef(null);    // DOM element reference
  const isDragging = useRef(false);     // Tracks drag interaction state
  const startX = useRef(0);             // Initial drag start position
  const touchStartX = useRef(0);        // Touch interaction start position
  const scrollRef = useRef(null);       // Wheel event debounce management


  // Animation and interaction state tracking
  const [isAnimating, setIsAnimating] = useState(false);
  const dragThreshold = 50;  // Minimum distance for triggering slide change

   /**
   * Navigation Methods: Controlled Event Sliding
   * - Prevents multiple simultaneous animations
   * - Implements circular navigation (wrap-around)
   * - Adds animation state management
   */
  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === (events?.length || 0) - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAnimating(false), 300);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? (events?.length || 0) - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 300);
  };

  /**
   * Intelligent Visible Indices Calculation
   * @description Determines which events should be rendered based on current index
   * @returns {number[]} Indices of events to display, supporting circular navigation
   */
  const getVisibleIndices = (currentIdx, totalLength) => {
    const indices = [];
    for (let i = -1; i <= 1; i++) {
      let index = currentIdx + i;
      while (index < 0) index += totalLength;
      while (index >= totalLength) index -= totalLength;
      indices.push(index);
    }
    return indices;
  };

  // Detailed interaction handlers: mouse, touch, and wheel events
  // Implementing multi-input strategy with consistent behavior

  /* Mouse drag start handler */
  const handleMouseDown = (e) => { 
    if (isAnimating) return;
    isDragging.current = true;
    startX.current = e.pageX;
    if (containerRef.current) {
      containerRef.current.style.cursor = "grabbing";
    }
  };

  /* Mouse drag movement handler */
  const handleMouseMove = (e) => {
    if (!isDragging.current || isAnimating) return;
    e.preventDefault();
    const currentX = e.pageX;
    const diff = startX.current - currentX;

    if (Math.abs(diff) > dragThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      isDragging.current = false;
      startX.current = currentX;
    }
  };

  /* Mouse drag end handler */
  const handleMouseUp = () => {
    isDragging.current = false;
    if (containerRef.current) {
      containerRef.current.style.cursor = "grab";
    }
  };

  /* Touch interaction start */
  const handleTouchStart = (e) => {
    if (isAnimating) return;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (isAnimating) return;
    const touchEndX = e.touches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > dragThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      touchStartX.current = touchEndX;
    }
  };

  // Enhanced wheel event handler
  const handleWheel = (e) => {
    e.preventDefault();
    
    if (isAnimating) return;

    // Clear previous timeout
    if (scrollRef.current) {
      clearTimeout(scrollRef.current);
    }

    // Determine scroll direction
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      if (e.deltaX > 30) {
        nextSlide();
      } else if (e.deltaX < -30) {
        prevSlide();
      }
    }

    // Set a new timeout
    scrollRef.current = setTimeout(() => {
      scrollRef.current = null;
    }, 150);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => {
        container.removeEventListener('wheel', handleWheel);
      };
    }
  }, [isAnimating]);

  const getCardStyle = (visiblePosition) => {
    let translateX = 0;
    let rotateY = 0;
    let scale = 1;
    let opacity = 1;
    let zIndex = 5;
    let filter = "none";

    switch (visiblePosition) {
      case -1:
        translateX = -160;
        rotateY = 25;
        scale = 0.85;
        opacity = 0.8;
        zIndex = 2;
        filter = "saturate(0.4) brightness(0.6)";
        break;
      case 0:
        translateX = 0;
        rotateY = 0;
        scale = 1;
        opacity = 1;
        zIndex = 5;
        break;
      case 1:
        translateX = 160;
        rotateY = -25;
        scale = 0.85;
        opacity = 0.8;
        zIndex = 2;
        filter = "saturate(0.4) brightness(0.6)";
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

  const handleChangePage = (eventId, index) => {
    if (currentIndex === index) {
      navigate(`/event-details/${eventId}`);
    } else {
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    if (events?.length) {
      const timer = setInterval(nextSlide, 8000);
      return () => clearInterval(timer);
    }
  }, [events]);

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
      <div className="absolute left-1/2 top-[35%] -translate-x-1/2 -translate-y-1/2 w-full">
        <div
          ref={containerRef}
          className="relative h-[360px] w-full max-w-sm mx-auto flex items-center justify-center touch-pan-x cursor-grab"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          {visibleIndices.map((eventIndex, displayIndex) => (
            <div
              key={events[eventIndex]._id}
              className="absolute w-[280px] h-[280px] hover:cursor-pointer select-none"
              style={getCardStyle(displayIndex - 1)}
              onClick={() => handleChangePage(events[eventIndex]._id, eventIndex)}
            >
              <div className="w-full h-full rounded-lg shadow-xl overflow-hidden hover:shadow-3xl transition-shadow duration-300">
                <img
                  src={events[eventIndex]?.images?.[0] || "/no-image.jpg"}
                  alt={`Event ${eventIndex + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  draggable="false"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="absolute top-[65%] left-1/2 transform -translate-x-1/2 flex space-x-3 z-20"
        role="tablist"
      >
        {visibleIndices.map((index, displayIndex) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className="w-2 h-2 rounded-full bg-purple-300 transition-all duration-300"
            style={getDotStyle(displayIndex - 1)}
            role="tab"
            aria-selected={index === currentIndex}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

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
              onClick={() => navigate(`/event-details/${events[currentIndex]._id}`)}
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