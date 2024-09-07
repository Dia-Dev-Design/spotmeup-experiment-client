import "./App.css";
import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import EventDetails from "./pages/EventDetails.jsx";
import BuyTickets from "./pages/BuyTickets.jsx";
import Approved from "./pages/Approved.jsx";
import ScanningTool from "./pages/ScanningTool.jsx";
import MustLogin from "./components/LogInC/MustLogin.jsx";
import { NavItem } from "react-bootstrap";
import TicketsPage from "./pages/TicketsPage.jsx";

const SignUp = lazy(() => import("./pages/SignUp"));
const LogIn = lazy(() => import("./pages/LogIn"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Profile = lazy(() => import("./pages/Profile"));
const MyEvents = lazy(() => import("./pages/MyEvents"));
const AdminVenueDetail = lazy(() => import("./pages/AdminVenueDetail"));
const DesignPage = lazy(() => import("./pages/DesignPage"));
const DesignBreakDown = lazy(() => import("./pages/DesignBreakDown"));
const BDTickets = lazy(() => import("./components/BreakDown/BDTickets"));
const EventBreakDown = lazy(() => import("./pages/EventBreakDown.jsx"));

function App() {
  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  const NotLoggedIn = () => {
    return !getToken() ? <Navigate to="/must-login" /> : <Outlet />;
  };

  const RequireAuth = () => {
    const getToken = () => {
      // console.log("Token:" localStorage.getItem("authToken"));
      return localStorage.getItem("authToken");
    };

    return getToken() ? <Outlet /> : <Navigate to="/must-login" />;
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
    
      <Routes>

        <Route element={<NotLoggedIn />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="/must-login" element={<MustLogin />} />

        <Route element={<RequireAuth />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/myevents" element={<MyEvents />} />
          <Route
            path="/admin/venuedetails/:venueIdParam"
            element={<AdminVenueDetail />}
          />
          <Route
            path="/admin/designpage/:layoutIdParam"
            element={<DesignPage />}
          />
          <Route
            path="/admin/designpage/:layoutIdParam/:blockIdParam"
            element={<DesignPage />}
          />
          <Route
            path="/admin/designpage/:layoutIdParam/breakdown"
            element={<DesignBreakDown />}
          />
          <Route
            path="/admin/designpage/EventBreakDown/:eventIdParam/:layoutIdParam"
            element={<EventBreakDown />}
          />
          <Route
            path="/event-details/:eventIdParam"
            element={<EventDetails />}
          />
          <Route path="/event-tickets/:eventIdParam" element={<BuyTickets />} />

          <Route
            path="/approved/:eventIdParam/:transactionIdParam"
            element={<Approved />}
          />
          <Route
            path="/view-tickets"
            element={<TicketsPage />}
          />
        </Route>

        <Route path="/scannig-tool/:eventIdParam" element={<ScanningTool />} />
      </Routes>
    </Suspense>
  );
}

export default App;
