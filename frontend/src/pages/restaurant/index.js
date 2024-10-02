import React, { useEffect, useState } from "react";
import Header from "../../components/common/header/index.js";
import Restaurant from "../../components/common/restaurant/index.js"
import Footer from "../../components/common/footer/index.js";

const Restaurants = () => {
  return (
    <div>
      <Header/>
      <Restaurant/>
      <Footer/>
    </div>
  );
};

export default Restaurants;