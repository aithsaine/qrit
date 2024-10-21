import { useState } from "react";
import { motion } from "framer-motion";
import { FiMoreVertical, FiTrash2, FiEdit } from "react-icons/fi";

const ProductCard = ({ id, image, name, price, totalSales = 0, onDelete, onModify }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative bg-white shadow-lg rounded-lg overflow-hidden p-6 flex items-center max-w-5xl hover:shadow-2xl transition-all duration-300">
      {/* Product Image */}
      <div className="w-48 h-48 flex items-center justify-center overflow-hidden rounded-full shadow-md">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Product Info */}
      <div className="ml-8 flex-1 space-y-2">
        <h2 className="text-2xl text-gray-800 font-bold">{name}</h2>
        <p className="text-xl text-gray-600">${price}</p>
        <p className="text-md text-gray-500">Total Sales: <span className="font-semibold">{totalSales}</span></p>
      </div>

      {/* Dropdown Button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleDropdown}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
        >
          <FiMoreVertical size={28} className="text-gray-600" />
        </button>
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-16 right-4 bg-white shadow-xl rounded-lg w-40 p-2 z-20 border border-gray-200"
        >
          <ul className="space-y-2">
            <li
              onClick={onModify}
              className="flex items-center cursor-pointer px-3 py-2 hover:bg-blue-50 text-blue-600 hover:text-blue-800 transition-colors duration-200 rounded-lg"
            >
              <FiEdit className="mr-2" size={18} />
              <span className="text-sm font-medium">Modify</span>
            </li>
            <li
              onClick={() => onDelete(id)}
              className="flex items-center cursor-pointer px-3 py-2 text-red-600 hover:bg-red-50 hover:text-red-800 transition-colors duration-200 rounded-lg"
            >
              <FiTrash2 className="mr-2" size={18} />
              <span className="text-sm font-medium">Delete</span>
            </li>
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default ProductCard;
