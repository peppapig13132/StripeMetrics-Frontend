import { useEffect, useState } from "react";
import { setAuthToken } from "../../utils/setAuthToken";
import { useAuth } from "../../context/AuthContext";
import { getFreeTrials } from "../../services/dashboardApiService";
import { useDashboard } from "../../context/DashboardContext";

export const FreeTrials = () => {
  const [countFreeTrials, setCountFreeTrials] = useState(0);

  const { token } = useAuth();
  const { dateRange, days } = useDashboard();

  useEffect(() => {
    const fetchData = async () => {
      setAuthToken(token);

      const response = await getFreeTrials(dateRange);

      if(response.ok) {
        setCountFreeTrials(response.free_trials);
      }
    };

    fetchData();
  }, [token, dateRange]);
  
  return (
    <div className="bg-white w-full rounded-xl p-5">
      <div className="flex flex-row">
        <h4 className="font-bold text-sky-600">Free trials</h4>
      </div>

      <div className="flex flex-row mt-8">
        <span className="font-bold text-sky-600">{countFreeTrials}</span>
        <span className="text-sky-600 ms-auto">{days} days</span>
      </div>
    </div>
  );
}