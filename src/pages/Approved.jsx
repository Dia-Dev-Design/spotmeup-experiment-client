import React, { useEffect, useContext, useState } from "react";
import { findEvent } from "../services/events.service";
import { TicketsContext } from "../context/tickets.context";
import { useParams } from "react-router-dom";
import { QRCode } from "react-qrcode-logo";
import QrScanner from "react-qr-scanner";
import { findTransaction } from "../services/transaction.service";
import { createTicket } from "../services/ticket.service";
import { getAllTicketInTransaction } from "../services/ticket.service";
import { sendEmailTickets } from "../services/ticket.service";
import { updateValidationStatus } from "../services/validation.service";

const Approved = () => {
  const param = useParams();

  const { ticketsCart } = useContext(TicketsContext);

  // const [event, setEvent] = useState(null);
  // const [transaction, setTransaction] = useState(null);
  const [transaction, setTransaction] = useState(null)
  const [transactionId, setTransactionId] = useState('')

  const [tickets, setTickets] = useState([]);
  
  
  
  const [emailSuccess, setEmailSuccess] = useState(null);
  const [emailFailed, setEmailFailed] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  
  const [scanResult, setScanResult] = useState("");
  const [ticketsCreated, setticketsCreated] = useState(false);
  const [ticketsToCreate, setTicketsToCreate] = useState(0);
  const [ableToGenerate, setAbleToGenerate] = useState(false);
  //   console.log("🚀 ~ Approved ~ ticketsCart:", ticketsCart);

  //   console.log("eventIdParam:", param.eventIdParam);

  

  const generateTickets = async () => {

    try {
      const thisEvent = await findEvent(param.eventIdParam);

      // const thisTransaction = await findTransaction(param.transactionIdParam);

      // console.log("This is the transaction!!!!", thisTransaction, thisEvent);

      // let theseTickets = await getAllTicketInTransaction(param.transactionIdParam);

      let ticketsallTickets

      if (transactionId) {

        ticketsallTickets = await Promise.allSettled(
            transaction.items.map((ticket) => {
              return createTicket({
                name: ticket?.name,
                eventDate: thisEvent.event?.date,
                eventTime: thisEvent.event?.time,
                price: ticket.price,
                status: "active",
                event: param.eventIdParam,
                layout: thisEvent.event?.layout._id,
                block: ticket.hasTables ? ticket.blockId : ticket.id,
                transaction: transaction._id,
                email: transaction.email,
              });
            })
          );



          console.log(
            "these are all of the tickets.........,",
            // theseTickets,
            ticketsallTickets
          );
    
          let validated = await updateValidationStatus(param.transactionIdParam);
    
          console.log("Are we validated =====>", validated);
    
          if (validated.success) {
            console.log("These are the tickets on 81", ticketsallTickets)

            let fulfilledTickets = ticketsallTickets.filter((ticket) => ticket.status === "fulfilled")

            setTickets(fulfilledTickets.map((result) => result.value.ticket));
            console.log("All tickets are valid");
          } else {
            console.log("Unable To Process Transactions");
          }


      }

    

    } catch (error) {
      console.log(error);
    }

    //         const ticketObject = {
    //           name: item?.name,
    //           eventDate: event?.date,
    //           eventTime: event?.time,
    //           price: item.price,
    //           status: "active",
    //           event: param.eventIdParam,
    //           layout: event?.layout._id,
    //           block: item.hasTables ? item.blockId : item.id,
    //           transaction: transaction._id,
    //           email: transaction.email,
    //         }
  };

  // const findTicketInTransaction = async () => {
  //   try {
  //     const response = await getAllTicketInTransaction(
  //       param.transactionIdParam
  //     );
  //     if (response.success) {
  //       if (response.tickets.length > 0) {
  //         setTickets(response.tickets);
  //         console.log("These are the tickets =====>", response.tickets.length, response.tickets)
  //         setAbleToGenerate(false);
  //         // setticketsCreated(true);
  //         // if (ticketsCreated) {
  //         try {
  //           const response = await updateValidationStatus(
  //             param.transactionIdParam
  //           );

  //           if (response.success) {
  //             console.log("Validation Updated:", response.validation);
  //           }
  //         } catch (error) {
  //           console.error("Validation Error:", error.response);
  //         }
  //         // }
  //         console.log(
  //           `There are ${response.tickets.length} tickets already created`
  //         );
  //       } else {
  //         setAbleToGenerate(true);
  //       }
  //       console.log("GetAllTicketsInTransaction - Success:", response.tickets);
  //     }
  //   } catch (error) {
  //     console.error("GetAllTicketsInTransaction - Error:", error.response);
  //   }
  // };

  // const createTickets = async (completedItems, transaction) => {

  //   console.log("This is line 80, Completed Items ^^^^^^^^^?", completedItems)

  //   // console.log(`Table #1 ${transaction} - Table #1 ${event}`, transaction, event)
  //   // if (!transaction || !event) return;

  //   try {
  //     for (const item of completedItems) {
  //       console.log("these are the the items =====>", transaction.items)

  //         const ticketObject = {
  //           name: item?.name,
  //           eventDate: event?.date,
  //           eventTime: event?.time,
  //           price: item.price,
  //           status: "active",
  //           event: param.eventIdParam,
  //           layout: event?.layout._id,
  //           block: item.hasTables ? item.blockId : item.id,
  //           transaction: transaction._id,
  //           email: transaction.email,
  //         }
  //         console.log("This is for table one++++++++>", ticketObject)

  //         console.log("Creating the specific Ticket")
  //         let thisTickets = await createTicket(ticketObject);
  //         setTickets([...tickets, thisTickets])
  //         await receiveEmail();
  //         console.log("Ticket creado:", ticketObject);
  //       }
  //     }

  //    catch (error) {
  //     console.error("Error creating tickets:", error);
  //   }
  // }

  // const getTransaction = async () => {
  //   try {
  //     const response = await findTransaction(param.transactionIdParam);
  //     if (response.success) {
  //       createTickets(response.transaction.items, response.transaction)
  //     }
  //     console.log("Get Transaction:", response);
  //   } catch (error) {
  //     console.error("response.error.transaction:", error.response);
  //   }
  // };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    let hours12 = parseInt(hours, 10);
    const period = hours12 >= 12 ? "PM" : "AM";
    hours12 = hours12 % 12 || 12;
    return `${hours12}:${minutes} ${period}`;
  };

  const searchParams = new URLSearchParams(window.location.search);

  const amountValue = searchParams.get("Amount");

  const response = searchParams.get("ResponseMessage");

  const formatNumberWithCommas = (number) => {
    const integerPart = Math.floor(number / 100).toString();
    return integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleScan = (data) => {
    if (data) {
      setScanResult(data.text);
      setCameraActive(false);

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      if (navigator.vibrate) {
        navigator.vibrate(200);
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const videoConstraints = {
    facingMode: "environment",
  };



  const receiveEmail = async () => {
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

  //   const ticketObjectJson = JSON.stringify(ticketObject);

  //   console.log("TheEvent:", event);

  const handleCameraToggle = () => {
    setCameraActive((prev) => !prev);

    if (!cameraActive) {
      // Iniciar un temporizador de 30 segundos para apagar la cámara
      const id = setTimeout(() => {
        setCameraActive(false);
      }, 30000); // 30 segundos

      setTimeoutId(id);
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }
    }
  };

  // useEffect(() => {
  //   if (transaction?.items?.length) {
  //     if (ableToGenerate) {
  //       console.log("Running The Entire Loop")
  //       createTickets();
  //     }
  //   }
  // }, [ableToGenerate, ticketsToCreate]);



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

  const getTransaction = async () => {

    let foundTransaction = await findTransaction(param.transactionIdParam)

    console.log("This is the found transaction line 323", foundTransaction)

    setTransaction(foundTransaction.transaction)
    setTransactionId(foundTransaction.transaction._id)

  }

  // console.log("tickets:", tickets);

  useEffect(() => {
    
    if (!transaction) {
      getTransaction()
    }

    if (transactionId && transaction && !transaction.tickets?.length) {
      console.log("This is the transaction ID line 337", transactionId)
      generateTickets();
    } else {
      setTickets(transaction?.tickets)
    }

  }, [transactionId]);

  return (
    <div>
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
              {    
                tickets?.map((ticket, index) => (
                <div key={ticket?._id}>
                  <span className="qr-seperator"></span>
                  <QRCode
                    value={ticket?.qrCode}
                    key={index}
                    className="qr-code-approved"
                  />
                  <h1 className="ticket-name-qr">{ticket?.name}</h1>
                  <span className="qr-seperator"></span>
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
          <h1>$RD {formatNumberWithCommas(amountValue)}</h1>
        </div>
      </div>
      {emailSuccess && <h2 className="email-sucess">{emailSuccess}</h2>}
      {emailFailed && (
        <div className="resend-email-failed">
          <h2 className="email-failed">{emailFailed}</h2>
          <button onClick={handleResendEmail}>Resend</button>
        </div>
      )}
    </div>
  );
};

export default Approved;
