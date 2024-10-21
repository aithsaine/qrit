import React, { useState, useRef, useEffect } from 'react';
import fakeempimage from "../../assets/img/employee.png";
import { FaEllipsisV } from 'react-icons/fa'; // Importing a vertical ellipsis icon for the dropdown

export default function EmployeeCard({ employee }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  const handleDelete = () => {
    // Handle delete action
    console.log('Delete', employee.firstname);
  };

  const handleUpdate = () => {
    // Handle update action
    console.log('Update', employee.firstname);
  };

  // Function to close dropdown when clicking outside
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
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'text-yellow-500' : 'text-gray-300'}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className='relative flex items-center justify-between w-[350px] h-[200px] border-2 border-black dark:border-gray-600 p-4 rounded-lg shadow-lg bg-white dark:bg-gray-800 transition-colors duration-300'>
      <span className='absolute bottom-1 right-2 text-xs text-gray-700 dark:text-gray-400'>312 rate</span>
      <img 
        src={fakeempimage} 
        alt={`${employee.firstname} ${employee.lastname}`} 
        className='h-full'
      />
      <div className='flex flex-col items-center'>
        <h2 className='text-lg font-semibold text-gray-900 dark:text-white'>{employee.firstname} {employee.lastname}</h2>
        <div className='flex'>{renderStars(4)}</div>
      </div>
      <div ref={dropdownRef} className='relative'>
        <button onClick={toggleDropdown} className='focus:outline-none text-lg text-gray-700 dark:text-gray-300'>
          <FaEllipsisV />
        </button>
        {dropdownOpen && (
          <div className='absolute right-0 top-full mt-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg w-40 z-10'>
            <button 
              onClick={handleUpdate} 
              className='block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-300'
            >
              Update
            </button>
            <button 
              onClick={handleDelete} 
              className='block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-300'
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
