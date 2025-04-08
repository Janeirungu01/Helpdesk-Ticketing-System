import React from "react";

const Dashboard = () => {
  return (
    <div className="bg-white bg-cover flex flex-col items-center p-8 text-gray-600">
      <h1 className="text-3xl font-bold mb-6">View Tickets</h1>

      <form>
        <fieldset className="border border-gray-400 p-4">
          <legend className="text-xl font-bold text-black px-2">
            Search By
          </legend>

          <div className="grid grid-cols-3 gap-4 mt-4 items-center">
            <div className="col-span-3 flex items-center gap-2">
              <label className="font-semibold">Date of Ticket Between :</label>
              <input
                type="date"
                defaultValue="2025-01-01"
                className="border border-gray-400 px-2 py-1 rounded"
              />
              <span>And :</span>
              <input
                type="date"
                defaultValue="2025-04-07"
                className="border border-gray-400 px-2 py-1 rounded"
              />
            </div>

            <div>
              <label className="block font-semibold">Ticket No.</label>
              <input
                type="text"
                className="w-full border border-gray-400 px-2 py-1 rounded"
              />
            </div>

            <div>
              <label className="block font-semibold">Category</label>
              <select className="w-full border border-gray-400 px-2 py-1 rounded">
                <option>All </option>
                <option>Hardware problem </option>
                <option>Software problem </option>
                <option>Email Problem </option>
              </select>
            </div>

            <div>
              <label className="block font-semibold">Branch</label>
              <select className="w-full border border-gray-400 px-2 py-1 rounded">
                <option>TASSIA BRANCH</option>
                <option>FEDHA BRANCH</option>
                <option>UTAWALA BRANCH</option>
                <option>MACHAKOS BRANCH</option>
                <option>KITENGELA BRANCH</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-center text-gray-600">
            <button
              type="submit"
              className="bg-white text-black border border-gray-400 px-6 py-2 rounded hover:bg-gray-100 font-semibold"
            >
              Search
            </button>
          </div>
        </fieldset>
      </form>
      <h3>dghdfhjkjkdd fff</h3>
    </div>
  );
};

export default Dashboard;
