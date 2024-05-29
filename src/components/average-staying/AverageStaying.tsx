import { useEffect, useState } from "react";
import { setAuthToken } from "../../utils/setAuthToken";
import { useAuth } from "../../context/AuthContext";
import { getAverageStaying } from "../../services/dashboardApiService";

export const AverageStaying = () => {
  const [averageStayingLast30Days, setAverageStayingLast30Days] = useState(0);
  const [averageStayingLastMonth, setAverageStayingLastMonth] = useState(0);
  const [formattedAverageStayingLast30Days, setFormattedAverageStayingLast30Days] = useState('0');
  const [rate, setRate] = useState(0);

  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setAuthToken(token);

      const response = await getAverageStaying();

      if(response.ok) {
        setAverageStayingLast30Days(response.average_staying_last_30_days);
        setAverageStayingLastMonth(response.average_staying_last_month);
        setFormattedAverageStayingLast30Days(new Intl.NumberFormat('en-US', { style: 'decimal' }).format(response.average_staying_last_30_days));
        
        if(response.average_staying_last_month !== 0) {
          setRate(Math.round((averageStayingLast30Days - averageStayingLastMonth) / averageStayingLastMonth) * 100);
        } else {
          setRate(100);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white w-full rounded-xl p-5">
      <div className="flex flex-row">
        <h4 className="font-bold text-sky-600">Average Staying (in months)</h4>
        <span className="font-bold text-red-500 ms-auto">{rate}%</span>
      </div>

      <div className="flex flex-row mt-8">
        <span className="font-bold text-sky-600">{formattedAverageStayingLast30Days}</span>
        <span className="text-sky-600 ms-auto">Last 30 days</span>
      </div>
    </div>
  );
}