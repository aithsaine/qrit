import { useState } from "react";
import { motion } from "framer-motion";
import { FiMoreVertical, FiTrash2, FiEdit } from "react-icons/fi";

const ProductCard = ({ image, name, price, totalSales=0, onDelete, onModify }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative bg-white shadow-lg rounded-lg overflow-hidden p-4 flex items-center max-w-4xl">
      {/* Product Image */}
      <img src={image} alt={name} className="h-32 w-32 object-cover rounded-lg" />

      {/* Product Info */}
      <div className="ml-4 flex-1">
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-gray-500 mt-1">${price}</p>
        <p className="text-gray-500 mt-1 text-xs">Total Sales: {totalSales}</p>
      </div>

      {/* Dropdown Button */}
      <div className="absolute top-2 right-2">
        <button
          onClick={toggleDropdown}
          className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200"
        >
          <FiMoreVertical size={20} />
        </button>
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-10 right-0 bg-white shadow-lg rounded-lg p-2 z-10"
        >
          <ul className="text-gray-800">
            <li
              onClick={onModify}
              className="flex items-center cursor-pointer p-2 hover:bg-gray-100 rounded-md"
            >
              <FiEdit className="mr-2" />
              Modify
            </li>
            <li
              onClick={onDelete}
              className="flex items-center cursor-pointer p-2 text-red-600 hover:bg-red-50 rounded-md"
            >
              <FiTrash2 className="mr-2" />
              Delete
            </li>
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default ProductCard;
