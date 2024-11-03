import { useState, useEffect } from "react";
import Card from "components/card";
import { MdFilterList, MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useSelector } from "react-redux";
import axios from "axios";
import { IoMdSync } from "react-icons/io";
import api from "helpers/api";

const OrderHistory = () => {
  const { orders, employees } = useSelector((state) => state); // Fetch orders and employees from Redux state
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filter, setFilter] = useState("week"); // Default filter
  const [workerId, setWorkerId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Items per page
  const [errorFetching,setErrorFetching] = useState();

  useEffect(() => {
    if (filter === "worker" && workerId) {
      fetchWorkerOrders(workerId); // Fetch orders by worker
    } else {
      filterOrders(); // Default filter behavior for day, week, month
    }
  }, [filter, workerId, orders]);

  const filterOrders = () => {
    const now = new Date();
    const filtered = orders.filter((order) => {
      const orderDate = new Date(order.date);
      switch (filter) {
        case "day":
          return orderDate.toDateString() === now.toDateString();
        case "week":
          return orderDate >= new Date(now.setDate(now.getDate() - 7));
        case "month":
          return orderDate >= new Date(now.setMonth(now.getMonth() - 1));
        default:
          return true;
      }
    });
    setFilteredOrders(filtered);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const fetchWorkerOrders = async (id) => {
    setLoading(true);
    try {
      const response = await api.get(`api/orders/worker/${id}`);
      setFilteredOrders(response.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) =>
      direction === "next" ? Math.min(prevPage + 1, totalPages) : Math.max(prevPage - 1, 1)
    );
  };

  return (
    <Card extra="flex flex-col justify-between bg-white dark:bg-navy-800 w-full rounded-3xl py-6 px-4 text-center shadow-lg">
      <div className="flex flex-col md:flex-row items-center justify-between px-4">
        <h2 className="text-lg font-bold text-navy-700 dark:text-white">Order History</h2>
        <div className="flex items-center space-x-2">
          {["day", "week", "month"].map((period) => (
            <button
              key={period}
              onClick={() => {
                setFilter(period);
                setWorkerId(null); // Reset worker filter
              }}
              className={`px-2 py-0.5 text-xs rounded-lg font-medium ${
                filter === period ? "bg-[#EF233C] text-white" : "bg-[white] border border-[#EF233C] text-[#EF233C]"
              } hover:bg-[#EF233C] hover:text-white`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
          <select
            onChange={(e) => {
              setFilter("worker");
              setWorkerId(e.target.value);
            }}
            value={workerId || ""}
            className="px-2 py-0.5 text-xs rounded-lg font-medium bg-[white] border border-[#EF233C] text-[#EF233C] hover:bg-[#EF233C] hover:text-white"
          >
            <option value="">Select Worker</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>
          <MdFilterList className="h-6 w-6 text-[#EF233C]" />
        </div>
      </div>

      <div className="mt-6 px-4">
        {loading ? (
          <div className="flex justify-center items-center h-[250px]">
            <IoMdSync className="animate-spin text-3xl text-[#EF233C]" />
          </div>
        ) : (
          <ul className="space-y-4">
            {currentItems.length > 0 ? (
              currentItems.map((order, index) => (
                <li
                  key={order.id || index}
                  className="flex justify-between items-center rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 dark:from-navy-800 dark:to-navy-900 p-4 shadow-lg transition-all duration-200 hover:shadow-xl"
                >
                  <div className="flex flex-col text-left space-y-1">
                    <p className="font-semibold text-navy-700 dark:text-white text-lg">{order.worker}</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                      {new Date(order.date).toLocaleDateString("fr-FR", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                      {" at "}
                      {new Date(order.date).toLocaleTimeString("fr-FR")}
                    </p>
                    <p className="text-md font-semibold text-green-700 dark:text-green-400">
                      Total: {order.total} MAD
                    </p>
                  </div>
                  <span
                    className={`text-sm font-medium py-1 px-3 rounded-full text-white ${
                      order.status === "pending"
                        ? "bg-orange-500 dark:bg-orange-600"
                        : "bg-green-500 dark:bg-green-600"
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </li>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-300">No orders found.</p>
            )}
          </ul>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4 px-4">
        <button
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
          className={`p-2 rounded-full ${
            currentPage === 1 ? "bg-gray-300 dark:bg-gray-600 text-gray-400" : "bg-[#EF233C] text-white"
          }`}
        >
          <MdChevronLeft className="h-5 w-5" />
        </button>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange("next")}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-full ${
            currentPage === totalPages ? "bg-gray-300 dark:bg-gray-600 text-gray-400" : "bg-[#EF233C] text-white"
          }`}
        >
          <MdChevronRight className="h-5 w-5" />
        </button>
      </div>
    </Card>
  );
};

export default OrderHistory;
