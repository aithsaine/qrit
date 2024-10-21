import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { motion } from 'framer-motion';
import { Puff } from 'react-loading-icons';
import { toast } from 'sonner';
import api from 'helpers/api';
import { useDispatch } from 'react-redux';
import { addTable } from '../../redux/actionCreators';

export default function NewTableModal() {
  const [visible, setVisible] = useState(false);
  const [tableNumber, setTableNumber] = useState('');
  const [wait, setWait] = useState(false);
  const dispatch = useDispatch();

  // Handle form submission
  const store = async () => {
    try {
      const { data } = await api.post(
        'api/table/store',
        { num_table: tableNumber },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      if (data) {
        dispatch(addTable(data.table));
        setTableNumber('');
        setVisible(false)
        return toast.success(data.message);
      }
    } catch (error) {
      if (error.response?.data?.num_table) {
        return toast.error(error.response.data.num_table[0]);
      }
      return toast.error('Something went wrong');
    } finally {
      setWait(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setWait(true);
    store();
  };

  return (
    <div className="flex justify-center items-center">
      {/* Button to trigger the modal */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          label="Ajouter une table"
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
          onClick={() => setVisible(false)} // Close when clicking outside modal
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-[90vw] md:w-[40vw]"
            onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
          >
            <Dialog
              header="Ajouter une Table"
              className="text-center text-sm font-bold text-gray-800"
              visible={visible}
              onHide={() => setVisible(false)}
              style={{ width: '40vw' }}
              breakpoints={{ '960px': '75vw', '641px': '100vw' }}
              dismissableMask
            >
              <form onSubmit={handleSubmit} className="p-fluid text-start space-y-2">
                {/* Table Number Input */}
                <div className="relative">
                  <label
                    htmlFor="tableNumber"
                    className="block text-gray-600 mb-1"
                  >
                    Numéro de Table
                  </label>
                  <InputText
                    id="tableNumber"
                    value={tableNumber}Table
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="w-full border rounded-lg p-2 shadow-sm"
                    placeholder="Ex: 5"
                  />
                </div>

                {/* Submit Button */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    label={wait ? <Puff className="w-4 text-center" /> : 'Ajouter'}
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
