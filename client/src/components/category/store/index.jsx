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
import api from "helpers/api";
import { useDispatch } from "react-redux";
import { addCategory } from "../../../redux/actionCreators";

export default function NewCategoryModal() {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [wait, setWait] = useState(false);
  const dispatch = useDispatch();

  // Handle form submission

  const store = async () => {
    try {
      const { data } = await api.post(
        "api/category/store",
        { name, description, image },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data) {
        dispatch(addCategory(data.category));
        setName("");
        setDescription("");
        setImage(null);
        setVisible(false);
        return toast.success(data.message);
      }
    } catch (error) {
      if (error.response.data.name) {
        return toast.error(error.response.data.name[0]);
      }
      if (error.response.data.description) {
        return toast.error(error.response.data.description[0]);
      }

      if (error.response.data.image) {
        return toast.error(error.response.data.image[0]);
      }

      return toast.error("somethink went wrong");
    } finally {
      setWait(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setWait(true);

    store();
  };

  // Handle image upload
  const onUpload = (e) => setImage(e.files[0]);
  return (
    <div className=" w-full  items-center justify-center">
      {/* Button to trigger the modal */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          label="Ajouter une catégorie"
          className="relative w-full rounded-lg bg-[#EF233C] px-6 py-2 font-semibold text-white shadow-lg transition-transform duration-300 ease-in-out hover:bg-[#D90429]"
          icon="pi pi-external-link"
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
          className="bg-black fixed inset-0 z-50 backdrop-blur-md flex items-center justify-center bg-opacity-50"
        >
          <div 
          
          className="w-[90vw] rounded-lg bg-white p-6 shadow-lg md:w-[40vw]">
            <Dialog
              header="Nouvelle Catégorie"
              headerClassName="dark:bg-[#000022] shadow-sm shadow-white dark:text-white text-black bg-white  font-semibold" // Dark theme for header
              contentClassName="dark:bg-[#000022] shadow-sm shadow-white dark:text-white text-black bg-white " // Dark theme for content
              visible={visible}
              onHide={() => {
                setVisible(false);
                setName("");
                setDescription("");
                setImage(null);
              }}
              style={{ width: "40vw" }}
              breakpoints={{ "960px": "75vw", "641px": "100vw" }}
            >
              <form
            onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it

                onSubmit={handleSubmit}
                className="p-fluid space-y-2 text-start"
              >
                {/* Category Name Input */}
                <div className="relative">
                  <label
                    htmlFor="name"
                    className={classNames("mb-1 block text-gray-600")}
                  >
                    Nom de la catégorie
                  </label>
                  <InputText
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full dark:bg-[#000022] border  dark:text-white text-black  rounded-lg p-2 shadow-sm"
                    placeholder="Ex : Café chaud"
                  />
                </div>

                {/* Category Description Input */}
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
                    className="w-full dark:bg-[#000022] border  dark:text-white text-black  rounded-lg p-2 shadow-sm"
                    rows={3}
                    placeholder="Description"
                  />
                </div>

                {/* Category Image Upload */}
                <div className="relative">
                  <label
                    htmlFor="image"
                    className={classNames("mb-1 block text-gray-600")}
                  >
                    Image
                  </label>
                  <FileUpload
                    id="image"
                    name="demo[]"
                    customUpload
                    accept="image/*"
                    auto
                    className="w-full dark:bg-[#000022] border  dark:text-white text-black  rounded-lg p-2 shadow-sm"

                    chooseLabel="Choisir une image"
                    uploadHandler={onUpload}
                  />
                </div>

                {/* Submit Button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    label={
                      wait ? <Puff className="w-4 text-center" /> : "Ajoute"
                    }
                    className="flex h-[40px] w-full items-center justify-center rounded-lg bg-[#EF233C] p-2 font-bold text-white shadow-lg transition-transform duration-300 ease-in-out hover:bg-[#D90429]"
                    type="submit"
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
