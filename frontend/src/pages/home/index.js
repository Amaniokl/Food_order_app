import { useState } from "react";
import Header from "../../components/common/header/index.js";
import Footer from "../../components/common/footer/index.js";
import TabOptions from "../../components/common/tabOptions/index.js";
import DiningOut from "../../components/diningOut/index.js";
import Nightlife from "../../components/nightlife/index.js";
import Delivery from "../../components/delivery/index.js";

const getCorrectScreen = (activeTab) => {
  switch (activeTab) {
    case "Delivery":
      return <Delivery />;
    case "Dining Out":
      return <DiningOut />;
    case "Nightlife":
      return <Nightlife />;
    default:
      return <Delivery />;
  }
};

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("Delivery");
  return (
    <div>
      <Header />
      <TabOptions activeTab={activeTab} setActiveTab={setActiveTab} />
      {getCorrectScreen(activeTab)}
      <Footer />
    </div>
  );
};

export default HomePage;
