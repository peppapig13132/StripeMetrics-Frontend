import { useEffect, useState } from "react";
import { setAuthToken } from "../../utils/setAuthToken";
import { useAuth } from "../../context/AuthContext";
import { getAverageStaying } from "../../services/dashboardApiService";
import { useDashboard } from "../../context/DashboardContext";

export const AverageStaying = () => {
  const [averageStaying, setAverageStaying] = useState(0);
  const [formattedAverageStaying, setFormattedAverageStaying] = useState('0');

  const { token } = useAuth();
  const { dateRange, days } = useDashboard();

  useEffect(() => {
    const fetchData = async () => {
      setAuthToken(token);

      const response = await getAverageStaying(dateRange);

      if(response.ok) {
        setAverageStaying(response.average_staying);
        setFormattedAverageStaying(new Intl.NumberFormat('en-US', { style: 'decimal' }).format(response.average_staying));
      }
    };

    fetchData();
  }, [token, averageStaying]);

  return (
    <div className="bg-white w-full rounded-xl p-5">
      <div className="flex flex-row">
        <h4 className="font-bold text-sky-600">Average Staying</h4>
      </div>

      <div className="flex flex-row mt-8">
        <span className="font-bold text-sky-600">{formattedAverageStaying}</span>
        <span className="text-sky-600 ms-auto">{days} days</span>
      </div>
    </div>
  );
}