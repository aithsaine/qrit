import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { motion } from 'framer-motion';
import { Puff } from 'react-loading-icons';
import { toast } from 'sonner';
import api from 'helpers/api';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../../redux/actionCreators';

export default function NewEmployeeModal() {
  const [visible, setVisible] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [cin, setCin] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState(null);
  const [hiringDate, setHiringDate] = useState(null);
  const [address, setAddress] = useState('');
  const [wait, setWait] = useState(false);
  const dispatch = useDispatch();

  // Handle form submission
  const store = async () => {
    try {
      const { data } = await api.post(
        'api/employee/store',     { firstname, lastname, cin, phone, birthday, hiring_date: hiringDate, address },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (data) {
        dispatch(addEmployee(data.employee));
        setFirstname('');
        setLastname('');
        setCin('');
        setPhone('');
        setBirthday(null);
        setHiringDate(null);
        setAddress('');
        setVisible(false)
        return toast.success(data.message);
      }
    } catch (error) {
      if(error.response.data)
      {
        if(error.response.data.firstname)
      return toast.error(error.response.data.firstname[0]);
        if(error.response.data.lastname)
          return toast.error(error.response.data.lastname[0]);
        if(error.response.data.cin)
          return toast.error(error.response.data.cin[0]);
        if(error.response.data.phone)
          return toast.error(error.response.data.phone[0]);
        if(error.response.data.birthday)
          return toast.error(error.response.data.birthday[0]);
        if(error.response.data.hiring_date)
          return toast.error(error.response.data.hiring_date[0]);
        if(error.response.data.address)
          return toast.error(error.response.data.address[0]);
    
    
    
    
    
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
    <div className="w-full justify-center items-center">
      {/* Button to trigger the modal */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          label="Add Employee"
          className="relative w-full py-2 px-6 bg-[#EF233C] text-white font-semibold rounded-lg shadow-lg hover:bg-[#D90429] transition-transform duration-300 ease-in-out"
          icon="pi pi-external-link"
          onClick={() => setVisible(true)}
        />
      </motion.div>
      {/* Modal */}
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 150 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex items-center backdrop-blur-md justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white  dark:bg-gray-900 rounded-lg shadow-lg p-6 w-[90vw] md:w-[40vw]">
            <Dialog
              header="New Employee"
              className="text-center  text-sm font-bold text-gray-800"
              visible={visible}
              onHide={() => {
                setVisible(false);
                setFirstname('');
                setLastname('');
                setCin('');
                setPhone('');
                setBirthday(null);
                setHiringDate(null);
                setAddress('');
              }}
              style={{ width: '40vw' }}
              breakpoints={{ '960px': '75vw', '641px': '100vw' }}
            >
              <form onSubmit={handleSubmit} className="p-fluid text-start space-y-4">
                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <label htmlFor="firstname" className="block text-gray-600 mb-1">
                      First Name
                    </label>
                    <InputText
                      id="firstname"
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                      className="w-full border rounded-lg p-2 shadow-sm"
                      placeholder="First Name"
                    />
                  </div>
                  <div className="relative">
                    <label htmlFor="lastname" className="block text-gray-600 mb-1">
                      Last Name
                    </label>
                    <InputText
                      id="lastname"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                      className="w-full border rounded-lg p-2 shadow-sm"
                      placeholder="Last Name"
                    />
                  </div>
                </div>

                {/* CIN & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <label htmlFor="cin" className="block text-gray-600 mb-1">
                      CIN
                    </label>
                    <InputText
                      id="cin"
                      value={cin}
                      onChange={(e) => setCin(e.target.value)}
                      className="w-full border rounded-lg p-2 shadow-sm"
                      placeholder="CIN"
                    />
                  </div>
                  <div className="relative">
                    <label htmlFor="phone" className="block text-gray-600 mb-1">
                      Phone
                    </label>
                    <InputText
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border rounded-lg p-2 shadow-sm"
                      placeholder="Phone"
                    />
                  </div>
                </div>

                {/* Birthday & Hiring Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <label htmlFor="birthday" className="block text-gray-600 mb-1">
                      Birthday
                    </label>
                    <Calendar
                      id="birthday"
                      value={birthday}
                      onChange={(e) => setBirthday(e.value)}
                      showIcon
                      className="w-full border rounded-lg p-2 shadow-sm"
                      placeholder="Select Birthday"
                    />
                  </div>
                  <div className="relative">
                    <label htmlFor="hiring_date" className="block text-gray-600 mb-1">
                      Hiring Date
                    </label>
                    <Calendar
                      id="hiring_date"
                      value={hiringDate}
                      onChange={(e) => setHiringDate(e.value)}
                      showIcon
                      className="w-full border rounded-lg p-2 shadow-sm"
                      placeholder="Select Hiring Date"
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="relative">
                  <label htmlFor="address" className="block text-gray-600 mb-1">
                    Address
                  </label>
                  <InputTextarea
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full border rounded-lg p-2 shadow-sm"
                    rows={3}
                    placeholder="Address"
                  />
                </div>

                {/* Submit Button */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    label={wait ? <Puff className="w-4 text-center" /> : 'Add Employee'}
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
