import React, { useState, useRef, useEffect } from 'react';
import fakeempimage from "../../assets/img/employee.png";
import { FaEllipsisV } from 'react-icons/fa'; // Dropdown icon
import { FaEdit, FaTrash } from 'react-icons/fa'; // Edit and Delete icons

export default function EmployeeCard({ employee }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  const handleDelete = () => {
    console.log('Delete', employee.firstname);
  };

  const handleUpdate = () => {
    console.log('Update', employee.firstname);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Function to render stars based on the rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'text-yellow-500' : 'text-gray-300'}>
        ★
      </span>
    ));
  };

  return (
    <div className='relative flex flex-col items-center w-52 h-[230px] border border-gray-300 dark:border-gray-600 rounded-lg shadow-md bg-white dark:bg-gray-800 transition-shadow duration-300 hover:shadow-lg'>
      {/* Employee Image */}
      <img 
        src={fakeempimage} 
        alt={`${employee.firstname} ${employee.lastname}`} 
        className=' h-28 rounded-t-lg object-cover'
      />
      {/* Employee Info */}
      <div className='flex flex-col items-center p-3'>
        <h2 className='text-lg font-semibold text-gray-900 dark:text-white'>{employee.firstname} {employee.lastname}</h2>
        <div className='flex mb-1'>{renderStars(4)}</div>
        <span className='text-xs text-gray-500 dark:text-gray-400'>312 ratings</span>
      </div>

      {/* Dropdown Menu */}
      <div ref={dropdownRef} className='absolute top-2 right-2'>
        <button onClick={toggleDropdown} className='focus:outline-none text-lg text-gray-700 dark:text-gray-300'>
          <FaEllipsisV />
        </button>
        {dropdownOpen && (
          <div className='absolute right-0 top-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg w-36 z-10'>
            <button 
              onClick={handleUpdate} 
              className='flex items-center w-full text-left px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-300'
            >
              <FaEdit className='mr-2' /> {/* Edit icon */}
              <span className='font-medium'>Update</span>
            </button>
            <button 
              onClick={handleDelete} 
              className='flex items-center w-full text-left px-3 py-1 hover:bg-red-100 dark:hover:bg-red-700 text-red-600 dark:text-red-300'
            >
              <FaTrash className='mr-2' /> {/* Delete icon */}
              <span className='font-medium'>Delete</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
