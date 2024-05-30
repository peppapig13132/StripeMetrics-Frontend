import { useEffect, useState } from "react";
import { setAuthToken } from "../../utils/setAuthToken";
import { useAuth } from "../../context/AuthContext";
import { getCustomerLifetimeValue } from "../../services/dashboardApiService";

export const CustomerLifetimeValue = () => {
  const [formattedCustomerLifetimeValue, setFormattedCustomerLifetimeValue] = useState('$0');

  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setAuthToken(token);

      const response = await getCustomerLifetimeValue();

      if(response.ok) {
        if(response.customer_lifetime_value !== 0) {
          setFormattedCustomerLifetimeValue(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(response.customer_lifetime_value));
        }
      }
    };

    fetchData();
  }, [token]);
  
  return (
    <div className="bg-white w-full rounded-xl p-5">
      <div className="flex flex-row">
        <h4 className="font-bold text-sky-600">Customer Lifetime Value</h4>
      </div>

      <div className="flex flex-row mt-8">
        <span className="font-bold text-sky-600">{formattedCustomerLifetimeValue}</span>
      </div>
    </div>
  );
}