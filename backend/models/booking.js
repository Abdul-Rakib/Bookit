import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    bookingId: {
        type: String,
        required: true,
        unique: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    experience: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Experience',
        required: true,
    },
    slot: [
        {
            date: {
                type: Date,
                required: true,
            },
            time: {
                type: String,
                required: true,
            }
        }
    ],
    numberOfGuests: {
        type: Number,
        required: true,
        min: 1,
    },
    pricing: {
        basePrice: {
            type: Number,
            required: true,
        },
        subtotal: {
            type: Number,
            required: true,
        },
        discount: {
            type: Number,
            default: 0,
        },
        promoCode: {
            type: String,
            default: "",
        },
        promoDiscount: {
            type: Number,
            default: 0,
        },
        tax: {
            type: Number,
            default: 0,
        },
        totalAmount: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            default: 'INR',
        },
    },
    bookingStatus: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed', 'failed'],
        default: 'pending',
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed', 'refunded'],
        default: 'pending',
    },
    paymentMethod: {
        type: String,
        enum: ['card', 'upi', 'netbanking', 'wallet', 'cash'],
    },
    paymentDetails: {
        transactionId: {
            type: String,
        },
        paymentGateway: {
            type: String,
        },
        paidAt: {
            type: Date,
        },
    },
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
