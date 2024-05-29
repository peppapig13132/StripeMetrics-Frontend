import { useEffect, useState } from "react";
import { setAuthToken } from "../../utils/setAuthToken";
import { useAuth } from "../../context/AuthContext";
import { getFreeToPaidSubscriptions } from "../../services/dashboardApiService";

export const FreeToPaidSubscriptions = () => {
  const [countFreeToPaidLast30Days, setCountFreeToPaidLast30Days] = useState(0);
  // const [countAll30Days, setCountAllLast30Days] = useState(0);
  const [freeToPaidRateLast30Days, setFreeToPaidRateLast30Days] = useState(0);
  // const [countFreeToPaidLastMonth, setcountFreeToPaidLastMonth] = useState(0);
  // const [countAllLastMonth, setcountAllLastMonth] = useState(0);
  const [rate, setRate] = useState(0);

  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setAuthToken(token);

      const response = await getFreeToPaidSubscriptions();

      if(response.ok) {
        setCountFreeToPaidLast30Days(response.count_free_to_paid_last_30_days);
        // setCountAllLast30Days(response.count_all_last_30_days);
        // setcountFreeToPaidLastMonth(response.count_free_to_paid_last_month);
        // setcountAllLastMonth(response.count_all_last_month);

        if(response.count_all_last_30_days !== 0) {
          setFreeToPaidRateLast30Days(Math.round(response.count_free_to_paid_last_30_days / response.count_all_last_30_days) * 100);
        }
        
        if(response.count_free_to_paid_last_month !== 0) {
          setRate(Math.round((response.count_free_to_paid_last_30_days - response.count_free_to_paid_last_month) / response.count_free_to_paid_last_month) * 100);
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
        <h4 className="font-bold text-sky-600">Free to paid subscriptions</h4>
        <span className="font-bold text-red-500 ms-auto">{rate}%</span>
      </div>

      <div className="flex flex-row mt-8">
        <span className="font-bold text-sky-600">{countFreeToPaidLast30Days} ({freeToPaidRateLast30Days}%)</span>
        <span className="text-sky-600 ms-auto">Last 30 days</span>
      </div>
    </div>
  );
}