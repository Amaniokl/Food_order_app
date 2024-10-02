import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const allCuisines="American, Andhra, Asian, Bakery, BBQ, Beverages, Biryani, Burger, Cajun, Cafe, Continental, Desserts, European, Fast Food, Finger Food, Gujarati, Ice Cream, Italian, Japanese, Lebanese, Mediterranean, Mexican, Mithai, Modern Indian, Mughlai, North Indian, Seafood, South Indian, Street Food, Thai, Tibetan, Vietnamese"
// Define initial state
const initialState = {
    restaurants: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    filters: {
        countryCode: 1,
        cuisine: '',
        rating: 2,
        radius:0,
        latitude:null,
        longitude:null,
    },
    noRestaurantsMessage:"",
    page: 1,
    hasMore: true, // To track if there are more results to load

};


// Async thunk to fetch restaurants near user's location
export const fetchRestaurantsByLocation = createAsyncThunk(
    "restaurants/fetchRestaurantsByLocation",
    async ({ lat, lng, radius }, { rejectWithValue }) => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/restaurants/near?lat=${lat}&lng=${lng}&radius=${radius}`
        );
  
        if (response.status === 404) {
          const data = await response.json();
          return rejectWithValue(data.message);
        }
  
        const data = await response.json();
        console.log(data)
        return data;
      } catch (error) {
        return rejectWithValue("Server error");
      }
    }
  );



// Async thunk to fetch restaurants
export const fetchRestaurants = createAsyncThunk(
    'restaurants/fetchRestaurants',
    async ({ page = 1, limit = 10, countryCode = 1, cuisines = allCuisines, rating = 2 }) => {
        try {
            const response = await fetch(`http://localhost:5000/api/restaurants?page=${page}&limit=${limit}&countryCode=${countryCode}&cuisines=${encodeURIComponent(cuisines)}&rating=${rating}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            // console.log("Fetched Restaurants Data:", data); // Log the fetched data
            return data;
        } catch (error) {
            // console.error("Error fetching restaurants:", error);
            throw error; // Ensure the error is thrown for proper handling in the thunk
        }
    }
);

// Create slice
const restaurantSlice = createSlice({
    name: 'restaurants',
    initialState,
    reducers: {
        setFilters(state, action) {
            // state.filters = action.payload;
            // const newFilters = { ...action.payload };
            // if (newFilters.cuisines) {
            //   state.filters.cuisines = newFilters.cuisines;
            // }
            // state.filters = newFilters;
            state.filters = action.payload;
            state.page = 1; // Reset page number on filter change
            state.restaurants = []; // Clear the list when filters change
            state.hasMore = true; // Reset to allow fetching new results

          },
          clearRestaurants(state) {
            state.restaurants = [];
            state.page = 1;
            state.hasMore = true;
          },
          resetPage(state) {
            state.page = 1;
          },
          setCountryCode: (state, action) => {
            state.filters.countryCode = action.payload; // Update the countryCode
          },  
          setCuisine: (state, action) => {
            state.filters.cuisine = action.payload;
          }, 
          setUserLocation: (state, action) => {
            state.filters.latitude = action.payload.latitude;
            state.filters.longitude = action.payload.longitude;
          },
          setRadius: (state, action) => {
            state.filters.radius = action.payload;
          },
          clearNoRestaurantsMessage: (state) => {
            state.noRestaurantsMessage = ""; // Clear the message
          },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRestaurants.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchRestaurants.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.restaurants = [...state.restaurants, ...action.payload.restaurants];
                state.hasMore = action.payload.restaurants.length > 0;
        
            })
            .addCase(fetchRestaurants.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchRestaurantsByLocation.pending, (state) => {
                state.status = "loading";
              })
              .addCase(fetchRestaurantsByLocation.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.restaurants = action.payload;
                state.noRestaurantsMessage = ""; // Clear any previous message
              })
              .addCase(fetchRestaurantsByLocation.rejected, (state, action) => {
                state.status = "failed";
                state.noRestaurantsMessage = action.payload; // Set the message if rejected
              });
            
    },
});

export const { setFilters, clearRestaurants, resetPage,setCountryCode,setCuisine,setRadius,setUserLocation,clearNoRestaurantsMessage }  = restaurantSlice.actions;
export default restaurantSlice.reducer;
