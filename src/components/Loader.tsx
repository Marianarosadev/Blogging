import React from 'react';
import '../styles/components/Loader.css'

const Loader: React.FC = () => {
  return (
    <div className='loader'>
      <div className='loader__spin'></div>
    </div>
  );
};

export default Loader;