import React from 'react';
import './title.css';

export default function Title({ children, onClick }) {
  return (
    <div onClick={onClick} className='list-title'>
      {children}
    </div>
  );
}
