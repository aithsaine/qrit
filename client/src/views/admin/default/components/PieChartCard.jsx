import PieChart from "components/charts/PieChart";
import Card from "components/card";
import { useState, useEffect } from "react";
import api from "helpers/api";

const PieChartCard = () => {
  const [filterTime, setFilterTime] = useState("weekly");
  const [data, setData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [pieChartOptions, setPieChartOptions] = useState({});

  const getData = async () => {
    try {
      const response = await api.get(`api/orders/workeroverview/${filterTime}`);
      setData(response.data); // Assuming response.data is an array of counts for the pie chart
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [filterTime]);

  useEffect(() => {
    if (data.length > 0) {
      // Example data transformation, adjust based on actual structure
      setPieChartData(data.map(item => item.count)); // Adjust as per actual data structure
      setPieChartOptions({
        labels: data.map(item => item.label), // Adjust as per actual data structure
      });
    }
  }, [data]);

  return (
    <Card extra="rounded-[20px] p-3">
      <div className="flex flex-row justify-between px-3 pt-2">
        <h4 className="text-lg font-bold text-navy-700 dark:text-white">
          Workers Performance
        </h4>
        <div className="mb-6 flex items-center justify-center">
          <select
            onChange={e => setFilterTime(e.target.value)}
            className="mb-3 mr-2 flex items-center justify-center text-sm font-bold text-gray-600 hover:cursor-pointer dark:!bg-navy-800 dark:text-white"
          >
            <option value="weekly">Last 7 days</option>
            <option value="monthly">Last 30 days</option>
            <option value="yearly">Last 360 days</option>
          </select>
        </div>
      </div>

      <div className="mb-auto flex h-[220px] w-full items-center justify-center">
        <PieChart options={pieChartOptions} series={pieChartData} />
      </div>

      <div className="flex flex-row !justify-between rounded-2xl px-6 py-3 shadow-2xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
        {/* Example static display, update as necessary */}
       count orders per each worker
      </div>
    </Card>
  );
};

export default PieChartCard;
