import { useEffect, useState } from "react";
import SmoothedLine from "./MrrMovementsChart";
import { getMrrMovementsData } from "../../services/mrrMovements";
import { DailySum } from "../../interfaces/interface";

export const MrrMovements = () => {
  const [xData, setXData] = useState([]);
  const [yData, setYData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMrrMovementsData();

        if(response.ok) {
          const mrr_movements_data = response.mrr_movements_data;
          mrr_movements_data.sort((a: DailySum, b: DailySum) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

          const x_data = mrr_movements_data.map((item: DailySum) => new Date(item.createdAt));
          const y_data = mrr_movements_data.map((item: DailySum) => item.sum);

          console.log(mrr_movements_data);
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