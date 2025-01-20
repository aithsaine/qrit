import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const EyeToggleButton = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleFeature = () => {
    setIsEnabled((prev) => !prev);
  };

  return (
    <button className='hover:text-sky-300'>

   {/* <FaEyeSlash/> */}
   <FaEye/>
    </button>
  );
};

export default EyeToggleButton;
