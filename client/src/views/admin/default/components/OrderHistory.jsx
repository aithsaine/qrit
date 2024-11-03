import { useState, useEffect } from "react";
import Card from "components/card";
import { MdFilterList, MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useSelector } from "react-redux";

const OrderHistory = () => {
  const { orders } = useSelector((state) => state); // Fetch orders from Redux state
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filter, setFilter] = useState("week"); // Default filter
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Items per page

  useEffect(() => {
    filterOrders();
  }, [filter, orders]);

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
        case "worker":
          return order.worker === "specific_worker"; // Adjust as needed
        default:
          return true;
      }
    });
    setFilteredOrders(filtered);
    setCurrentPage(1); // Reset to first page on filter change
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
  return (
    <Card extra="flex flex-col justify-between bg-white dark:bg-navy-800 w-full rounded-3xl py-6 px-4 text-center shadow-lg">
      <div className="flex items-center justify-between px-4">
        <h2 className="text-lg font-bold text-navy-700 dark:text-white">Order History</h2>
        <div className="flex items-center space-x-2">
          {["day", "week", "month", "worker"].map((period) => (
            <button
              key={period}
              onClick={() => setFilter(period)}
              className={`px-2 py-0.5 text-xs rounded-lg font-medium ${
                filter === period ? "bg-[#EF233C] text-white" : "bg-[white] border border-[#EF233C] text-[#EF233C]"
              } hover:bg-[#EF233C] hover:text-white`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
          <MdFilterList className="h-6 w-6 text-[#EF233C] " />
        </div>
      </div>

      <div className="mt-6 px-4">
        <ul className="space-y-4">
          {currentItems.length > 0 ? (
            currentItems.map((order, index) => (
              <li
                key={order.id || index}
                className="flex justify-between items-center rounded-lg bg-gray-50 dark:bg-navy-800 p-4"
              >
                <div className="text-left">
                  <p className="font-semibold text-white dark:text-white">{order.worker}</p>
                  <p className="text-sm text-gray-800 font-bold dark:text-gray-300">
                    {formatDate(order.date)} - {order.total} MAD
                  </p>
                </div>
                <span className={`text-white text-sm py-0.5 px-2 rounded-xl ${order?.status=="pending"?'bg-orange-600':"bg-green-900"}`} > {order.status}</span>
              </li>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-300">No orders found.</p>
          )}
        </ul>
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
            currentPage === totalPages ? "bg-gray-300 dark:bg-gray-600 text-gray-400" : "bg-brand-500 text-white"
          }`}
        >
          <MdChevronRight className="h-5 w-5" />
        </button>
      </div>
    </Card>
  );
};

export default OrderHistory;
