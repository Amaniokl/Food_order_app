// common/filters
import React, {useState, useEffect} from "react";
import "../filters/filters.css";
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, fetchRestaurants,clearRestaurants, resetPage } from '../../../redux/slices/restaurantSlice';
import FilterItem from "./filterItem";

const Filters = ({ filterList }) => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.restaurants);
  const [selectedFilters, setSelectedFilters] = useState({});


  // useEffect(() => {
  //   // Fetch restaurants based on updated filters whenever filters change
  //   dispatch(fetchRestaurants({ ...filters, page: 1, limit: 10 }));
  // }, [filters, dispatch]);
  useEffect(() => {
    // Fetch restaurants based on updated filters whenever filters change
    dispatch(clearRestaurants()); // Clear restaurants before fetching new ones
    dispatch(fetchRestaurants({ ...filters, page: 1, limit: 10 }));
  }, [filters, dispatch]);

  
  const handleFilterChange = (filter) => {
    // const newFilters = { ...filters, [filter.title]: filter.value }; // Adjust based on your filter values

    const newFilters = { ...filters };
    if (selectedFilters[filter.title]) {
      delete newFilters[filter.title];
      setSelectedFilters((prev) => ({ ...prev, [filter.title]: false }));
    } else {
      newFilters[filter.title] = filter.value; // Adjust value based on filter type
      setSelectedFilters((prev) => ({ ...prev, [filter.title]: true }));
    }

    console.log(`title ${filter.title} selected`)

    // dispatch(setFilters(newFilters));
    // dispatch(fetchRestaurants(newFilters));
    if (filter.title === '4.0+') {
      newFilters.rating = 4;
    } else {
      newFilters.rating = filters.rating; // Keep existing rating if other filters
    }

    dispatch(clearRestaurants()); // Clear current restaurants
    dispatch(setFilters(newFilters));
    dispatch(resetPage()); // Reset page number to 1
    dispatch(fetchRestaurants(newFilters));

  };


  
  
  return (
    <div className="filters">
      {filterList &&
        filterList.map((filter) => {
          return <FilterItem key={filter.id} filter={filter} isSelected={!!selectedFilters[filter.title]}  onClick={() => handleFilterChange(filter)} />;
        })}
    </div>
  );
};

export default Filters;
