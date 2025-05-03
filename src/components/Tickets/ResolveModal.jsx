import React from "react";

const ResolveModal = ({ showModal, onClose, onConfirm }) => {
  if (!showModal) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md text-center">
        <p>Are you sure you want to mark this ticket as resolved?</p>
        <div className="mt-4">
          <button onClick={onConfirm} className="bg-green-500 text-white px-4 py-2 rounded mr-2">Yes</button>
          <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded">No</button>
        </div>
      </div>
    </div>
  );
};

export default ResolveModal;