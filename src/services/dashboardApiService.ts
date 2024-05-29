import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const DASHBOARD_API_URL_PREFIX = API_URL + '/stripe';

export const getMrrData = async () => {
  try {
    const data = {};
    const url = API_URL + '/stripe/monthly-recurring-revenue';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
    const url = DASHBOARD_API_URL_PREFIX + '/count-new-subscriptions';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
    const url = DASHBOARD_API_URL_PREFIX + '/mrr-movements';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: data,
      url,
    }

    const response = await axios(options);

    return response.data;
  } catch(error) {
    console.error('Error fetching MRR movements data:', error);
  }
}

export const getAverageStaying = async () => {
  try {
    const data = {};
    const url = DASHBOARD_API_URL_PREFIX + '/average-staying';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: data,
      url,
    }

    const response = await axios(options);

    return response.data;
  } catch(error) {
    console.error('Error fetching Average Staying data:', error);
  }
}