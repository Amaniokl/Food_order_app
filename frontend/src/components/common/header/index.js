// common/header
import React, { useState, useEffect } from "react";
import "../header/header.css";
import {
  setCountryCode,
  fetchRestaurants,
  setCuisine,
  setRadius,
  setUserLocation,
  fetchRestaurantsByLocation,
  clearNoRestaurantsMessage,
} from "../../../redux/slices/restaurantSlice";
import { useDispatch, useSelector } from "react-redux";

const countries = [
  { code: 1, name: "India" },
  { code: 14, name: "Australia" },
  { code: 30, name: "Brazil" },
  { code: 37, name: "Canada" },
  { code: 94, name: "Indonesia" },
  { code: 148, name: "New Zealand" },
  { code: 162, name: "Phillipines" },
  { code: 166, name: "Qatar" },
  { code: 184, name: "Singapore" },
  { code: 189, name: "South Africa" },
  { code: 191, name: "Sri Lanka" },
  { code: 208, name: "Turkey" },
  { code: 214, name: "UAE" },
  { code: 215, name: "United Kingdom" },
  { code: 216, name: "United States" },
];
const cuisines = [
  "American",
  "Asian",
  "Bakery",
  "BBQ",
  "Beverages",
  "Biryani",
  "Burger",
  "Cafe",
  "Continental",
  "Desserts",
  "European",
  "Fast Food",
  "Gujarati",
  "Ice Cream",
  "Italian",
  "Japanese",
  "Lebanese",
  "Mediterranean",
  "Mexican",
  "Mithai",
  "Mughlai",
  "North Indian",
  "Seafood",
  "South Indian",
  "Street Food",
  "Thai",
  "Vietnamese",
];

const radiusOptions = [0, 200, 300, 400, 500];

const Header = () => {
  const dispatch = useDispatch();

  const { latitude, longitude, radius, noRestaurantsMessage } = useSelector(
    (state) => state.restaurants.filters
  );

  const selectedCountryCode = useSelector(
    (state) => state.restaurants.filters.countryCode
  );
  const [selectedCountry, setSelectedCountry] = useState(
    countries.find((country) => country.code === selectedCountryCode)?.name ||
      ""
  );
  const [countryCountry, setcountryCountry] = useState(selectedCountryCode);

  const selectedCuisine = useSelector(
    (state) => state.restaurants.filters.cuisine
  );
  const [selectedCuisineState, setSelectedCuisineState] = useState(
    selectedCuisine || ""
  );

  const [selectedRadius, setSelectedRadius] = useState(radius);
  const [showPopup, setShowPopup] = useState(false);

  // const handleRadiusChange = (e) => {
  //   const selectedRadius = parseInt(e.target.value);
  //   setSelectedRadius(selectedRadius);
  //   dispatch(setRadius(selectedRadius));
  //   // Fetch restaurants based on user's location and selected radius
  //   if (latitude && longitude && selectedRadius > 0) {
  //     dispatch(
  //       fetchRestaurantsByLocation({
  //         lat: latitude,
  //         lng: longitude,
  //         radius: selectedRadius,
  //       })
  //     );
  //   }
  // };

  const handleRadiusChange = (e) => {
    const selectedRadius = parseInt(e.target.value);
    setSelectedRadius(selectedRadius);
    dispatch(setRadius(selectedRadius));
    if (latitude && longitude) {
      dispatch(
        fetchRestaurantsByLocation({
          lat: latitude,
          lng: longitude,
          radius: selectedRadius,
        })
      )
        .then((result) =>
          console.log("Fetch Restaurants by Location Result:", result)
        )
        .catch((error) =>
          console.error("Error fetching restaurants by location:", error)
        );
    }
  };
  // ------- for far away results write something on the frontend

  useEffect(() => {
    if (noRestaurantsMessage) {
      setShowPopup(true); // Show the popup if no restaurants found
    }
  }, [noRestaurantsMessage]);
  // Get user's location when the component mounts
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        dispatch(setUserLocation({ latitude, longitude }));
        // Fetch restaurants near user's location
        if (radius > 0) {
          dispatch(
            fetchRestaurantsByLocation({
              lat: latitude,
              lng: longitude,
              radius,
            })
          );
        }
      },
      (error) => console.error("Error getting location:", error)
    );
  }, [dispatch, radius]);

  const handleClosePopup = () => {
    setShowPopup(false);
    dispatch(clearNoRestaurantsMessage());
  };

  const handleCountryChange = (e) => {
    const selectedName = e.target.value;
    const selectedCode = countries.find(
      (country) => country.name === selectedName
    ).code;
    setcountryCountry(selectedCode);
    setSelectedCountry(selectedName);
    dispatch(setCountryCode(selectedCode)); // Update Redux store
    dispatch(fetchRestaurants({ countryCode: selectedCode })); // Fetch restaurants based on selected country
  };

  const handleCuisineChange = (e) => {
    const selectedCuisine = e.target.value;
    console.log("Selected Cuisine:", selectedCuisine); // Check selected cuisine
    setSelectedCuisineState(selectedCuisine); // Update local state
    dispatch(setCuisine(selectedCuisine)); // Dispatch cuisine to Redux
    dispatch(
      fetchRestaurants({
        countryCode: countryCountry,
        cuisines: selectedCuisine, // Ensure this matches API expectations
      })
    )
      .then((result) => {
        console.log("Fetch Restaurants Result:", result);
      })
      .catch((error) => {
        console.error("Error fetching restaurants:", error);
      });
  };

  // useEffect(() => {}, [handleCountryChange,countryCountry,selectedCountry]);

  return (
    <div className="max-width header">
      <img
        src="https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png"
        alt="Zomato-logo"
        className="header-logo"
      />
      <div className="header-right">
        <div className="header-location-search-container">
          <div className="location-wrapper">
            <div className="location-icon-name">
              <i className="fi fi-rr-marker absolute-center location-icon"></i>
              <select
                className="country-select"
                value={selectedCountry}
                onChange={handleCountryChange}
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="location-wrapper">
            <div className="location-icon-name">
              <i className="fi fi-rr-utensils absolute-center cuisine-icon"></i>
              <select
                className="cuisine-select"
                value={selectedCuisineState} // Bind to local state
                onChange={handleCuisineChange} // Handle cuisine change
              >
                <option value="">Select Cuisine</option> {/* Default option */}
                {cuisines.map((cuisine, index) => (
                  <option key={index} value={cuisine}>
                    {cuisine}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* <div className="location-search-separator"></div>
          <div className="header-searchBar">
            <i class="fi fi-rr-search absolute-center search-icon"></i>
            <input
              placeholder="Search for restaurant, cuisine or a dish"
              className="search-input"
            />
          </div> */}
          <div className="location-wrapper">
            <div className="location-icon-name">
              <i className="fi fi-rr-map-marker absolute-center radius-icon"></i>
              {/* <select
                className="radius-select"
                value={selectedRadius}
                onChange={handleRadiusChange}
              >
                {radiusOptions.map((radius) => (
                  <option key={radius} value={radius}>
                    {radius === 0 ? "Select Radius" : `Less than ${radius} km`}
                  </option>
                ))}
              </select> */}

              <div className="slider-container">
                <label htmlFor="radius-slider">
                  Radius: {selectedRadius} km
                </label>
                <input
                  id="radius-slider"
                  type="range"
                  min="10"
                  max="400"
                  step="10"
                  value={selectedRadius}
                  onChange={handleRadiusChange}
                  className="radius-slider"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="profile-wrapper">
          <img
            className="header-profile-image"
            src="https://b.zmtcdn.com/images/user_avatars/mug_2x.png?fit=around%7C100%3A100&crop=100%3A100%3B%2A%2C%2A"
          />
          <span className="header-username">Aman</span>
          <i className="fi fi-rr-angle-small-down absolute-center profile-options-icon"></i>{" "}
        </div>
      </div>
    </div>
  );
};

export default Header;
// complete
