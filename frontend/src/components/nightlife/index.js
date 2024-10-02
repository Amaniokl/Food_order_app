import React from "react";
import Collection from "../common/collection/index";
import Filters from "../common/filters/index";
import { nightlife } from "../../data/nightlife";
import ExploreSection from "../common/exploreSection/index";

const nightFilters = [
  {
    id: 1,
    icon: <i class="fi fi-rr-settings-sliders absolute-center"></i>,
    title: "Filters",
  },
  { id: 2, title: "4.0+" },
  { id: 3, title: "Safe and Hygienic" },
  { id: 4, title: "Pure Veg" },
  {
    id: 5,
    title: "Delivery Time",
    icon: <i className="fi fi-rr-apps-sort absolute-center"></i>,
  },
  { id: 6, title: "Great Offers" },
];

const nightList = nightlife;

const collectionList = [
  {
    id: 1,
    cover:
      "https://b.zmtcdn.com/data/collections/740c74e2e5d27bbbfdc0d722d9735d07_1674839786.jpg?output-format=webp",
    title: "16 Best Bars & Pubs",
    places: "14 places",
  },
  {
    id: 2,
    cover:
      "https://b.zmtcdn.com/data/collections/d6c20926317f6753461c59af08d566f1_1674839603.jpg",
    title: "25 Vibrant Places for Pride Month",
    places: "24 places",
  },
];

const Nightlife = () => {
  return (
    <div>
      <Collection list={collectionList} />
      <div className="max-width">
        <Filters filterList={nightFilters} />
      </div>
      <ExploreSection
        list={nightList}
        collectinName="Nightlife Restaurants in Pune"
      />
    </div>
  );
};

export default Nightlife;
