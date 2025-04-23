import React from 'react';

const PromptBanner = ({ prompt, onClear }) => {
  if (!prompt) return null;

  return (
    <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md shadow-md mb-4">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold">Reopen Reason:</p>
          <p>{prompt}</p>
        </div>
        <button
          className="text-sm text-red-500 hover:underline ml-4"
          onClick={onClear}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default PromptBanner;