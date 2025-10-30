import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Experiences API
export const fetchExperiences = async (filters = {}) => {
    try {
        const params = new URLSearchParams();
        if (filters.category) params.append('category', filters.category);
        if (filters.city) params.append('city', filters.city);
        if (filters.minPrice) params.append('minPrice', filters.minPrice);
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
        if (filters.search) params.append('search', filters.search);

        const queryString = params.toString();
        const url = queryString ? `${API_BASE_URL}/experiences?${queryString}` : `${API_BASE_URL}/experiences`;

        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching experiences:', error);
        throw error;
    }
};

export const fetchExperienceById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/experiences/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching experience details:', error);
        throw error;
    }
};

// Bookings API
export const createBooking = async (bookingData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/bookings`, bookingData);
        return response.data;
    } catch (error) {
        console.error('Error creating booking:', error);
        throw error;
    }
};

export const fetchBookingById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/bookings/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching booking:', error);
        throw error;
    }
};

// Promo Code API
export const validatePromoCode = async (code, orderValue) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/promo/validate`, {
            code,
            orderValue
        });
        return response.data;
    } catch (error) {
        console.error('Error validating promo code:', error);
        throw error;
    }
};
