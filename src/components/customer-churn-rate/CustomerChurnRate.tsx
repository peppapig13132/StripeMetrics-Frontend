import { useEffect, useState } from "react";
import { setAuthToken } from "../../utils/setAuthToken";
import { useAuth } from "../../context/AuthContext";
import { getCustomerChurnRate } from "../../services/dashboardApiService";

export const CustomerChurnRate = () => {
  const [churnRateLast30Days, setChurnRateLast30Days] = useState(0);
  const [rate, setRate] = useState(0);

  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setAuthToken(token);

      const response = await getCustomerChurnRate();

      if(response.ok) {
        setChurnRateLast30Days(response.churn_rate_last_30_days);
        
        if(response.churn_rate_last_month !== 0) {
          setRate(Math.round((response.churn_rate_last_30_days - response.churn_rate_last_month) / response.churn_rate_last_month * 10000) / 100);
        } else if(response.churn_rate_last_30_days !== 0) {
          setRate(100);
        } else {
          setRate(0);
        }
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="bg-white w-full rounded-xl p-5">
      <div className="flex flex-row">
        <h4 className="font-bold text-sky-600">Customer Churn Rate</h4>
        <span className="font-bold text-red-500 ms-auto">{rate}%</span>
      </div>

      <div className="flex flex-row mt-8">
        <span className="font-bold text-sky-600">{churnRateLast30Days}%</span>
        <span className="text-sky-600 ms-auto">Last 30 days</span>
      </div>
    </div>
  );
}