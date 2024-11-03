import MiniCalendar from "components/calendar/MiniCalendar";
import PieChartCard from "views/admin/default/components/PieChartCard";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";

import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";

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

const formatDate = (dateString) => {
  // Create a Date object from the ISO date string
  const date = new Date(dateString);

  // Format date parts
  const dayName = new Intl.DateTimeFormat("en-GB", { weekday: "long" }).format(date);
  const day = date.getDate();
  const month = new Intl.DateTimeFormat("en-GB", { month: "long" }).format(date);
  const year = date.getFullYear();

  // Format time parts
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  // Combine into the desired format
  return `${dayName} ${day} ${month} ${year} at ${hours}:${minutes}:${seconds}`;
};
const Dashboard = () => {
  const { employees } = useSelector((state) => state);
  const [tableDataComplex, setTableDataComplex] = useState();

  useEffect(() => {
    if (employees) {
      const formattedData = employees.map((item) => ({
        worker: item?.name || "N/A",
        status: item?.last_seen || "N/A",
        last_order: item?.last_order.length>0? formatDate(item?.last_order[0].created_at):'-', // Replace with actual data if available
        progress: 28, // Replace with actual progress if available
      }));
      setTableDataComplex(formattedData);
    }
  }, [employees]);


  

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
      <MenuPopularity />
      <OrderHistory />
    </div>

    {/* Tables & Charts */}

    <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
         {/* Complex Table , Task & Calendar */}

       {tableDataComplex&&  <ComplexTable
        columnsData={columnsDataComplex}
        tableData={tableDataComplex}
      />}

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
