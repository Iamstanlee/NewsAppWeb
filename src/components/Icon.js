import React from 'react';

const Icon = ({ source, onClick, className, style }) => {
  return (
    <img
      src={source}
      className={className}
      onClick={onClick}
      alt="icon"
      style={{
        height: '20px',
        width: '20px',
        cursor: 'pointer',
        ...style
      }}
    />
  );
};
export default Icon;
