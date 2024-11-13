import PieChartCard from "views/admin/default/components/PieChartCard";
import { MdBarChart, MdDashboard } from "react-icons/md";


import Widget from "components/widget/Widget";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import TaskCard from "views/admin/default/components/TaskCard";
import tableDataCheck from "./variables/tableDataCheck.json";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import OrderHistory from "./components/OrderHistory";
import MenuPopularity from "./components/TotalSpent";
import api from "helpers/api";


const Dashboard = () => {

  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await api.get("api/orders/analytics");
      setData(response.data.orders);
    } catch (error) {
      console.error("Error fetching data:", error); // Log any errors
    }
  };

  useEffect(() => {
    getData();
  }, []);



  

  return (
    <div>
    {/* Card widget */}

    <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
      <Widget
        icon={<MdBarChart className="h-7 w-7" />}
        title={"Earnings"}
        subtitle={"$340.5"}
      />
      {/* <Widget
        icon={<IoDocuments className="h-6 w-6" />}
        title={"Spend this month"}
        subtitle={"$642.39"}
      /> */}
      <Widget
        icon={<MdBarChart className="h-7 w-7" />}
        title={"Sales"}
        subtitle={"$574.34"}
      />
      {/* <Widget
        icon={<MdDashboard className="h-6 w-6" />}
        title={"Your Balance"}
        subtitle={"$1,000"}
      />
      <Widget
        icon={<MdBarChart className="h-7 w-7" />}
        title={"New Tasks"}
        subtitle={"145"}
      />
      <Widget
        icon={<IoMdHome className="h-6 w-6" />}
        title={"Total Projects"}
        subtitle={"$2433"}
      /> */}
    </div>

    {/* Charts */}

    <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
      <MenuPopularity data={data} />
      <OrderHistory />
    </div>

    {/* Tables & Charts */}

    <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
         {/* Complex Table , Task & Calendar */}

       <ComplexTable
      />

      {/* Traffic chart & Pie Chart */}

      <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
        <DailyTraffic />
        <PieChartCard />
      </div>

       {/* Check Table */}
       {/* <div>
        <CheckTable
          columnsData={columnsDataCheck}
          tableData={tableDataCheck}
        />
      </div> */}

  

      {/* Task chart & Calendar */}

      {/* <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
        <TaskCard />
        <div className="grid grid-cols-1 rounded-[20px]">
          <MiniCalendar />
        </div>
      </div> */}


    </div>
  </div>

  );
};

export default Dashboard;
