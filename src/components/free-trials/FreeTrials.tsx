import { useEffect, useState } from "react";
import { setAuthToken } from "../../utils/setAuthToken";
import { useAuth } from "../../context/AuthContext";
import { getFreeTrials } from "../../services/dashboardApiService";

export const FreeTrials = () => {
  const [countFreeTrialsLast30Days, setCountFreeTrialsLast30Days] = useState(0);
  const [rate, setRate] = useState(0);

  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setAuthToken(token);

      const response = await getFreeTrials();

      if(response.ok) {
        setCountFreeTrialsLast30Days(response.count_free_trials_last_30_days);
        
        if(response.count_free_trials_last_month !== 0) {
          setRate(Math.round((response.count_free_trials_last_30_days - response.count_free_trials_last_month) / response.count_free_trials_last_month) * 100);
        } else {
          setRate(100);
        }
      }
    };

    fetchData();
  }, [token]);
  
  return (
    <div className="bg-white w-full rounded-xl p-5">
      <div className="flex flex-row">
        <h4 className="font-bold text-sky-600">Free trials</h4>
        <span className="font-bold text-red-500 ms-auto">{rate}%</span>
      </div>

      <div className="flex flex-row mt-8">
        <span className="font-bold text-sky-600">{countFreeTrialsLast30Days}</span>
        <span className="text-sky-600 ms-auto">Last 30 days</span>
      </div>
    </div>
  );
}