# Zomato Restaurant Listing & Searching

## Project Overview

This project is a web application that allows users to browse and search for restaurants based on various filters. The project consists of both a **frontend** and a **backend**:

- **Frontend**: The user interface where restaurant listings, filtering options, and restaurant details are displayed.
- **Backend**: The web API service that provides restaurant data to the frontend.

### Technologies Used

- **Frontend**: React, Redux
- **Backend**: Node.js, Express, MongoDB
- **Data**: Zomato restaurant data loaded from [here](https://www.kaggle.com/datasets/shrutimehta/zomato-restaurants-data)

## Features

### 1. Filter by Country

Users can filter restaurants by selecting a specific country from a dropdown menu. This feature enables users to narrow down restaurants based on the country they are located in.

### 2. Filter by Cuisine

Users can filter restaurants based on cuisine type (e.g., Indian, Continental, Chinese). This allows users to quickly find restaurants offering specific types of food.

### 3. Filter by Latitude and Longitude

Users can search for restaurants within a specific radius from a given latitude and longitude. For example, users can look for restaurants within 3 km of their current location. This feature is helpful when searching for nearby restaurants.

### 4. Filter by Rating

Restaurants can also be filtered based on their ratings. Users can choose to view restaurants with high ratings (e.g., 4.0+), ensuring that only the best-rated restaurants are displayed.

### 5. Infinite Scrolling

The restaurant list supports infinite scrolling, which means that new restaurants are automatically loaded as the user scrolls down the page. This creates a seamless and smooth browsing experience without the need to manually click on pagination buttons.

### 6. Restaurant Detail Page (Dynamic Routes)

Each restaurant in the list links to its own detailed page. When a user clicks on a restaurant, they are redirected to a dynamic route, such as `/restaurant/:id`, where they can view specific details about that restaurant. The route is unique to each restaurant, allowing for easy navigation and sharing of links.

---

## How to Run the Project

### Backend (Port 5000)

1. Clone the repository to your local machine.
2. Navigate to the `backend` directory.
3. Run `npx nodemon index.js` to start the backend server.

### Frontend (Port 3000)

1. Navigate to the `frontend` directory.
2. Run `npm i` to install the dependencies.
3. Run `npm start` to launch the frontend.

---

## Example Screenshots

![Screenshot 2024-09-16 061510](https://github.com/user-attachments/assets/bbd386a8-33f6-4454-b0bb-b5240297e4cd)
![Screenshot 2024-09-16 061417](https://github.com/user-attachments/assets/1139ef92-536b-4a24-95eb-6edbae5660d4)

https://github.com/user-attachments/assets/035d541a-ecb5-4fd7-b04a-e13da870515d

ps://github.com/user-attachments/assets/f6c8bbd4-18e3-4f37-8106-2b33efb9f1dc)
