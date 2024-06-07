import axios from 'axios';
import { DateRange } from '../interfaces/interface';

const API_URL = process.env.REACT_APP_API_URL;
const DASHBOARD_API_URL_PREFIX = API_URL + '/stripe';

export const getMrrData = async (dateRange: DateRange) => {
  try {
    const data = {
      start_date: dateRange.startDate,
      end_date: dateRange.endDate,
    };
    const url = DASHBOARD_API_URL_PREFIX + '/monthly-recurring-revenue';
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

export const getMrrMovementsData = async (dateRange: DateRange) => {
  try {
    const data = {
      start_date: dateRange.startDate,
      end_date: dateRange.endDate,
    };
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

export const getAverageStaying = async (dateRange: DateRange) => {
  try {
    const data = {
      start_date: dateRange.startDate,
      end_date: dateRange.endDate,
    };
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

export const getCustomerLifetimeValue = async () => {
  try {
    const data = {};
    const url = DASHBOARD_API_URL_PREFIX + '/customer-lifetime-value';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: data,
      url,
    }

    const response = await axios(options);

    return response.data;
  } catch(error) {
    console.error('Error fetching Free To Paid Subscriptions data:', error);
  }
}

export const getCustomerChurnRate = async (dateRange: DateRange) => {
  try {
    const data = {
      start_date: dateRange.startDate,
      end_date: dateRange.endDate,
    };
    const url = DASHBOARD_API_URL_PREFIX + '/customer-churn-rate';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: data,
      url,
    }

    const response = await axios(options);

    return response.data;
  } catch(error) {
    console.error('Error fetching Free To Paid Subscriptions data:', error);
  }
}

export const getFreeToPaidSubscriptions = async (dateRange: DateRange) => {
  try {
    const data = {
      start_date: dateRange.startDate,
      end_date: dateRange.endDate,
    };
    const url = DASHBOARD_API_URL_PREFIX + '/free-to-paid-subscriptions';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: data,
      url,
    }

    const response = await axios(options);

    return response.data;
  } catch(error) {
    console.error('Error fetching Free To Paid Subscriptions data:', error);
  }
}

export const getFreeTrials = async (dateRange: DateRange) => {
  try {
    const data = {
      start_date: dateRange.startDate,
      end_date: dateRange.endDate,
    };
    const url = DASHBOARD_API_URL_PREFIX + '/free-trials';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: data,
      url,
    }

    const response = await axios(options);

    return response.data;
  } catch(error) {
    console.error('Error fetching Free Trials data:', error);
  }
}