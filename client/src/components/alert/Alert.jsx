import React, { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

const Alert = ({ message }) => {
  const [close, setClose] = useState(false);
  return (
    <div className='mt-5'>
      {close || (
        <div className='bg-yellow-100 border border-yellow-400 text-yellow-700 pl-4 pr-10 py-3 rounded relative w-full' role='alert'>
          <span className='block sm:inline text-lg font-semibold'>{message}</span>
          <span className='absolute top-0 bottom-0 right-0 px-4 py-3' role='button' onClick={() => setClose(true)}>
            <IoCloseOutline size={24} />
          </span>
        </div>
      )}
    </div>
  );
};

export default Alert;
