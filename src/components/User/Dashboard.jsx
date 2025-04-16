import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { date: "Apr 1", tickets: 5 },
  { date: "Apr 2", tickets: 8 },
  { date: "Apr 3", tickets: 4 },
  { date: "Apr 4", tickets: 7 },
  { date: "Apr 5", tickets: 6 },
  { date: "Apr 6", tickets: 10 },
  { date: "Apr 7", tickets: 3 },
];

const Dashboard = () => {
  return (
    <>
      <div>
        <div className="  text-gray-600 ">
          <h1 className="text-xl font-bold mb-2 px-4">Dashboard</h1>

          {/* <form>
          <fieldset className="border border-gray-400 p-6">
            <legend className="text-xl font-bold px-2">Search By</legend>

            <div className="grid grid-cols-3 gap-4 mt-2 items-center">
              <div className="col-span-3 flex items-center gap-6">
                <label className="font-semibold">
                  Date of Ticket Between :
                </label>
                <input
                  type="date"
                  defaultValue="2025-01-01"
                  className="border border-gray-400 px-2 py-1 rounded"
                />
                <span className="">And :</span>
                <input
                  type="date"
                  defaultValue="2025-04-09"
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

            <div className="mt-4 flex justify-center text-gray-600">
              <button
                type="submit"
                className="bg-white border border-gray-400 px-6 py-2 rounded hover:bg-gray-100 font-semibold"
              >
                Search
              </button>
            </div>
          </fieldset>
        </form> */}

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
              <h3 className="text-base/8  text-gray-600">Open Tickets</h3>
              <p className="text-xl font-semibold mt-4 text-black">120</p>
              <button className="mt-4 px-2 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                View Details
              </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
              <h3 className="text-base  text-gray-600">Pending Tickets</h3>
              <p className="text-xl font-semibold mt-4 text-black">85</p>
              <button className="mt-4 px-2 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                View Details
              </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
              <h3 className="text-base  text-gray-600">Resolved Tickets</h3>
              <p className="text-xl font-semibold mt-4 text-black">50</p>
              <button className="mt-4 px-2 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                View Details
              </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
              <h3 className="text-base text-gray-600">Closed Tickets</h3>
              <p className="text-xl font-semibold mt-4 text-black">15</p>
              <button className="mt-4 px-2 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                View Details
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white pl-10 mt-4 rounded shadow w-full max-w-4xl ">
          <h2 className="text-sm text-bold mb-4 p-4 text-gray-600">
            Tickets Raised in April
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="tickets"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
