import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const STRIPE_OLD_DATA_API_URL_PREFIX = API_URL + '/stripe-old-data';

export const getStripeOldData = async () => {
  try {
    const data = {};
    const url = STRIPE_OLD_DATA_API_URL_PREFIX + '';
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      data: data,
      url,
    }

    const response = await axios(options);

    return response.data;
  } catch(error) {
    console.error('Error fetching Stripe Old Data:', error);
  }
}

export const createStripeOldData = async (date: string) => {
  try {
    const data = {
      date: date,
    };
    const url = STRIPE_OLD_DATA_API_URL_PREFIX + '';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: data,
      url,
    }

    const response = await axios(options);

    return response.data;
  } catch(error) {
    console.error('Error creating Stripe Old Data:', error);
  }
}
