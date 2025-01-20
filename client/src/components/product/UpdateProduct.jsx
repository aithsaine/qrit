import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { FileUpload } from "primereact/fileupload";
import { classNames } from "primereact/utils";
import { motion } from "framer-motion";
import { Puff } from "react-loading-icons";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import {  updateProduct } from "../../redux/actionCreators";
import api from "helpers/api";
import { MdUpdate } from "react-icons/md";

export default function UpdateProductModal({
  id,
  Description,
  Name,
  Price,
  Category,
}) {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState(Name ?? "");
  const [description, setDescription] = useState(Description ?? "");
  const [price, setPrice] = useState(Price ?? "");
  const [category, setCategory] = useState(Category ?? "");
  const [image, setImage] = useState(null);
  const [wait, setWait] = useState(false);
  const dispatch = useDispatch();

  // Fetch categories from Redux store
  const categories = useSelector((state) => state.categories);

  // Handle form submission
  const store = async (e) => {
    e.preventDefault();
    setWait(true);
    try {
      const { data } = await api.post(
        "api/product/update",
        { name, description, price, category, image ,id},
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data) {
        dispatch(updateProduct(data.product));
        setName("");
        setDescription("");
        setPrice("");
        setImage(null);
        setCategory("");
        setVisible(false);
        return toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.name) {
        return toast.error(error.response.data.name[0]);
      }
      if (error.response.data.description) {
        return toast.error(error.response.data.description[0]);
      }
      if (error.response.data.price) {
        return toast.error(error.response.data.price[0]);
      }
      if (error.response.data.category) {
        return toast.error(error.response.data.category[0]);
      }
      if (error.response.data.image) {
        return toast.error(error.response.data.image[0]);
      }
      return toast.error("Something went wrong");
    } finally {
      setWait(false);
    }
  };

  // Handle image upload
  const onUpload = (e) => setImage(e.files[0]);

  return (
    <div className=" items-center justify-center">
      {/* Button to trigger the modal */}
      <motion.div whileTap={{ scale: 0.95 }}>
        <Button
          label={<MdUpdate className="text-xl" />}
          className=" relative flex items-center space-x-2 rounded-lg bg-blue-500 px-4 py-1 text-xs font-semibold text-white shadow-lg transition-transform duration-300 ease-in-out hover:bg-blue-600"
          onClick={() => setVisible(true)}
        />
      </motion.div>
      {/* Smaller Dialog Modal */}
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          onClick={() => setVisible(false)} // Close when clicking outside modal
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="bg-black fixed inset-0 z-50  flex items-center justify-center bg-opacity-50 backdrop-blur-md"
        >
          <div className="w-[90vw] rounded-lg bg-white p-6 shadow-lg md:w-[40vw]">
            <Dialog
              header="Modifier Produit"
              headerClassName="dark:bg-[#000022] shadow-sm shadow-white dark:text-white text-black bg-white  font-semibold" // Dark theme for header
              contentClassName="dark:bg-[#000022] shadow-sm shadow-white dark:text-white text-black bg-white " // Dark theme for content
              visible={visible}
              onHide={() => {
                setVisible(false);
              }}
              style={{ width: "40vw" }}
              breakpoints={{ "960px": "75vw", "641px": "100vw" }}
            >
              <form
                onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
                className="p-fluid space-y-2 text-start"
              >
                {/* Product Name Input */}
                <div className="relative">
                  <label
                    htmlFor="name"
                    className={classNames("mb-1 block text-gray-600")}
                  >
                    Nom du produit
                  </label>
                  <InputText
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="text-black w-full rounded-lg  border p-2  shadow-sm dark:bg-[#000022] dark:text-white"
                    placeholder="Ex : Café chaud"
                  />
                </div>

                {/* Product Description Input */}
                <div className="relative">
                  <label
                    htmlFor="description"
                    className={classNames("mb-1 block text-gray-600")}
                  >
                    Description
                  </label>
                  <InputTextarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="text-black w-full rounded-lg  border p-2  shadow-sm dark:bg-[#000022] dark:text-white"
                    rows={3}
                    placeholder="Description of the plate"
                  />
                </div>

                {/* Product Price Input */}
                <div className="relative">
                  <label
                    htmlFor="price"
                    className={classNames("mb-1 block text-gray-600")}
                  >
                    Prix
                  </label>
                  <InputText
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="text-black w-full rounded-lg  border p-2  shadow-sm dark:bg-[#000022] dark:text-white"
                    placeholder="Ex : 20.99"
                  />
                </div>

                {/* Category Select */}
                <div className="relative">
                  <label
                    htmlFor="category"
                    className="mb-1 block text-gray-600"
                  >
                    Catégorie
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="text-black w-full rounded-lg  border p-2  shadow-sm dark:bg-[#000022] dark:text-white"
                  >
                    <option value="" disabled>
                      Sélectionner une catégorie
                    </option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Product Image Upload */}
                <div className="text-black w-full rounded-lg  border p-2  shadow-sm dark:bg-[#000022] dark:text-white">
                  <label
                    htmlFor="image"
                    className={classNames("mb-1 block text-gray-600")}
                  >
                    Image
                  </label>
                  <FileUpload
                    id="image"
                    name="image[]"
                    customUpload
                    accept="image/*"
                    auto
                    chooseLabel="Choisir une image"
                    className="text-black w-full rounded-lg  border p-2  shadow-sm dark:bg-[#000022] dark:text-white"
                    uploadHandler={onUpload}
                  />
                </div>

                {/* Submit Button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={store}
                    label={
                      wait ? <Puff className="w-4 text-center" /> : "Ajouter"
                    }
                    className="flex h-[40px] w-full items-center justify-center rounded-lg bg-[#EF233C] p-2 font-bold text-white shadow-lg transition-transform duration-300 ease-in-out hover:bg-[#D90429]"
                  />
                </motion.div>
              </form>
            </Dialog>
          </div>
        </motion.div>
      )}
    </div>
  );
}
