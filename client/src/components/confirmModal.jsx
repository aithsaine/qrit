import React from 'react';

export default function ConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80 text-center">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Confirm Deletion
        </h2>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          Are you sure you want to delete this category?
        </p>
        <div className="flex justify-between space-x-4">
          <button
            onClick={onClose}
            className="w-full py-2 px-4 rounded-lg text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="w-full py-2 px-4 rounded-lg text-white bg-red-600 hover:bg-red-700 transition-colors"
          >
            
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
