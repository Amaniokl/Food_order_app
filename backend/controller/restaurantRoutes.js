const express = require("express");
const Restaurant = require("../models/Restaurant");
const geolib = require("geolib");

const restaurantId = async (req, res) => {
  try {
    const restaurantId = Number(req.params.id); // Ensure it's cast to a number
    const restaurant = await Restaurant.findOne({
      "Restaurant ID": req.params.id,
    });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const restaurants = async (req, res) => {
  const { page = 1, limit = 10, countryCode = 1, cuisines, rating } = req.query;

  try {
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    const filter = { "Country Code": countryCode };
    if (cuisines) {
      const cuisinesArray = cuisines
        .split(",")
        .map((cuisine) => cuisine.trim());
      filter.Cuisines = {
        $in: cuisinesArray.map((cuisine) => new RegExp(cuisine, "i")),
      };
    }

    if (rating) {
      const ratingNum = parseFloat(rating);
      if (!isNaN(ratingNum)) {
        filter["Aggregate rating"] = { $gte: ratingNum };
      }
    }

    const restaurants = await Restaurant.find(filter)
      .limit(limitNum)
      .skip((pageNum - 1) * limitNum);

    const total = await Restaurant.countDocuments(filter);

    res.json({
      restaurants,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const degreesToRadians = (degrees) => degrees * (Math.PI / 180);

const getBoundingBox = (lat, lon, radius) => {
  const earthRadiusKm = 6371; // Earth's radius in kilometers
  const radLat = degreesToRadians(lat);
  const radLon = degreesToRadians(lon);
  const radRadius = radius / earthRadiusKm;

  const minLat = radLat - radRadius;
  const maxLat = radLat + radRadius;
  const minLon = radLon - radRadius / Math.cos(radLat);
  const maxLon = radLon + radRadius / Math.cos(radLat);

  return {
    minLat: minLat * (180 / Math.PI),
    maxLat: maxLat * (180 / Math.PI),
    minLon: minLon * (180 / Math.PI),
    maxLon: maxLon * (180 / Math.PI),
  };
};

const restaurantsNear = async (req, res) => {
  const { lat, lng, radius = 3 } = req.query;

  if (!lat || !lng) {
    return res
      .status(400)
      .json({ error: "Please provide latitude, longitude, and radius" });
  }

  //   const latitude = parseFloat(lat);
  //   const longitude = parseFloat(lng);
  //   const radiusInMeters = parseFloat(radius) * 1000;
  const { minLat, maxLat, minLon, maxLon } = getBoundingBox(
    parseFloat(lat),
    parseFloat(lng),
    parseFloat(radius)
  );

  console.log(
    `minLat ${minLat} maxLat ${maxLat}, minLon ${minLon} maxLon ${maxLon}`
  );

  try {
    const restaurantsWithinRadius = await Restaurant.find({
      Latitude: { $gte: minLat, $lte: maxLat },
      Longitude: { $gte: minLon, $lte: maxLon },
    });

    if (restaurantsWithinRadius.length === 0) {
      return res
        .status(404)
        .json({ message: "No restaurants found within this range" });
    }

    res.status(200).json(restaurantsWithinRadius);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error });
  }
};

const search = async (req, res) => {
  try {
    const { name, cuisine, countryCode = 1 } = req.query;
    if (!name && !cuisine) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least a name or a cuisine to search.",
      });
    }

    const searchCriteria = {
      "Country Code": countryCode,
    };
    if (name) {
      searchCriteria["Restaurant Name"] = { $regex: name, $options: "i" };
    }

    if (cuisine) {
      searchCriteria.Cuisines = { $regex: cuisine, $options: "i" };
    }

    const restaurants = await Restaurant.find(searchCriteria);

    res.status(200).json({
      success: true,
      data: restaurants,
    });
  } catch (error) {
    console.error("Error in searching restaurants:", error);
    res.status(500).json({
      success: false,
      message: "Server error, unable to search restaurants",
    });
  }
};

module.exports = { restaurantId, restaurants, restaurantsNear, search };
