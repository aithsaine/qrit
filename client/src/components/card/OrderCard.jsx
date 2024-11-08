import React from 'react';
import { FaCheckCircle, FaClock } from 'react-icons/fa';
import { MdTableRestaurant } from 'react-icons/md';
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const dayName = new Intl.DateTimeFormat("en-GB", { weekday: "long" }).format(date);
    const day = date.getDate();
    const month = new Intl.DateTimeFormat("en-GB", { month: "long" }).format(date);
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${dayName} ${day} ${month} ${year} at ${hours}:${minutes}`;
};

const OrderCard = ({ status, date, tableNumber, totalPrice }) => {
  return (
    <div className="w-full  p-2 px-4 space-y-2 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg transition transform hover:scale-105 hover:shadow-2xl">
      {/* Header with Status */}
      <div className="flex items-center justify-between ">
        <h2 className="font-bold text-gray-800 dark:text-white">Order Details</h2>
        <span
          className={`flex items-center px-1 py-1 rounded-full text-sm font-semibold ${
            status === 'confirmed'
              ? 'bg-green-200 text-green-700 dark:bg-green-600 dark:text-green-100'
              : 'bg-yellow-200 text-yellow-700 dark:bg-yellow-600 dark:text-yellow-100'
          }`}
        >
          {status === 'confirmed' ? (
            <FaCheckCircle className="w-4 h-4 mr-1" />
          ) : (
            <FaClock className="w-4 h-4 mr-1" />
          )}
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      {/* Date Section */}
      <div className="text-sm text-gray-500 dark:text-gray-400 ">
        <span className="font-semibold text-gray-600 dark:text-gray-300">Date:</span> {formatDate(date)}
      </div>

      {/* Table Number with Icon */}
      <div className="flex items-center text-lg font-medium text-gray-800 dark:text-gray-200 ">
        <MdTableRestaurant className="w-5 h-5 mr-2 text-indigo-500 dark:text-indigo-300" />
        <span className='text-sm'>Table #{tableNumber}</span>
      </div>
      {/* Total Price */}
      <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
        <span className="text-lg font-semibold text-gray-800 dark:text-white">Total:</span>
        <span className={`font-bold font-serif ${status==="pending"?"text-yellow-700 dark:text-yellow-600":"text-green-700 dark:text-green-600"} `}>{totalPrice.toFixed(2)} MAD</span>
      </div>
    </div>
  );
};

export default OrderCard;
