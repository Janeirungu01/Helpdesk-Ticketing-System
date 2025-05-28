import { useState } from "react";

const DateSearchForm = ({ onSearch, initialStartDate, initialEndDate }) => {
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);

  const handleSearch = () => {
    onSearch(startDate, endDate);
  };

  return (
    <fieldset className="border border-gray-400 p-4 rounded-lg mb-6 shadow-sm bg-white bg-opacity-80 max-w-4xl mx-auto">
        <legend className="text-xl font-semibold px-2">Search By</legend>
        <div className="mb-6 flex flex-wrap justify-center gap-6 md:gap-4">
          <div>
            <label className="text-gray-700 font-medium whitespace-nowrap mr-3">
              Start Date:
            </label>
            <input
              type="date"
              value={startDate}
              max={endDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border font-semibold border-gray-500 rounded px-4 py-2 bg-blue-300 flex-1"
            />
          </div>
          <div>
            <label className="text-gray-700 font-medium whitespace-nowrap mr-3">
              End Date:
            </label>
            <input
              type="date"
              value={endDate}
              min={startDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border font-semibold border-gray-500 rounded px-4 py-2 bg-blue-300 flex-1"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleSearch}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 font-medium transition-colors"
          >
            Search / Refresh
          </button>
        </div>
      </fieldset>
  );
};

export default DateSearchForm;