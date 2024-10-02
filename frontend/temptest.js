import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurants } from './src/redux/slices/restaurantSlice';

const RestaurantList = () => {
    const dispatch = useDispatch();
    const { restaurants, status, error } = useSelector((state) => state.restaurants);

    useEffect(() => {
        // Fetch restaurants when component mounts or filters change
        dispatch(fetchRestaurants({ page: 1, limit: 10, countryCode: 1 }));
    }, [dispatch]);

    if (status === 'loading') return <p>Loading...</p>;
    if (status === 'failed') return <p>{error}</p>;

    return (
        <div>
            <h1>Restaurant List</h1>
            <ul>
                {restaurants.map((restaurant) => (
                    <li key={restaurant['Restaurant ID']}>
                        {restaurant['Restaurant Name']}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RestaurantList;
