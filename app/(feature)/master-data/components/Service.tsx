import React, { useState } from 'react';

export default function Service() {
  const [showForm, setShowForm] = useState(false);

  return (
    <section className="basis-1/2 rounded-3xl bg-base-200 p-10 shadow-2xl">
      <div className="flex items-center justify-between">
        <h1 className="mb-4 text-xl font-bold text-blue-400">Service</h1>
        <button 
          className="bg-blue-400 text-white px-3 py-1 rounded-full"
          onClick={() => setShowForm(!showForm)}
        >
          +
        </button>
      </div>
      {showForm && (
        <form className="mt-4">
          <div className="mb-3">
            <label className="block mb-2 text-sm font-bold">Service Name:</label>
            <input type="text" className="w-full p-2 border rounded text-sm" placeholder="Enter service name" />
          </div>
          <button className="bg-blue-400 text-white text-sm px-3 py-1 rounded-full">Add</button>
        </form>
      )}
      <div className="relative group badge badge-outline hover:text-transparent">
        Insurance
        <button className="absolute inset-0 border border-gray-300 text-gray-600 rounded-2xl w-full h-full text-xs opacity-0 group-hover:opacity-100 flex items-center justify-center">x</button>
      </div>
      <div className="relative group badge badge-primary badge-outline hover:text-transparent">
        Asset
        <button className="absolute inset-0 border border-blue-500 text-blue-500 rounded-2xl w-full h-full text-xs opacity-0 group-hover:opacity-100 flex items-center justify-center">x</button>
      </div>
      <div className="relative group badge badge-secondary badge-outline hover:text-transparent">
        Management
        <button className="absolute inset-0 border border-gray-500 text-gray-500 rounded-2xl w-full h-full text-xs opacity-0 group-hover:opacity-100 flex items-center justify-center">x</button>
      </div>
      <div className="relative group badge badge-accent badge-outline hover:text-transparent">
        Security
        <button className="absolute inset-0 border border-red-500 text-red-500 rounded-2xl w-full h-full text-xs opacity-0 group-hover:opacity-100 flex items-center justify-center">x</button>
      </div>

      
    </section>
  );
}
