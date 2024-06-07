import { useEffect, useState } from "react";
import { getMrrData } from "../../services/dashboardApiService";
import { DailySum } from "../../interfaces/interface";
import { setAuthToken } from "../../utils/setAuthToken";
import { useAuth } from "../../context/AuthContext";
import { useDashboard } from "../../context/DashboardContext";

export const AnnualRunRate = () => {
  const [mrr30Days, setMrr30Days] = useState(0);
  const [mrrLastMonth, setMrrLastMonth] = useState(0);
  const [rate, setRate] = useState(0);
  const [formattedAnnualRunRate30Days, setFormattedAnnualRunRate30Days] = useState('$0');

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
          
          setMrr30Days(response.mrr_last_30days);
          setMrrLastMonth(response.mrr_last_month);

          if(mrrLastMonth !== 0) {
            setRate(Math.round((mrr30Days - mrrLastMonth) / mrrLastMonth * 10000) / 100);
          } else {
            setRate(100);
          }
          setFormattedAnnualRunRate30Days(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(mrr30Days * 12));
        } else {
          setMrr30Days(0);
          setMrrLastMonth(0);
          setRate(0);
        }

      } catch(error) {
        console.error('Error fetching MRR data:', error);
      }
    }

    fetchData();
  }, [token, mrr30Days, mrrLastMonth, dateRange]);

  return (
    <div className="bg-white w-full rounded-xl p-5">
      <div className="flex flex-row">
        <h4 className="font-bold text-sky-600">Annual Run Rate</h4>
        <span className="font-bold text-red-500 ms-auto">{rate}%</span>
      </div>

      <div className="flex flex-row mt-8">
        <span className="font-bold text-sky-600">{formattedAnnualRunRate30Days}</span>
        <span className="text-sky-600 ms-auto">Last 30 days</span>
      </div>
    </div>
  );
}