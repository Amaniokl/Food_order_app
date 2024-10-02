// common/filters/filterItem

import React from "react";
import "../filterItem/filterItem.css";

const FilterItem = ({ filter, isSelected, onClick }) => {
  return (
    <div className={`filter-item ${isSelected ? 'selected' : ''}`} onClick={onClick} >
      {filter.icon && filter.icon}
      <div className="filter-name">{filter.title}</div>
    </div>
  );
};

export default FilterItem;
