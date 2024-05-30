import React from 'react';
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

export const Dashboard: React.FC = () => {
  const [value, setValue] = useState({ 
    startDate: null, 
    endDate: null,
  });
    
  const handleValueChange = (newValue: any) => {
    console.log("newValue:", newValue); 
    setValue(newValue); 
  }

  return(
    <div className="bg-slate-200 w-full">
      <div className="dashboard container mx-auto w-full min-h-screen p-8">
        <div className="dashboard__header p-2 flex flex-col lg:flex-row">
          <h2 className="font-bold text-3xl text-sky-600">Dashboard</h2>
          <div className="w-full lg:max-w-[275px] mt-3 lg:mt-0 ms-auto">
            <Datepicker
              value={value} 
              onChange={handleValueChange} 
            />
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