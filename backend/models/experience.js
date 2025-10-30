import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
    experienceId: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    shortDescription: {
        type: String,
        trim: true,
    },
    category: {
        type: String,
        enum: ['adventure', 'cultural', 'nature', 'food', 'wellness', 'entertainment', 'sports', 'sightseeing', 'other'],
        default: 'other',
    },
    location: {
        city: {
            type: String,
            required: true,
        },
        coordinates: {
            latitude: Number,
            longitude: Number,
        },
    },
    images: [{
        url: {
            type: String,
            required: true,
        }
    }],
    price:{
        type: Number,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });

const Experience = mongoose.model('Experience', experienceSchema);
export default Experience;
