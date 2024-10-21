import { useState, useEffect, useRef } from "react";
import { FiMoreVertical, FiTrash2, FiEdit } from "react-icons/fi";

const ProductCard = ({ id, image, name, price, totalSales = 0, onDelete, onModify, isHorizontal }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`relative bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden ${
        isHorizontal ? "p-4 flex items-center space-x-4" : "p-6"
      } hover:shadow-2xl transition-all duration-300`}
    >
      {/* Product Image */}
      <div className={`w-20 h-20 ${isHorizontal ? "flex-none" : "w-48 h-48"} rounded-lg overflow-hidden shadow-md`}>
        <img
          src={`${process.env.REACT_APP_BACKEND_URI}/storage/products/${image}`}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Product Info */}
      <div className={`flex-1 ${isHorizontal ? "ml-4" : "ml-8"} space-y-1`}>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{name}</h2>
        <p className="text-md font-bold text-red-500">${price}</p>
        <p className="text-sm text-gray-500">
          Total Sales: <span className="font-medium text-gray-700 dark:text-gray-300">{totalSales}</span>
        </p>
      </div>

      {/* Dropdown Button */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          <FiMoreVertical size={20} className="text-gray-600 dark:text-gray-400" />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute top-10 right-0 bg-white dark:bg-gray-700 shadow-lg rounded-md w-32 p-2 z-20 border border-gray-200 dark:border-gray-600">
            <ul className="space-y-2">
              <li
                onClick={onModify}
                className="flex items-center cursor-pointer px-3 py-2 hover:bg-blue-100 dark:hover:bg-blue-800 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-white transition-colors duration-200 rounded-md"
              >
                <FiEdit className="mr-2" size={18} />
                <span className="text-sm font-medium">Modify</span>
              </li>
              <li
                onClick={() => onDelete(id)}
                className="flex items-center cursor-pointer px-3 py-2 text-red-600 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-800 hover:text-red-800 dark:hover:text-white transition-colors duration-200 rounded-md"
              >
                <FiTrash2 className="mr-2" size={18} />
                <span className="text-sm font-medium">Delete</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
