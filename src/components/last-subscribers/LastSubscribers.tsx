import { useEffect, useState } from "react";
import SubscriberCountChart from "./SubscriberCountChart";
import { getSubscribers } from "../../services/dashboardApiService";
import { setAuthToken } from "../../utils/setAuthToken";
import { useAuth } from "../../context/AuthContext";
import { useDashboard } from "../../context/DashboardContext";

export const LastSubscribers = () => {
  const [subscriptions, setSubscriptions] = useState(0);

  const { token } = useAuth();
  const { dateRange, days } = useDashboard();

  useEffect(() => {
    const fetchData = async () => {
      setAuthToken(token);

      try {
        const response = await getSubscribers(dateRange);

        if(response.ok) {
          setSubscriptions(response.count_subscriptions);
        } else {
          setSubscriptions(0);
        }

      } catch(error) {
        console.error('Error fetching Subscribers data:', error);
      }
    }

    fetchData();
  }, [token, dateRange]);

  return (
    <div className="bg-white w-full rounded-xl p-5">
      <div className="flex flex-row">
        <h4 className="font-bold text-sky-600 ms-auto">Subscribers in</h4>
      </div>

      <div className="flex flex-row h-[30px] pt-3">
        <span className="text-sky-600 ms-auto">{days} days</span>
      </div>

      <SubscriberCountChart subscriptions={subscriptions} />
    </div>
  );
}