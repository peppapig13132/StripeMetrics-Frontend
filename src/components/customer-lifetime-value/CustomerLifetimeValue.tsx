import { useEffect, useState } from "react";
import { setAuthToken } from "../../utils/setAuthToken";
import { useAuth } from "../../context/AuthContext";
import { getCustomerLifetimeValue } from "../../services/dashboardApiService";
import moment from "moment";
import { useDashboard } from "../../context/DashboardContext";

export const CustomerLifetimeValue = () => {
  const [formattedCustomerLifetimeValue, setFormattedCustomerLifetimeValue] = useState('$0');

  const { token } = useAuth();
  const { dateRange } = useDashboard();

  useEffect(() => {
    const fetchData = async () => {
      setAuthToken(token);

      const response = await getCustomerLifetimeValue(dateRange);

      if(response.ok) {
        if(response.customer_lifetime_value !== 0) {
          setFormattedCustomerLifetimeValue(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(response.customer_lifetime_value));
        }
      }
    };

    fetchData();
  }, [token, dateRange]);
  
  return (
    <div className="bg-white w-full rounded-xl p-5">
      <div className="flex flex-row">
        <h4 className="font-bold text-sky-600">Customer Lifetime Value</h4>
      </div>

      <div className="flex flex-row mt-8">
        <span className="font-bold text-sky-600">{formattedCustomerLifetimeValue}</span>
        <span className="text-sky-600 ms-auto text-sm">{moment(dateRange.endDate).format('DD, MMM YYYY')}</span>
      </div>
    </div>
  );
}