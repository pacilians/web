import React, { useState } from "react";

export default function Category() {
  const [showForm, setShowForm] = useState(false);

  return (
    <section className="basis-1/2 rounded-3xl bg-base-200 p-10 shadow-2xl">
      <div className="flex items-center justify-between">
        <h1 className="mb-4 text-xl font-bold text-blue-400">
          Business Category
        </h1>
        <button
          className="rounded-full bg-blue-400 px-3 py-1 text-white"
          onClick={() => setShowForm(!showForm)}
        >
          +
        </button>
      </div>
      {showForm && (
        <form className="mt-4">
          <div className="mb-3">
            <label className="mb-2 block text-sm font-bold">
              Business Category Name:
            </label>
            <input
              type="text"
              className="w-full rounded border p-2 text-sm"
              placeholder="Enter business category name"
            />
          </div>
          <button className="rounded-full bg-blue-400 px-3 py-1 text-sm text-white">
            Add
          </button>
        </form>
      )}
      <div className="group badge badge-outline relative hover:text-transparent">
        Government Agency
        <button className="absolute inset-0 flex h-full w-full items-center justify-center rounded-2xl border border-gray-300 text-xs text-gray-600 opacity-0 group-hover:opacity-100">
          x
        </button>
      </div>
      <div className="group badge badge-primary badge-outline relative hover:text-transparent">
        Fund Service
        <button className="absolute inset-0 flex h-full w-full items-center justify-center rounded-2xl border border-blue-500 text-xs text-blue-500 opacity-0 group-hover:opacity-100">
          x
        </button>
      </div>
      <div className="group badge badge-secondary badge-outline relative hover:text-transparent">
        Core
        <button className="absolute inset-0 flex h-full w-full items-center justify-center rounded-2xl border border-gray-500 text-xs text-gray-500 opacity-0 group-hover:opacity-100">
          x
        </button>
      </div>
      <div className="group badge badge-accent badge-outline relative hover:text-transparent">
        Custody
        <button className="absolute inset-0 flex h-full w-full items-center justify-center rounded-2xl border border-red-500 text-xs text-red-500 opacity-0 group-hover:opacity-100">
          x
        </button>
      </div>
    </section>
  );
}
