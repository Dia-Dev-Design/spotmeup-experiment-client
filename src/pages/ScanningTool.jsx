import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findEvent } from "../services/events.service";
import QrScanner from "react-qr-scanner";
import { findQrCodeTicket } from "../services/ticket.service";

const ScanningTool = () => {
  const param = useParams();
  const [event, setEvent] = useState(null);
  const [scanResult, setScanResult] = useState("");
  const [cameraActive, setCameraActive] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFindEvent = async () => {
    try {
      const response = await findEvent(param.eventIdParam);
      if (response.success) {
        console.log("Find Event - Success:", response.event);
        setEvent(response.event);
      }
    } catch (error) {
      console.log("Find Event - Error:", error.response);
    }
  };

  const findTickets = async (eventId, theCode) => {
    try {
      const response = await findQrCodeTicket(eventId, theCode);

      console.log("Response Find Tickets:", response.ticketFound);
    } catch (error) {
      console.error("Find QR-Code Error:", error.response);
      setErrorMessage(error.response.data.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 30000);
    }
  };

  const handleScan = (data) => {
    if (data) {
      setScanResult(data.text);
      findTickets(param.eventIdParam, data.text);

      console.log("Scan Result Data:", data);

      setCameraActive(false);

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      if (navigator.vibrate) {
        navigator.vibrate(200);
      }
    }
  };

  const handleCameraToggle = () => {
    setCameraActive((prev) => !prev);

    if (!cameraActive) {
      const id = setTimeout(() => {
        setCameraActive(false);
        setScanResult(null);
      }, 20000);

      setTimeoutId(id);
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  setTimeout(() => {
    if (scanResult) {
      setScanResult(null);
    }
  }, 5000);

  useEffect(() => {
    handleFindEvent();
  }, [param.eventIdParam]);

  const videoConstraints = {
    facingMode: "environment",
  };

  return (
    <div className="scanning-tool-page">
      {event && (
        <div className="scanning-tool-container">
          <h1 className="scanning-page-title">{event.name}</h1>
          {cameraActive ? (
            <div className="video-camera-container">
              <QrScanner
                delay={300}
                onError={handleError}
                onScan={handleScan}
                constraints={{ video: videoConstraints }}
                className={`qr-scanner-camera ${
                  cameraActive ? "" : "qr-scanner-camera-hidden"
                }`}
              />

              <button
                onClick={handleCameraToggle}
                className={`scan-button-finished ${
                  cameraActive ? "" : "scan-button-finished-hidden"
                }`}
              >
                Finish
              </button>
            </div>
          ) : (
            <button
              onClick={handleCameraToggle}
              className={`scan-button ${
                cameraActive ? "scan-button-hidden" : ""
              }`}
            >
              Click To Scan
            </button>
          )}
        </div>
      )}
      {scanResult && (
        <div className="scan-resul-container">
          <h2 className="scan-result-key">Scan Result</h2>
          <p className="scan-result-value">{scanResult}</p>
          {errorMessage && <h1 className="scanning-error">{errorMessage}</h1>}
        </div>
      )}
    </div>
  );
};

export default ScanningTool;
