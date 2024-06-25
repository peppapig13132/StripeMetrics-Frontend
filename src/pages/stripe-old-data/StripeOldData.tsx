import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import React, { useEffect, useRef, useState } from 'react';
import { setAuthToken } from '../../utils/setAuthToken';
import { createStripeOldData, getStripeOldData } from '../../services/stripeOldDataApiService';
import moment from 'moment';
import { StripeOldDataRow } from '../../interfaces/interface';
import { Heroicon } from '../../components/heroicon/Heroicon';
import toast, { Toaster } from 'react-hot-toast';

export const StripeOldData: React.FC = () => {
  const { token, appLogout } = useAuth();
  const monthsRef = useRef([
    '--',
    '2024-06',
    '2024-05',
    '2024-04',
    '2024-03',
    '2024-02',
    '2024-01',
    '2023-12',
    '2023-11',
    '2023-10',
    '2023-09',
    '2023-08',
    '2023-07',
    '2023-06',
    '2023-05',
    '2023-04',
    '2023-03',
    '2023-02',
    '2023-01',
  ]);
  const months = monthsRef.current;
  const [availableMonths, setAvailableMonths] = useState<string[]>(months);
  const [stripeOldDataStatus, setStripeOldDataStatus] = useState<StripeOldDataRow[] | []>([]);
  const [month, setMonth] = useState('--');
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleAvailableMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(event.target.value);
  };

  const handleClick = async () => {
    setDisabled(true);
    if(month === '--') {
      toast("Select a month!", {
        icon: '📅',
      });
      return;
    }

    toast('Connecting to Stripe, wait a minute.', {
      icon: '⏳',
    });

    try {
      const response = await createStripeOldData(month + '-01');
      if(response.ok) {
        toast.success('Stripe data stored on your database!');
        setStripeOldDataStatus([...stripeOldDataStatus, response.result]);

        const updatedMonths = availableMonths.filter(m => m !== month);
        setAvailableMonths(updatedMonths);
        setDisabled(false);
      }
    } catch(error) {
      console.log('Error creating Stripe old data:', error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setAuthToken(token);

      try {
        const response = await getStripeOldData();
        if(response.ok) {
          const stripeOldData: StripeOldDataRow[] = response.stripe_old_data;
          setStripeOldDataStatus(stripeOldData);

          const givenMonths = stripeOldData.map((row: StripeOldDataRow) => (
            row.active_customer_counts && row.daily_active_subscription_counts && row.daily_sums ?
            row.date.slice(0, 7) :
            null
          ));

          const updatedMonths = months.filter(m => !givenMonths.includes(m));
          setAvailableMonths(updatedMonths);
        }
      } catch(error) {
        console.error('Error fetching Stripe old data:', error);
      }
    }

    fetchData();
  }, [token, months]);

  return(
    <>
      <div className="bg-slate-200 w-full">
        <div className="dashboard container mx-auto w-full min-h-screen p-8">
          <div className="dashboard__header p-2 flex flex-col md:flex-row">
            <div className="flex items-end">
              <h2 className="font-bold text-3xl text-sky-600">Stripe old data</h2>
              <Link to="/dashboard">
                <button className='ms-2 px-[5px] py-[1px] text-xs rounded-md text-slate-200 bg-red-600 border border-red-600 hover:text-slate-700 hover:bg-red-300 hover:border-red-400'>Back to Dashboard</button>
              </Link>
            </div>
            <div className="w-full max-w-[300px] mt-3 lg:mt-0 ms-auto flex flex-row items-center justify-end align-center">
              <button onClick={appLogout} className='bg-slate-300 hover:bg-sky-600 ms-3 px-2 py-2 text-sm leading-5 rounded-md font-semibold text-sky-600 hover:text-white border border-slate-300 hover:border-slate-300'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                </svg>
              </button>
            </div>
          </div>

          <div className="dashboard__body">
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse bg-slate-50">
                <thead>
                  <tr>
                    <th className="border border-slate-300 px-2 py-1">Month</th>
                    <th className="border border-slate-300 px-2 py-1">Active Customers</th>
                    <th className="border border-slate-300 px-2 py-1">Active Subscriptions</th>
                    <th className="border border-slate-300 px-2 py-1">MRR Movements</th>
                    <th className="border border-slate-300 px-2 py-1">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    (stripeOldDataStatus.length > 0) ? (
                      stripeOldDataStatus.map((row, index) => {
                        const monthToDisplay = moment(row.date).format('MM/YYYY')
                        return(
                          <tr key={index}>
                            <td className="border border-slate-300 px-2 py-1 text-center">
                              {monthToDisplay}
                            </td>
                            <td className="border border-slate-300 px-2 py-1 align-center">
                              {row.active_customer_counts ? <div className="flex justify-center"><Heroicon icon="check" /></div> : ''}
                            </td>
                            <td className="border border-slate-300 px-2 py-1 align-center">
                              {row.daily_active_subscription_counts ? <div className="flex justify-center"><Heroicon icon="check" /></div> : ''}
                            </td>
                            <td className="border border-slate-300 px-2 py-1 align-center">
                              {row.daily_sums ? <div className="flex justify-center"><Heroicon icon="check" /></div> : ''}
                            </td>
                            <td className="border border-slate-300 px-2 py-1 align-center">
                              {row.active_customer_counts && row.daily_active_subscription_counts && row.daily_sums ? <div className="flex justify-center"><Heroicon icon="check" /></div> : ''}
                            </td>
                          </tr>
                        );
                      })
                    ) : (<tr><td colSpan={6} className="border border-slate-300 px-2 py-1 text-center">No data</td></tr>)
                  }
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex items-center justify-end">
              <select value={month} onChange={handleAvailableMonthChange} className="c-month-picker mx-1 px-2 py-1 rounded bg-slate-50 border border-slate-400">
                {availableMonths.map((m, index) => {
                  const monthToDisplay = m === '--' ? '--' : moment(m).format('MM/YYYY');
                  return(
                    <option key={index} value={m}>
                      {monthToDisplay}
                    </option>
                  );
                })}
              </select>
              <button onClick={handleClick} className="h-8 bg-slate-300 hover:bg-sky-600 disabled:bg-slate-300 ms-3 px-2 py-1 leading-5 rounded-md font-semibold text-sky-600 hover:text-white disabled:text-sky-600 disabled:cursor-not-allowed border border-slate-300 hover:border-slate-300" disabled={disabled}>Get old data</button>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}