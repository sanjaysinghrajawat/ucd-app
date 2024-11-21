"use client";
import React, { useState } from "react";

const Dropdown = ({ label, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0].label); // Select first option label by default

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (value, label) => {
    setSelected(label);
    onSelect(value); // Call provided onSelect function with selected value
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className="relative inline-block text-left w-52">
      <label className="block text-xs font-medium text-gray-700 mb-0">
        {label}
      </label>
      <button
        type="button"
        className={`w-full flex items-center justify-between py-1 px-4 bg-gray-100 rounded-lg transition duration-300 text-left text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm ${
          isOpen ? "ring-2 ring-blue-500" : ""
        }`}
        onClick={toggleDropdown}
      >
        <span>{selected}</span>
        <svg
          className={`w-5 h-5 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <ul
          className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto"
        >
          {options.map((option) => (
            <li
              key={option.value}
              className="py-2 px-4 cursor-pointer hover:bg-blue-50 hover:text-blue-700"
              onClick={() => handleSelect(option.value, option.label)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
