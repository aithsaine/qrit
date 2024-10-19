import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { FileUpload } from 'primereact/fileupload';
import { classNames } from 'primereact/utils';
import { motion } from 'framer-motion';
import { Puff } from "react-loading-icons"
import { toast } from 'sonner';
import api from 'helpers/api';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../../redux/actionCreators';

export default function NewCategoryModal() {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [wait, setWait] = useState(false)
  const dispatch  = useDispatch()

  // Handle form submission

  const store = async () => {
    try {
      const { data } = await api.post("api/category/store", { name, description, image },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
        },
        }
      )
      if (data) {
        dispatch(addCategory(data.category))
        setName('');
      setDescription('');
     setImage(null);
        return toast.success(data.message)
      }
    } catch (error) {
      if(error.response.data.name){
      return toast.error(error.response.data.name[0])
      }
      if(error.response.data.description){
        return toast.error(error.response.data.description[0])
        }

        if(error.response.data.image){
          return toast.error(error.response.data.image[0])
          }
    

      return toast.error("somethink went wrong")

    } finally {
      setWait(false)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setWait(true)

    store()


  };

  // Handle image upload
  const onUpload = (e) => setImage(e.files[0]);
  return (
    <div className="flex justify-center items-center">
      {/* Button to trigger the modal */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          label="Ajouter une catégorie"
          className="relative py-2 px-6 bg-[#EF233C] text-white font-semibold rounded-lg shadow-lg hover:bg-[#D90429] transition-transform duration-300 ease-in-out"
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
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90vw] md:w-[40vw]">
            <Dialog
              header="Nouvelle Catégorie"
              className="text-center  text-sm font-bold text-gray-800"
              visible={visible}
              onHide={() => {setVisible(false)
                setName('');
                setDescription('');
               setImage(null);
              }}
              style={{ width: '40vw' }}
              breakpoints={{ '960px': '75vw', '641px': '100vw' }}
            >
              <form onSubmit={handleSubmit} className="p-fluid text-start space-y-2">
                {/* Category Name Input */}
                <div className="relative">
                  <label
                    htmlFor="name"
                    className={classNames('block text-gray-600 mb-1')}
                  >
                    Nom de la catégorie
                  </label>
                  <InputText
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={classNames('w-full border rounded-lg p-2 shadow-sm')}
                    placeholder="Ex : Café chaud"
                  />
                </div>

                {/* Category Description Input */}
                <div className="relative">
                  <label
                    htmlFor="description"
                    className={classNames('block text-gray-600 mb-1')}
                  >
                    Description
                  </label>
                  <InputTextarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={classNames('w-full border rounded-lg p-2 shadow-sm')}
                    rows={3}
                    placeholder="Description"
                  />

                </div>

                {/* Category Image Upload */}
                <div className="relative">
                  <label
                    htmlFor="image"
                    className={classNames('block text-gray-600 mb-1')}
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
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    label={wait ? <Puff className='w-4 text-center' /> : "Ajoute"}
                    className="w-full bg-[#EF233C] p-2 h-[40px] flex items-center justify-center text-white font-bold rounded-lg shadow-lg hover:bg-[#D90429] transition-transform duration-300 ease-in-out"
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
