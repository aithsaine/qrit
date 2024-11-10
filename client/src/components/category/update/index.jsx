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
import {  updateCategory } from "../../../redux/actionCreators";
import { MdUpdate } from "react-icons/md";

export default function UpdateCategoryModal({category}) {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description);
  const [image, setImage] = useState(null);
  const [wait, setWait] = useState(false);
  const dispatch = useDispatch();

  // Handle form submission

  const update = async () => {
    try {
      const { data } = await api.post(
        `api/category/${category.id}/update`,
         { name, description, image },
        
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setVisible(false);
        dispatch(updateCategory(data.category));
         toast.success(data.message);
   
      } catch (error) {

       toast.error("somethink went wrong");
    } finally {
      setWait(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setWait(true);
    update();
  };

  // Handle image upload
  const onUpload = (e) => setImage(e.files[0]);
  return (
    <div className="   items-center justify-center">
      {/* Button to trigger the modal */}
      <motion.div  whileTap={{ scale: 0.95 }}>
        <Button
          label="update"
          className="relative  rounded-lg bg-[blue] text-xs px-4 py-2 font-semibold text-white shadow-lg transition-transform duration-300 ease-in-out hover:bg-blueSecondary"
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
          className="bg-black fixed inset-0 z-50 flex backdrop-blur-md items-center justify-center bg-opacity-50"
        >
          <div className="w-[90vw] rounded-lg bg-white p-6 shadow-lg md:w-[40vw]">
            <Dialog
              header="Nouvelle Catégorie"
              className="text-center  text-sm font-bold text-gray-800"
              visible={visible}
              onHide={() => {
                setVisible(false);
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
                    className={classNames(
                      "w-full rounded-lg border p-2 shadow-sm"
                    )}
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
                    className={classNames(
                      "w-full rounded-lg border p-2 shadow-sm"
                    )}
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
                      wait ? <Puff className="w-4 text-center" /> : "update"
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
