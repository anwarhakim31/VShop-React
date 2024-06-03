import React from "react";

const FilterButton = (props) => {
  const { name, id, handleChange, selectedOption } = props;
  return (
    <li className="flex items-center justify-between mb-4">
      <label htmlFor={id} className="text-sm md:text-md font-normal">
        {name}
      </label>
      <input
        id={id}
        type="radio"
        value={id}
        checked={selectedOption === id}
        onChange={handleChange}
        className="w-4 h-4 md:w-5 md:h-5 text-white border-blue-600 bg-blue-600  focus:ring-white cursor-pointer"
      />
    </li>
  );
};

export default FilterButton;
