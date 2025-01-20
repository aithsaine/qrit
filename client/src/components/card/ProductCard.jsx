import api from "helpers/api";
import { useState, useEffect, useRef } from "react";
import { FiMoreVertical, FiTrash2, FiEdit } from "react-icons/fi";
import { deleteProduct } from "../../redux/actionCreators";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { MdDelete, MdUpdate } from "react-icons/md";
import ConfirmModal from "components/confirmModal";
import UpdateProductModal from "components/product/UpdateProduct";

const ProductCard = ({
  id,
  image,
  name,
  description,
  price,
  totalSales = 0,
  isHorizontal,
  category,
}) => {
  const dispatch = useDispatch();
  const [ProductToDelete, setProductToDelete] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const onDelete = async () => {
    try {
      const { data } = await api.delete(`api/product/${id}/delete`);
      dispatch(deleteProduct(id));
      toast.success(data.message);
    } catch {
      toast.error("somethink went wrong");
    }
  };

  // Toggle dropdown

  const openConfirmModal = (id) => {
    setProductToDelete(id);
    setIsConfirmOpen(true);
  };

  const confirmDeletion = () => {
    if (ProductToDelete) {
      onDelete(ProductToDelete);
      setIsConfirmOpen(false);
      setProductToDelete(null);
    }
  };

  // Close dropdown when clicking outside
  

  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-800 ${
        isHorizontal ? "flex items-center space-x-4 p-4" : "p-6"
      } transition-all duration-300 hover:shadow-2xl`}
    >
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDeletion}
      />
      {/* Product Image */}
      <div
        className={`h-20 w-20 ${
          isHorizontal ? "flex-none" : "h-48 w-48"
        } overflow-hidden rounded-lg shadow-md`}
      >
        <img
          src={`${process.env.REACT_APP_BACKEND_URI}/products/${image}`}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Product Info */}
      <div className={`flex-1 ${isHorizontal ? "ml-4" : "ml-8"} space-y-1`}>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          {name}
        </h2>
        <p className="text-md font-bold text-red-500">${price}</p>
        <p className="text-sm text-gray-500">
          Total Sales:{" "}
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {totalSales}
          </span>
        </p>
      </div>
      {/* Dropdown Button */}
        

          <div className="absolute w-[40px] right-8  z-20  rounded-md  p-2 ">
            <ul className="space-y-2">
              <UpdateProductModal
                id={id}
                Description={description}
                Name={name}
                Price={price}
                Category={category}
              />

              <button
                onClick={() => openConfirmModal(id)}
                className="flex items-center space-x-2 rounded-lg bg-red-500 px-4 py-1 text-xs font-semibold text-white shadow-lg transition-transform duration-300 ease-in-out hover:bg-red-600"
              >
                <MdDelete className="text-xl" />
                
              </button>
            </ul>
          </div>
    </div>
  );
};

export default ProductCard;
