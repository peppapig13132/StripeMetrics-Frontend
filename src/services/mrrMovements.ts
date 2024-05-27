import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

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
