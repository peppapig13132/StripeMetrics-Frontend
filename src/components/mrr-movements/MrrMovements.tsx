import { useEffect, useState } from "react";
import SmoothedLine from "./MrrMovementsChart";
import { getMrrMovementsData } from "../../services/dashboardApiService";
import { DailySum } from "../../interfaces/interface";
import { setAuthToken } from "../../utils/setAuthToken";
import { useAuth } from "../../context/AuthContext";
import { useDashboard } from "../../context/DashboardContext";

export const MrrMovements = () => {
  const [xData, setXData] = useState([]);
  const [yData, setYData] = useState([]);

  const { token } = useAuth();
  const { dateRange } = useDashboard();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setAuthToken(token);

        const response = await getMrrMovementsData(dateRange);

        if(response.ok) {
          const mrr_array = response.mrr_array;
          mrr_array.sort((a: DailySum, b: DailySum) => new Date(a.date).getTime() - new Date(b.date).getTime());

          const x_data = mrr_array.map((item: DailySum) => new Date(item.date));
          const y_data = mrr_array.map((item: DailySum) => item.sum);

          setXData(x_data);
          setYData(y_data);
        } else {
          setXData([]);
          setYData([]);
        }
      } catch(error) {
        console.error('Error fetching MRR movements data:', error);
      }
    };

    fetchData();
  }, [token, dateRange]);

  return (
    <div className="bg-white w-full rounded-xl p-5">
      <div className="flex flex-row">
        <h4 className="font-bold text-sky-600">MRR Movements</h4>
      </div>

      <SmoothedLine xData={xData} yData={yData} />
    </div>
  );
}