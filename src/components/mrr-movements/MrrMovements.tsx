import { useEffect, useState } from "react";
import SmoothedLine from "./MrrMovementsChart";
import { getMrrMovementsData } from "../../services/mrrMovementsService";
import { DailySum } from "../../interfaces/interface";
import { setAuthToken } from "../../utils/setAuthToken";
import { useAuth } from "../../context/AuthContext";

export const MrrMovements = () => {
  const [xData, setXData] = useState([]);
  const [yData, setYData] = useState([]);

  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setAuthToken(token);

        const response = await getMrrMovementsData();

        if(response.ok) {
          const mrr_movements_data = response.mrr_movements_data;
          mrr_movements_data.sort((a: DailySum, b: DailySum) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

          const x_data = mrr_movements_data.map((item: DailySum) => new Date(item.createdAt));
          const y_data = mrr_movements_data.map((item: DailySum) => item.sum);

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
  }, [])

  return (
    <div className="bg-white w-full rounded-xl p-5">
      MRR Movements
      <SmoothedLine xData={xData} yData={yData} />
    </div>
  );
}