import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurants } from "../../../redux/slices/restaurantSlice";
import ExploreCard from "./exploreCard";
import "./exploreSection.css";

const ExploreSection = ({ collectionName }) => {
  const dispatch = useDispatch();
  const { restaurants, status, error, filters } = useSelector(
    (state) => state.restaurants
  );

  const [page, setPage] = useState(1); // Start from page 1

  // Function to fetch restaurants
  const loadRestaurants = () => {
    dispatch(fetchRestaurants({ 
      page, 
      limit: 10, 
      countryCode: filters.countryCode, 
      cuisines: filters.cuisines, 
      rating: filters.rating 
    }));
  };

  // Fetch restaurants when component mounts or filters change
  useEffect(() => {
    setPage(1); // Reset page number when filters change
    loadRestaurants();
  }, [filters]); // Dependency on filters

  useEffect(() => {
    if (page > 1) {
      loadRestaurants();
    }
  }, [page]);

  const loadMoreRestaurants = () => {
    if (status !== "loading") {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Infinite scroll logic
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const currentScroll = window.innerHeight + window.scrollY;
      if (currentScroll + 100 >= scrollHeight) {
        // Buffer for scroll trigger
        loadMoreRestaurants();
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, status]);

  if (status === "loading" && restaurants.length === 0) return <p>Loading...</p>;
  if (status === "failed") return <p>{error}</p>;

  return (
    <div className="max-width explore-section">
      <div className="collection-title">{collectionName}</div>
      <div className="explore-grid">
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <ExploreCard
              key={restaurant["Restaurant ID"]}
              unique_id={restaurant["Restaurant ID"]}
              restaurant={restaurant}
              restaurants={restaurants}
            />
          ))
        ) : (
          <p>No restaurants found</p>
        )}
      </div>
    </div>
  );
};

export default ExploreSection;
