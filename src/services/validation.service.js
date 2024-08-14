import { API_URL } from "./api.service";
import axios from "axios";

export const findValidationInEvent = async (eventId) => {
  try {
    const response = await axios.get(
      `${API_URL}/validation/findInEvent/${eventId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateValidationStatus = async (transactionId) => {
  try {
    const response = await axios.put(
      `${API_URL}/validation/update-validation/${transactionId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
