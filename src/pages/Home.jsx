import React, { useEffect, useState, useContext } from "react";
import NavBar from "../components/ToolsC/NavBar";
import ThisWeek from "../components/Home/LocateSpot";
import AllEvents from "../components/Home/AllEvents";
import MainEvents from "../components/Home/MainEvents";
import MaineEventsMobile from '../components/Home/MainEventsMobile'
import Footer from "../components/Home/Footer";
import { findAllEvents } from "../services/events.service";
import UpcomingEvents from "../components/Home/UpcomingEvents";
import { AuthContext } from "../context/auth.context";
import LocateSpot from "../components/Home/LocateSpot";

const Home = () => {
  const [events, setEvents] = useState(null);
  const { isLoggedIn } = useContext(AuthContext);
  // console.log("🚀 ~ Home ~ isLoggedIn:", isLoggedIn);

  const [deviceWidth, setDeviceWidth] = useState(null)

  window.addEventListener('resize', () => {
    let width = window.document.body.getBoundingClientRect().width
    setDeviceWidth(width)
  })



  const getAllEvents = async () => {
    try {
      const response = await findAllEvents();
      if (response.success) {
        setEvents(response.events);
      }
      // console.log("findAllEvents:", response);
    } catch (error) {
      console.error("FindAllEvents - Error:", error.response);
    }
  };

  useEffect(() => {
    getAllEvents();

    let width = window.document.body.getBoundingClientRect().width
    setDeviceWidth(width)

  }, []);

  return (
    <div className="homepage-container">
      {/* <h1 className="become-promoter">Become a promoter</h1> */}
      <NavBar />

      {

        deviceWidth > 1000 ? 

        <MainEvents events={events} />

        : 

        <MaineEventsMobile events={events}  />
        
      }

      <UpcomingEvents events={events} />
      <LocateSpot events={events} />

      <Footer />
    </div>
  );
};

export default Home;
