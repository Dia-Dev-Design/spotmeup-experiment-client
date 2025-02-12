import { API_URL } from "./api.service";
import axios from "axios";

export const createTicket = async (body) => {
  try {
    const response = await axios.post(`${API_URL}/ticket/create`, body);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const getAllTicketInTransaction = async (transactionId) => {
  try {
    const response = await axios.get(
      `${API_URL}/ticket/${transactionId}/transaction/find`
    );
    // console.log("getAllTickets - Service:", response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendEmailTickets = async (transactionId) => {
  try {
    const response = await axios.post(
      `${API_URL}/ticket/${transactionId}/send-email`
    );
    // console.log("getAllTickets - Service:", response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const findQrCodeTicket = async (eventId, qrCode) => {
  try {
    const response = await axios.get(
      `${API_URL}/ticket/${eventId}/${qrCode}/validate`
    );
    // console.log("getAllTickets - Service:", response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const findBoughtTicketsByUserEvent = async (userId) => {
  try {
    const response = await axios.get(
      `${API_URL}/ticket/${userId}/events/active`
    );
    // console.log("getAllTickets - Service:", response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const findTicketsTablesNumber = async (eventId) => {
  try {
    const response = await axios.get(
      `${API_URL}/ticket/event/${eventId}/sales-summary`
    );
    // console.log("getAllTickets - Service:", response);
    return response.data;
  } catch (error) {
    throw error;
  }
};
