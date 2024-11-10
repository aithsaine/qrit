import React from 'react';
import { FaChair } from 'react-icons/fa';

const TableCard = ({ tableNumber, waiterName }) => {
  return (
    <div className="p-3 shadow-md rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col items-center space-y-2">
      {/* Table Icon */}
      <div className="relative flex justify-center items-center">
        <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <FaChair className="text-2xl text-gray-600 dark:text-gray-400" />
        </div>
        {/* Small chairs around the table */}
        <div className="absolute -top-3 -left-3">
          <FaChair className="text-sm text-gray-400 rotate-45" />
        </div>
        <div className="absolute -top-3 -right-3">
          <FaChair className="text-sm text-gray-400 -rotate-45" />
        </div>
        <div className="absolute -bottom-3 -left-3">
          <FaChair className="text-sm text-gray-400 -rotate-45" />
        </div>
        <div className="absolute -bottom-3 -right-3">
          <FaChair className="text-sm text-gray-400 rotate-45" />
        </div>
      </div>

      {/* Table Number and Waiter Info */}
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        Table {tableNumber}
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Waiter: <span className="font-medium">{waiterName || 'Unassigned'}</span>
      </p>
    </div>
  );
};

export default TableCard;
