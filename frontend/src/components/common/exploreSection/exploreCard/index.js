import React from "react";
import "./exploreCard.css";
import { Link } from "react-router-dom";

const ExploreCard = ({unique_id, restaurant,restaurants }) => {
  const name = restaurant["Restaurant Name"] ;
  let coverImg = restaurant["featured_image"];

  // If the current restaurant doesn't have an image, pick a random restaurant with a featured image
  if (!coverImg) {
    const availableImages = restaurants
      .map((rest) => rest["featured_image"])
      .filter((img) => img); // Filter out empty images
    if (availableImages.length > 0) {
      coverImg =
        availableImages[Math.floor(Math.random() * availableImages.length)];
    }
  }

  // const deliveryTime = restaurant?.order?.deliveryTime;
  const rating = restaurant["Aggregate rating"];
  const approxPrice = restaurant["Average Cost for two"];
  // const cuisines = restaurant?.Cuisines
  //   ?.map((item) => item.name)
  //   .slice(0, 3);
  // const bottomContainers = restaurant?.bottomContainers;

  return (
    <Link to={`/restaurant/${unique_id}`} style={{ textDecoration: 'none', color: 'inherit' }} className="explore-card cur-po">
      <div className="explore-card-cover">
        <img src={coverImg} alt={name} className="explore-card-image" />
        {/* <div className="delivery-time">{deliveryTime}</div> */}
        {/* {proOff && <div className="pro-off">{proOff}</div>} */}
        {/* {goldOff && <div className="gold-off absolute-center">{goldOff}</div>} */}
        {/* {discount && <div className="discount absolute-center">{discount}</div>} */}
      </div>
      <div className="res-row">
        <div className="res-name">{name}</div>
        {rating && (
          <div className="res-rating absolute-center">
            {rating} <i className="fi fi-rr-star absolute-center"></i>
          </div>
        )}
      </div>
      <div className="res-row">
        {/* {cuisines.length && (
          <div className="res-cuisine">
            {cuisines.map((item, indx) => {
              return (
                <span className="res-cuisine-tag">
                  {item}
                  {indx !== cuisines.length - 1 && ","}
                </span>
              );
            })}
          </div>
        )} */}
        {/* ------------ ADD a small logo here --------- */}
        {approxPrice ? (
          <div className="res-price"> ₹{approxPrice} for two</div>
        ) : (
          
          <div className="res-price"> Price not available</div>
        )}
      </div>

{/* ------------ Implement Bottom Containers. */}

    </Link>
  );
};

export default ExploreCard;
