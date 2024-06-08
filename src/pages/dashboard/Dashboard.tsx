import React, { useEffect } from 'react';
import {useState} from 'react'; 
import Datepicker from 'react-tailwindcss-datepicker';
import { MontlyRecurringRevenue } from '../../components/monthly-recurring-revenue/MontlyRecurringRevenue';
import { MrrMovements } from '../../components/mrr-movements/MrrMovements';
import { LastSubscribers } from '../../components/last-subscribers/LastSubscribers';
import { AverageStaying } from '../../components/average-staying/AverageStaying';
import { CustomerLifetimeValue } from '../../components/customer-lifetime-value/CustomerLifetimeValue';
import { CustomerChurnRate } from '../../components/customer-churn-rate/CustomerChurnRate';
import { FreeToPaidSubscriptions } from '../../components/free-to-paid-subscriptions/FreeToPaidSubscriptions';
import { FreeTrials } from '../../components/free-trials/FreeTrials';
import { AnnualRunRate } from '../../components/annual-run-rate/AnnualRunRate';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { defaultDateRange, useDashboard } from '../../context/DashboardContext';
import { DateRange } from '../../interfaces/interface';

export const Dashboard: React.FC = () => {
  const [value, setValue] = useState<DateRange>(defaultDateRange);
  
  const handleValueChange = (newValue: any) => {
    setValue(newValue);
    updateDateRange({
      startDate: newValue.startDate === null ? defaultDateRange.startDate : newValue.startDate,
      endDate: newValue.endDate === null ? defaultDateRange.endDate : newValue.endDate
    });
  }

  const { appLogout } = useAuth();
  const { dateRange, updateDateRange } = useDashboard();

  useEffect(() => {
    setValue({
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    });
  }, [dateRange]);

  return(
    <div className="bg-slate-200 w-full">
      <div className="dashboard container mx-auto w-full min-h-screen p-8">
        <div className="dashboard__header p-2 flex flex-col lg:flex-row">
          <div className="flex items-end">
            <h2 className="font-bold text-3xl text-sky-600">Dashboard</h2>
            <Link to="/stripe-old-data">
              <button className='ms-2 px-[5px] py-[1px] text-xs rounded-md text-slate-200 bg-red-600 border border-red-600 hover:text-slate-700 hover:bg-red-300 hover:border-red-400'>Get old data</button>
            </Link>
          </div>
          <div className="w-full lg:max-w-[320px] mt-3 lg:mt-0 ms-auto flex flex-row items-center justify-center align-center">
            <Datepicker
              value={value} 
              onChange={handleValueChange} 
            />

            <button onClick={appLogout} className="bg-slate-300 hover:bg-sky-600 ms-3 px-2 py-2 text-sm leading-5 rounded-md font-semibold text-sky-600 hover:text-white border border-slate-300 hover:border-slate-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
              </svg>
            </button>
          </div>
        </div>

        <div className="dashboard__body flex flex-col">
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/3 px-1.5 py-3">
              <MontlyRecurringRevenue />
            </div>
            <div className="w-full lg:w-1/3 px-1.5 py-3">
              <LastSubscribers />
            </div>
            <div className="w-full lg:w-1/3 px-1.5 py-3">
              <MrrMovements />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/3 px-1.5 py-3">
              <AverageStaying />
            </div>
            <div className="w-full lg:w-1/3 px-1.5 py-3">
              <CustomerLifetimeValue />
            </div>
            <div className="w-full lg:w-1/3 px-1.5 py-3">
              <CustomerChurnRate />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/3 px-1.5 py-3">
              <FreeToPaidSubscriptions />
            </div>
            <div className="w-full lg:w-1/3 px-1.5 py-3">
              <FreeTrials />
            </div>
            <div className="w-full lg:w-1/3 px-1.5 py-3">
              <AnnualRunRate />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}