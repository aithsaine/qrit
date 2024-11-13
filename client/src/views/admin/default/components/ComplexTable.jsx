import React, { useEffect, useState } from "react";
import Card from "components/card";
import Progress from "components/progress";
import { MdCancel, MdCheckCircle, MdOutlineError } from "react-icons/md";
import employeeFakeImage from "../../../../assets/img/employee.png";
import { useSelector } from "react-redux";

export default function ComplexTable() {
  const { employees } = useSelector((state) => state);
  const [tableDataComplex, setTableDataComplex] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const dayName = new Intl.DateTimeFormat("en-GB", { weekday: "long" }).format(date);
    const day = date.getDate();
    const month = new Intl.DateTimeFormat("en-GB", { month: "long" }).format(date);
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${dayName} ${day} ${month} ${year} at ${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    const formattedData = employees.sort((a,b)=>a.id-b.id).map((item) => ({
      worker: item?.name || "N/A",
      status: item?.last_seen || "N/A",
      last_order: item?.last_order.length > 0 ? formatDate(item?.last_order[0].created_at) : '-',
      progress: 28,
    }));
    setTableDataComplex(formattedData);
  }, [employees]);

  return (
    <Card extra={"w-full h-full px-6 pb-6 sm:overflow-x-auto"}>
      <div className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Workers Recent Activities
        </div>
      </div>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
        <table className="w-full">
          <thead>
            <tr className="!border-px !border-gray-400">
              <th className="cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start text-sm font-bold text-gray-600 dark:text-white">
                Worker
              </th>
              <th className="cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start text-sm font-bold text-gray-600 dark:text-white">
                STATUS
              </th>
              <th className="cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start text-sm font-bold text-gray-600 dark:text-white">
                Last Order
              </th>
              <th className="cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start text-sm font-bold text-gray-600 dark:text-white">
                PROGRESS
              </th>
            </tr>
          </thead>
          <tbody>
            {tableDataComplex.slice(0, 5).map((row, index) => (
              <tr key={index}>
                <td className="min-w-[150px] border-white/0 py-3 pr-4">
                  <div className="flex items-center text-sm font-bold text-navy-700 dark:text-white">
                    <img
                      src={employeeFakeImage}
                      alt="emp"
                      className="h-8 w-8 rounded-full border border-gray-300 mr-2"
                    />
                    {row.worker}
                  </div>
                </td>
                <td className="min-w-[150px] border-white/0 py-3 pr-4">
                  <div className="flex items-center">
                    {row.status === "Online" ? (
                      <MdCheckCircle className="me-1 text-green-500 dark:text-green-300" />
                    ) : (
                      <MdOutlineError className="me-1 w-6 text-amber-500 dark:text-amber-300" />
                    )}
                    <p className="text-xs font-bold text-navy-700 dark:text-white">
                      {row.status}
                    </p>
                  </div>
                </td>
                <td className="min-w-[150px] border-white/0 py-3 pr-4">
                  <p className="text-xs font-bold text-navy-700 dark:text-white">
                    {row.last_order}
                  </p>
                </td>
                <td className="min-w-[150px] border-white/0 py-3 pr-4">
                  <div className="flex items-center">
                    <Progress width="w-[108px]" value={row.progress} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
