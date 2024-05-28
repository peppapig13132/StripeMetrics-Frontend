import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getMrrData = async () => {
  try {
    const data = {};
    const url = API_URL + "/stripe/monthly-recurring-revenue";
    const options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      data: data,
      url,
    }

    const response = await axios(options);

    return response.data;
  } catch(error) {
    console.error('Error fetching MRR data:', error);
  }
}

export const getSubscribers = async () => {
  try {
    const data = {};
    const url = API_URL + "/stripe/count-new-subscriptions";
    const options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      data: data,
      url,
    }

    const response = await axios(options);

    return response.data;
  } catch(error) {
    console.error('Error fetching Subscribers data:', error);
  }
}

export const getMrrMovementsData = async () => {
  try {
    const data = {};
    const url = API_URL + "/stripe/mrr-movements";
    const options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      data: data,
      url,
    }

    const response = await axios(options);

    return response.data;
  } catch(error) {
    console.error('Error fetching MRR movements data:', error);
  }
}

