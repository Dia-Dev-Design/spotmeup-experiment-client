import React, { useEffect } from "react";
import location1 from "../../assets/icons/location-1.png";
import location2 from "../../assets/icons/location-2.png";
import location3 from "../../assets/icons/location-3.png";
import location4 from "../../assets/icons/location-4.png";

import "swiper/css/bundle";

const LocateSpot = () => {
  return (
    <div>
      <div className="upcoming-events-title margin-top">
        <h1 className="find-your-spot">Locate A Spot</h1>
        <h1 className="browse-events">LOCATE SPOTS</h1>
      </div>

      <div className="locations-infite">
        <img src={location1} alt="spot-location-image" />
        <img src={location2} alt="spot-location-image" />
        <img src={location3} alt="spot-location-image" />
        <img src={location4} alt="spot-location-image" />
      </div>
    </div>
  );
};

export default LocateSpot;
