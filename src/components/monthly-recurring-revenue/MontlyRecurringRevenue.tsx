import { useEffect, useState } from "react";
import MonthlyRecurringRevenueChart from "./MonthlyRecurringRevenueChart";
import { getMrrData } from "../../services/mrrService";
import { DailySum } from "../../interfaces/interface";
import { setAuthToken } from "../../utils/setAuthToken";
import { useAuth } from "../../context/AuthContext";

export const MontlyRecurringRevenue = () => {
  const [mrr30Days, setMrr30Days] = useState(0);
  const [mrrLastMonth, setMrrLastMonth] = useState(0);
  const [rate, setRate] = useState(0);
  const [formattedMrr30Days, setFormattedMrr30Days] = useState('$0');
  const [xData, setXData] = useState([]);
  const [yData, setYData] = useState([]);

  const { token } = useAuth();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setAuthToken(token);

        const response = await getMrrData();

        if(response.ok) {
          const mrr_data = response.mrr_data;
          mrr_data.sort((a: DailySum, b: DailySum) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

          const x_data = mrr_data.map((item: DailySum) => new Date(item.createdAt));
          const y_data = mrr_data.map((item: DailySum) => item.sum);

          setXData(x_data);
          setYData(y_data);
          setMrr30Days(response.mrr_last_30days);
          setMrrLastMonth(response.mrr_last_month);
          if(mrrLastMonth !== 0) {
            setRate(Math.floor((mrr30Days - mrrLastMonth) / mrrLastMonth) / 100);
          } else {
            setRate(100);
          }
          setFormattedMrr30Days(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(mrr30Days));
        } else {
          setXData([]);
          setYData([]);
          setMrr30Days(0);
          setMrrLastMonth(0);
          setRate(0);
        }

      } catch(error) {
        console.error('Error fetching MRR data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="bg-white w-full rounded-xl p-5">
      <div className="flex flex-row">
        <h4 className="font-bold text-sky-600">MRR</h4>
        <span className="font-bold text-red-500 ms-auto">{rate}%</span>
      </div>

      <div className="flex flex-row h-50 pt-4">
        <span className="font-bold text-sky-600">{formattedMrr30Days}</span>
        <span className="text-sky-600 ms-auto">Last 30 days</span>
      </div>

      <MonthlyRecurringRevenueChart xData={xData} yData={yData} />
    </div>
  );
}