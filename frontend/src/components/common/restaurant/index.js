import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./RestaurantDetailPage.css"; // Create and style this file

const Restaurant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [prevRestaurant, setPrevRestaurant] = useState(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/restaurant/${id}`
        );
        setRestaurant(response.data);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };

    const fetchPreviousRestaurant = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/restaurants?page=1&limit=10"
        );
        const restaurants = response.data.restaurants;
        const currentIndex = restaurants.findIndex(
          (r) => r["Restaurant ID"] === parseInt(id)
        );
        setPrevRestaurant(restaurants[currentIndex - 1] || null);
      } catch (error) {
        console.error("Error fetching previous restaurant data:", error);
      }
    };

    fetchRestaurant();
    fetchPreviousRestaurant();
  }, [id]);

  if (!restaurant) return <p>Loading...</p>;

  const {
    "Restaurant Name": name,
    featured_image: coverImg,
    "Average Cost for two": approxPrice,
    "Aggregate rating": rating,
    "Rating text": ratingText,
    Address: address,
    Cuisines: cuisine, // Assuming cuisine is here
    "Is delivering now": isDelivering, // Assuming delivery status
    photos_url: photosUrl,
    menu_url: menuUrl,
    url: restaurantUrl,
  } = restaurant;

  const fallbackImage = prevRestaurant
    ? prevRestaurant["featured_image"]
    : null;

  return (
    <div className="restaurant-detail">
      <div className="featured-image">
        <img
          src={coverImg || fallbackImage}
          alt={name}
          className="featured-image-img"
        />
      </div>

      <div className="restaurant-info">
        <h1 className="restaurant-name">{name}</h1>
        <p className="restaurant-cuisine">{cuisine}</p>
        <p className="restaurant-address">{address}</p>
        <button className={`delivery-status ${isDelivering ? "green" : "red"}`}>
          {isDelivering ? "Delivering Now" : "Not Delivering"}
        </button>

        <div className="action-buttons">
          <button className="action-btn">
            <i className="icon-direction"></i> Direction
          </button>
          <button className="action-btn">
            <i className="icon-bookmark"></i> Bookmark
          </button>
          <button className="action-btn">
            <i className="icon-share"></i> Share
          </button>
        </div>
      </div>

      <div className="restaurant-bottom-buttons">
        <a
          href={menuUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
        >
          Menu
        </a>
        <a
          href={photosUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
        >
          Photos
        </a>
        <a
          href={restaurantUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
        >
          Order Online
        </a>
      </div>
    </div>
  );
};

export default Restaurant;