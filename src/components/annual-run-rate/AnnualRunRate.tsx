import { useEffect, useState } from "react";
import { getMrrData } from "../../services/dashboardApiService";
import { setAuthToken } from "../../utils/setAuthToken";
import { useAuth } from "../../context/AuthContext";
import { useDashboard } from "../../context/DashboardContext";
import moment from "moment";

export const AnnualRunRate = () => {
  const [mrr, setMrr] = useState(0);
  const [formattedAnnualRunRate, setFormattedAnnualRunRate] = useState('$0');

  const { token } = useAuth();
  const { dateRange } = useDashboard();

  useEffect(() => {
    const fetchData = async () => {
      setAuthToken(token);

      try {
        const response = await getMrrData(dateRange);

        if(response.ok) {
          setMrr(response.mrr);
          setFormattedAnnualRunRate(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(mrr * 12));
        } else {
          setMrr(0);
        }

      } catch(error) {
        console.error('Error fetching MRR data:', error);
      }
    }

    fetchData();
  }, [token, mrr, dateRange]);

  return (
    <div className="bg-white w-full rounded-xl p-5">
      <div className="flex flex-row">
        <h4 className="font-bold text-sky-600">Annual Run Rate</h4>
      </div>

      <div className="flex flex-row mt-8">
        <span className="font-bold text-sky-600">{formattedAnnualRunRate}</span>
        <span className="text-sky-600 ms-auto text-sm">{moment(dateRange.endDate).format('DD, MMM YYYY')}</span>
      </div>
    </div>
  );
}