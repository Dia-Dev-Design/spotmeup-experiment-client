import React, { useEffect, useState } from "react";
import { findEvent } from "../services/events.service";
import { useNavigate, useParams } from "react-router-dom";
import { QRCode } from "react-qrcode-logo";
import { findTransaction } from "../services/transaction.service";
import { sendEmailTickets } from "../services/ticket.service";
import NavBar from "../components/ToolsC/NavBar";

const Approved = () => {
  const param = useParams();

  const [transaction, setTransaction] = useState(null);
  const [transactionId, setTransactionId] = useState("");
  const [event, setEvent] = useState(null);
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  const [emailSuccess, setEmailSuccess] = useState(false);
  const [emailFailed, setEmailFailed] = useState(false);

  const getTransaction = async () => {
    let foundTransaction = await findTransaction(param.transactionIdParam);
    let foundEvent = await findEvent(param.eventIdParam);

    setTransaction(foundTransaction.transaction);
    console.log("Found Transaction:", foundTransaction);
    setTransactionId(foundTransaction.transaction._id);
    // const ticketsTrans = await getAllTicketInTransaction(
    //   param.transactionIdParam
    // );
    // console.log("Tickets in transaction:", ticketsTrans);
    setEvent(foundEvent.event);
  };

  const sendEmail = async () => {
    try {
      const response = await sendEmailTickets(param.transactionIdParam);
      if (response.success) {
        setEmailSuccess("Email Sent Successfully!");
        setTimeout(() => {
          setEmailSuccess(null);
        }, 5000000);
        console.log("Email Sent Successfully");
      }
    } catch (error) {
      setEmailFailed("Could not sent the email");
      setTimeout(() => {
        setEmailFailed(null);
      }, 5000000);
      console.log("Send Email - Failed:", error.response);
    }
  };

  const handleResendEmail = async () => {
    try {
      const response = await sendEmailTickets();
      if (response.success) {
        setEmailSuccess("Email Sent Successfully!");
        setTimeout(() => {
          setEmailSuccess(null);
        }, 5000);
      }
      console.log("Email Sent Successfully");
    } catch (error) {
      setEmailFailed("Could not sent the email");
      setTimeout(() => {
        setEmailFailed(null);
      }, 5000);
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    let hours12 = parseInt(hours, 10);
    const period = hours12 >= 12 ? "PM" : "AM";
    hours12 = hours12 % 12 || 12;
    return `${hours12}:${minutes} ${period}`;
  };

  const formatNumberWithCommas = (number) => {
    const integerPart = number.toFixed(2);
    return integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    if (!transaction) {
      getTransaction();
    } else {
      setTickets(transaction?.tickets);
    }
  }, [transactionId]);

  const handleViewTickets = () => {
    navigate(`/view-tickets/${param.eventIdParam}/${param.transactionIdParam}`);
  };

  // console.log("Tickets:", tickets);

  return (
    <div>
      <NavBar />
      <h1 className="approved-page">Approved Page - Summary</h1>
      <div className="approved-summary">
        <div className="summary-event-container">
          <h1 className="bold">{event?.name}</h1>
          <h1>{event?.address?.street}</h1>
          <h1>{formatTime(event?.time)}</h1>
        </div>
        <div
          className={
            tickets?.length <= 2 ? "qr-code-container-two" : "qr-code-container"
          }
        >
          {tickets?.length ? (
            <>
              {tickets?.map((ticket, index) => (
                <div key={ticket?._id} className="qr-code-container-border">
                  {/* <span className="qr-seperator"></span> */}
                  <QRCode
                    value={ticket?.qrCode}
                    key={index}
                    className="qr-code-approved"
                  />
                  <h1 className="ticket-name-qr">
                    {ticket?.name} - #{index + 1}
                  </h1>
                  {/* <span className="qr-seperator"></span> */}
                </div>
              ))}
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        <div className="approved-description">
          <h1>Items:</h1>
          <h1>{tickets?.length}</h1>
        </div>
        <div className="approved-description">
          <h1>Pagaste:</h1>
          {transaction && (
            <h1>$RD {formatNumberWithCommas(transaction.total)}</h1>
          )}
        </div>
      </div>
      <div className="view-tickets-prompt">
        {/* <button onClick={() => sendEmail()}>Send Tickets To Email</button> */}
        <button onClick={handleViewTickets}>View My Tickets</button>
      </div>
      {emailSuccess && <h2 className="email-sucess">{emailSuccess}</h2>}
      {emailFailed && (
        <div className="resend-email-failed">
          <h2 className="email-failed">{emailFailed}</h2>
          <button onClick={() => handleResendEmail()}>Resend</button>
        </div>
      )}
    </div>
  );
};

export default Approved;
