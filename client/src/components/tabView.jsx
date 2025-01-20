import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./card/ProductCard";
import UpdateCategoryModal from "./category/update";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";
import api from "helpers/api";
import { deleteCategory } from "../redux/actionCreators";
import ConfirmModal from "../components/confirmModal"; // Import the ConfirmModal
import EyeToggleButton from "./ui/eyeToggle";

export default function CustomTabView({ categories }) {
  const [activeTab, setActiveTab] = useState(0);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const deleteCategoryHandler = async (id) => {
    try {
      const { data } = await api.delete(`api/category/${id}/delete`);
      dispatch(deleteCategory(id));
      toast.success(data.message);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const openConfirmModal = (id) => {
    setCategoryToDelete(id);
    setIsConfirmOpen(true);
  };

  const confirmDeletion = () => {
    if (categoryToDelete) {
      deleteCategoryHandler(categoryToDelete);
      setIsConfirmOpen(false);
      setCategoryToDelete(null);
    }
  };

  return (
    <div className="p-4">
      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDeletion}
      />

      {/* Tabs Navigation */}
      <div className="flex border-b border-gray-300 dark:border-gray-700">
        {categories
          .sort((a, b) => a.id - b.id)
          .map((item, index) => (
            <div
              className={`${
                activeTab === index
                  ? " font-bold  text-blue-500"
                  : "text-gray-500  hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-500"
              }`}
            >
              <button
                key={index}
                onClick={() => handleTabClick(index)}
                className={`px-4 py-2 transition-colors duration-300 focus:outline-none ${
                  activeTab === index
                    ? "border-b-4 border-blue-500 font-bold text-blue-500 dark:text-blue-500"
                    : "text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-500"
                }`}
              >
                <span>{item.name}</span>
              </button>
              <EyeToggleButton />
            </div>
          ))}
      </div>

      {/* Tab Panels */}
      <div className="mt-4">
        {categories.map((item, index) => (
          <div
            key={index}
            className={`transition-opacity duration-300 ${
              activeTab === index ? "opacity-100" : "hidden opacity-0"
            }`}
          >
            <div className="mb-2 flex justify-start space-x-2 text-gray-900 dark:text-white">
              <UpdateCategoryModal category={item} />
              <button
                onClick={() => openConfirmModal(item.id)}
                className="flex items-center space-x-2 rounded-lg bg-red-500 px-4 py-1 text-xs font-semibold text-white shadow-lg transition-transform duration-300 ease-in-out hover:bg-red-600"
              >
                <MdDelete className="text-xl" />
                Delete
              </button>
            </div>

            {/* Small Horizontal Cards */}
            <div className="space-y-4">
              {products
                .filter((pr) => pr.category == item.id)
                .map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    description={product?.description}
                    category={product?.category}
                    image={product.image}
                    isHorizontal={true}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
