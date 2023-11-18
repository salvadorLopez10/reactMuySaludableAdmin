import React from 'react'

export const ErrorModalAlimento = ({ children }) => {
  return (
    <div className="bg-red-500 text-white text-center p-3 mb-3 rounded-md my-3">
      <p className="bg-red-500">{children}</p>
    </div>
  );
};
