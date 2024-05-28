import { useEffect, useState } from "react";
import SubscriberCountChart from "./SubscriberCountChart";
import { getSubscribers } from "../../services/dashboardApiService";
import { setAuthToken } from "../../utils/setAuthToken";
import { useAuth } from "../../context/AuthContext";

export const LastSubscribers = () => {
  const [last30Days, setLast30Days] = useState(0);
  const [lastMonth, setLastMonth] = useState(0);
  const [rate, setRate] = useState(0);

  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setAuthToken(token);

      try {
        const response = await getSubscribers();

        if(response.ok) {
          setLast30Days(response.count_last_30days);
          setLastMonth(response.count_last_month);

          if(response.count_last_month !== 0) {
            setRate(Math.floor((response.count_last_30days - response.count_last_month) / response.count_last_month) * 100);
          } else {
            setRate(100);
          }
        } else {
          setLast30Days(0);
          setLastMonth(0);
          setRate(0);
        }

      } catch(error) {
        console.error('Error fetching Subscribers data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="bg-white w-full rounded-xl p-5">
      <div className="flex flex-row">
        <h4 className="font-bold text-red-500 ms-auto">{rate}%</h4>
      </div>

      <div className="flex flex-row h-[30px] pt-3">
        <span className="text-sky-600 ms-auto">Last 30 days</span>
      </div>

      <SubscriberCountChart last30Days={last30Days} lastMonth={lastMonth} />
    </div>
  );
}