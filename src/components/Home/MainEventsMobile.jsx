import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MainEventsMobile = ({events}) => {

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
  
      switch (visiblePosition) {
        case -2: // Leftmost card
          translateX = -400;
          rotateY = 45; // Rotate right side toward viewer
          scale = 0.8; // Reduce size
          opacity = 0.6; // Partially fade out
          zIndex = 1; // Place behind other cards
          break;
        case -1: // Left card
          translateX = -200;
          rotateY = 25; // Slight rotation
          scale = 0.9;
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
          translateX = 200;
          rotateY = -25;
          scale = 0.9;
          opacity = 0.8;
          zIndex = 2;
          break;
        case 2: // Rightmost card
          translateX = 400;
          rotateY = -45;
          scale = 0.8;
          opacity = 0.6;
          zIndex = 1;
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
    <div className="h-[547px] flex-col justify-start items-center gap-6 inline-flex">
      <div className="flex-col justify-start items-center gap-8 flex">
        <div className="w-[736px] h-[360px] relative" >


{/* corresponds to event images map */}


        </div>
        <div className="w-[106px] justify-between items-center inline-flex">
          <div className="rounded-3xl justify-start items-start gap-2 flex">
            <div className="w-2 h-2 relative">
              <div className="w-2 h-2 left-0 top-0 absolute bg-[#efefef] rounded-[20px]" />
            </div>
            <div className="w-3 h-2 relative">
              <div className="w-3 h-2 left-0 top-0 absolute bg-[#d4af37] rounded-[20px]" />
            </div>
            <div className="w-2 h-2 relative">
              <div className="w-2 h-2 left-0 top-0 absolute bg-[#efefef] rounded-[20px]" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex-col justify-start items-center gap-4 flex">
        <div className="self-stretch h-[57px] flex-col justify-start items-center gap-1 flex">
          <div className="text-white text-2xl font-bold font-['Space Grotesk']">
            Thursday Shenanigans
          </div>
          <div className="self-stretch text-center text-white text-base font-normal font-['Archivo'] leading-snug">
            30 October, Friday • 10:00 PM
          </div>
        </div>

        <button
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-full font-semibold transition-colors"
              onClick={() =>
                navigate(`/event-details/${events[currentIndex]._id}`)
              }
            >
              Reserve Now
            </button>


        {/* <div className="justify-start items-start inline-flex">
          <div className="p-4 bg-[#d4af37] rounded-[48px] shadow justify-center items-center gap-4 flex">
            <div className="text-center text-black text-sm font-bold font-['Space Grotesk'] uppercase">
              Reserve Spots
            </div>
          </div>
        </div> */}


      </div>
    </div>
  );
};

export default MainEventsMobile;
