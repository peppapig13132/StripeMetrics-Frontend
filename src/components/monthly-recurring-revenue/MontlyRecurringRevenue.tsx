import { useEffect, useState } from "react";
import MonthlyRecurringRevenueChart from "./MonthlyRecurringRevenueChart";
import { getMrrData } from "../../services/dashboardApiService";
import { DailySum } from "../../interfaces/interface";
import { setAuthToken } from "../../utils/setAuthToken";
import { useAuth } from "../../context/AuthContext";
import { useDashboard } from "../../context/DashboardContext";
import moment from "moment";

export const MontlyRecurringRevenue = () => {
  const [mrr, setMrr] = useState(0);
  const [formattedMrr, setFormattedMrr] = useState('$0');
  const [xData, setXData] = useState([]);
  const [yData, setYData] = useState([]);
  const [days, setDays] = useState(0);

  const { token } = useAuth();
  const { dateRange } = useDashboard();
  
  useEffect(() => {
    const fetchData = async () => {
      setAuthToken(token);

      try {
        const response = await getMrrData(dateRange);

        if(response.ok) {
          const mrr_array = response.mrr_array;
          mrr_array.sort((a: DailySum, b: DailySum) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

          const x_data = mrr_array.map((item: DailySum) => new Date(item.createdAt));
          const y_data = mrr_array.map((item: DailySum) => item.sum);

          setXData(x_data);
          setYData(y_data);
          setMrr(response.mrr);
          setFormattedMrr(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(mrr));
          setDays(moment(dateRange.endDate).diff(moment(dateRange.startDate), 'days'));
        } else {
          setXData([]);
          setYData([]);
          setMrr(0);
          setDays(0);
        }

      } catch(error) {
        console.error('Error fetching MRR data:', error);
      }
    }

    fetchData();
  }, [token, mrr, dateRange]);

  return (
    <div className="bg-white w-full rounded-xl p-5">
      <div className="flex flex-row">
        <h4 className="font-bold text-sky-600">MRR</h4>
      </div>

      <div className="flex flex-row h-[30px] pt-3">
        <span className="font-bold text-sky-600">{formattedMrr}</span>
        <span className="text-sky-600 ms-auto">{days} days</span>
      </div>

      <MonthlyRecurringRevenueChart xData={xData} yData={yData} />
    </div>
  );
}