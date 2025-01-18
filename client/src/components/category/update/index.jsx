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
import { updateCategory } from "../../../redux/actionCreators";

export default function UpdateCategoryModal({ category }) {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description);
  const [image, setImage] = useState(null);
  const [wait, setWait] = useState(false);
  const dispatch = useDispatch();

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
      toast.error("Something went wrong");
    } finally {
      setWait(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setWait(true);
    update();
  };

  const onUpload = (e) => setImage(e.files[0]);

  return (
    <div className="items-center justify-center">
      {/* Button to trigger the modal */}
      <motion.div whileTap={{ scale: 0.95 }}>
        <Button
          label="Update"
          className="relative rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-lg transition-transform duration-300 ease-in-out hover:bg-blue-700"
          icon="pi pi-external-link"
          onClick={() => setVisible(true)}
        />
      </motion.div>

      {/* Modal */}
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          onClick={() => setVisible(false)}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="bg-black fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-md"
        >
          <div className="w-[90vw] rounded-lg bg-white p-6 shadow-lg dark:bg-[#000022] md:w-[40vw]">
            <Dialog
              header="Update Category"
              headerClassName="dark:bg-[#000022] shadow-sm shadow-white dark:text-white text-black font-semibold"
              contentClassName="dark:bg-[#000022] dark:text-white text-black"
              visible={visible}
              onHide={() => setVisible(false)}
              style={{ width: "40vw" }}
              breakpoints={{ "960px": "75vw", "641px": "100vw" }}
            >
              <form
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleSubmit}
                className="p-fluid space-y-2 text-start"
              >
                {/* Category Name Input */}
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="mb-1 block text-gray-600 dark:text-gray-300"
                  >
                    Category Name
                  </label>
                  <InputText
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="text-black w-full rounded-lg border p-2 shadow-sm dark:bg-[#000022] dark:text-white"
                    placeholder="E.g., Hot Coffee"
                  />
                </div>

                {/* Category Description Input */}
                <div className="relative">
                  <label
                    htmlFor="description"
                    className="mb-1 block text-gray-600 dark:text-gray-300"
                  >
                    Description
                  </label>
                  <InputTextarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="text-black w-full rounded-lg border p-2 shadow-sm dark:bg-[#000022] dark:text-white"
                    rows={3}
                    placeholder="Description"
                  />
                </div>

                {/* Category Image Upload */}
                <div className="relative">
                  <label
                    htmlFor="image"
                    className="mb-1 block text-gray-600 dark:text-gray-300"
                  >
                    Image
                  </label>
                  <FileUpload
                    id="image"
                    name="demo[]"
                    customUpload
                    contentClassName="dark:bg-[#000022]"
                    headerStyle={{ backgroundColor: "transparent" }}
                    accept="image/*"
                    auto
                    chooseLabel="Choose Image"
                    chooseOptions={{
                      className:
                        "w-full dark:bg-[#000022] border dark:text-white text-black rounded-lg p-2 shadow-sm",
                    }}
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
                      wait ? <Puff className="w-4 text-center" /> : "Update"
                    }
                    className="flex h-[40px] w-full items-center justify-center rounded-lg bg-red-600 p-2 font-bold text-white shadow-lg transition-transform duration-300 ease-in-out hover:bg-red-700"
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
