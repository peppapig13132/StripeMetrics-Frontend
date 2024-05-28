import { useEffect, useState } from "react";
import MonthlyRecurringRevenueChart from "./MonthlyRecurringRevenueChart";
import { getMrrData } from "../../services/mrrService";
import { DailySum } from "../../interfaces/interface";
import { setAuthToken } from "../../utils/setAuthToken";
import { useAuth } from "../../context/AuthContext";

export const MontlyRecurringRevenue = () => {
  const [xData, setXData] = useState([]);
  const [yData, setYData] = useState([]);

  const { token } = useAuth();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setAuthToken(token);

        const response = await getMrrData();

        if(response.ok) {
          const mrr_data = response.mrr_data;
          mrr_data.sort((a: DailySum, b: DailySum) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

          const x_data = mrr_data.map((item: DailySum) => new Date(item.createdAt));
          const y_data = mrr_data.map((item: DailySum) => item.sum);

          setXData(x_data);
          setYData(y_data);
        } else {
          setXData([]);
          setYData([]);
        }

      } catch(error) {
        console.error('Error fetching MRR data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="bg-white w-full rounded-xl p-5">
      MRR
      <MonthlyRecurringRevenueChart xData={xData} yData={yData} />
    </div>
  );
}