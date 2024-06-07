import { useEffect, useState } from "react";
import { setAuthToken } from "../../utils/setAuthToken";
import { useAuth } from "../../context/AuthContext";
import { getFreeToPaidSubscriptions } from "../../services/dashboardApiService";
import { useDashboard } from "../../context/DashboardContext";

export const FreeToPaidSubscriptions = () => {
  const [countFreeToPaid, setCountFreeToPaid] = useState(0);
  const [freeToPaidRate, setFreeToPaidRate] = useState(0);

  const { token } = useAuth();
  const { dateRange, days } = useDashboard();

  useEffect(() => {
    const fetchData = async () => {
      setAuthToken(token);

      const response = await getFreeToPaidSubscriptions(dateRange);

      if(response.ok) {
        setCountFreeToPaid(response.count_free_to_paid);

        if(response.count_all !== 0) {
          setFreeToPaidRate(Math.round(response.count_free_to_paid / response.count_all) * 100);
        }
      }
    };

    fetchData();
  }, [token, dateRange]);

  return (
    <div className="bg-white w-full rounded-xl p-5">
      <div className="flex flex-row">
        <h4 className="font-bold text-sky-600">Free to paid subscriptions</h4>
      </div>

      <div className="flex flex-row mt-8">
        <span className="font-bold text-sky-600">{countFreeToPaid} ({freeToPaidRate}%)</span>
        <span className="text-sky-600 ms-auto">{days} days</span>
      </div>
    </div>
  );
}