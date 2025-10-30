import mongoose from 'mongoose';

const promoCodeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true,
    },
    description: {
        type: String,
        default: "",
    },
    discountType: {
        type: String,
        enum: ['percentage', 'flat'],
        required: true,
    },
    discountValue: {
        type: Number,
        required: true,
        min: 0,
    },
    maxDiscount: {
        type: Number,
        default: null,
    },
    minOrderValue: {
        type: Number,
        default: 0,
    },
    validity: {
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
    },
    usageLimit: {
        total: {
            type: Number,
            default: null,
        },
        used: {
            type: Number,
            default: 0,
        },
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

// Check if promo code is valid
promoCodeSchema.methods.isValid = function () {
    const now = new Date();

    if (!this.isActive) {
        return { valid: false, message: 'Promo code is inactive' };
    }

    if (now < this.validity.startDate) {
        return { valid: false, message: 'Promo code is not yet active' };
    }

    if (now > this.validity.endDate) {
        return { valid: false, message: 'Promo code has expired' };
    }

    if (this.usageLimit.total && this.usageLimit.used >= this.usageLimit.total) {
        return { valid: false, message: 'Promo code usage limit reached' };
    }

    return { valid: true, message: 'Promo code is valid' };
};

// Calculate discount
promoCodeSchema.methods.calculateDiscount = function (orderValue) {
    let discount = 0;

    if (this.discountType === 'percentage') {
        discount = (orderValue * this.discountValue) / 100;

        if (this.maxDiscount && discount > this.maxDiscount) {
            discount = this.maxDiscount;
        }
    } else if (this.discountType === 'flat') {
        discount = this.discountValue;
    }

    return Math.min(discount, orderValue);
};

const PromoCode = mongoose.model('PromoCode', promoCodeSchema);
export default PromoCode;
