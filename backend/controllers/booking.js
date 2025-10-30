import Booking from "../models/booking.js";
import Experience from "../models/experience.js";
import PromoCode from "../models/promoCode.js";

// Generate booking ID
const generateBookingId = () => {
    const date = new Date();
    const yy = String(date.getFullYear()).slice(-2);
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const datePart = 'BK' + yy + mm + dd;
    const randomPart = Math.random().toString(36).substr(2, 5).toUpperCase();
    return datePart + randomPart;
};

// POST /api/bookings - Create a new booking
export const createBooking = async (req, res) => {
    try {
        const {
            user,
            guestInfo,
            experienceId,
            slot,
            numberOfGuests,
            promoCode,
            paymentMethod,
            specialRequests
        } = req.body;

        // Validate required fields
        if (!guestInfo || !guestInfo.name || !guestInfo.email) {
            return res.status(400).json({
                success: false,
                msg: "Guest information (name, email) is required"
            });
        }

        if (!experienceId) {
            return res.status(400).json({
                success: false,
                msg: "Experience ID is required"
            });
        }

        if (!slot || !slot.date || !slot.time) {
            return res.status(400).json({
                success: false,
                msg: "Slot information (date and time) is required"
            });
        }

        if (!numberOfGuests || numberOfGuests < 1) {
            return res.status(400).json({
                success: false,
                msg: "Number of guests must be at least 1"
            });
        }

        // Find the experience
        const experience = await Experience.findOne({
            $or: [{ _id: experienceId }, { experienceId: experienceId }],
            isActive: true
        });

        if (!experience) {
            return res.status(404).json({
                success: false,
                msg: "Experience not found"
            });
        }

        // Check for double-booking - prevent same email from booking the same slot
        const slotDate = new Date(slot.date);
        const existingBooking = await Booking.findOne({
            'guestInfo.email': guestInfo.email.toLowerCase().trim(),
            experience: experience._id,
            'slot.date': {
                $gte: new Date(slotDate.setHours(0, 0, 0, 0)),
                $lt: new Date(slotDate.setHours(23, 59, 59, 999))
            },
            'slot.time': slot.time,
            bookingStatus: { $in: ['pending', 'confirmed'] }
        });

        if (existingBooking) {
            return res.status(409).json({
                success: false,
                msg: "You already have a booking for this experience at the selected date and time. Please choose a different slot or check your existing bookings.",
                existingBookingId: existingBooking.bookingId
            });
        }

        // Calculate pricing
        const basePrice = experience.price;
        const subtotal = basePrice * numberOfGuests;
        let promoDiscount = 0;
        let promoCodeUsed = "";

        // Apply promo code if provided
        if (promoCode) {
            const promo = await PromoCode.findOne({
                code: promoCode.toUpperCase(),
                isActive: true
            });

            if (promo) {
                // Validate promo code manually
                const now = new Date();
                let validationError = null;

                if (!promo.isActive) {
                    validationError = 'Promo code is inactive';
                } else if (now < promo.validity.startDate) {
                    validationError = 'Promo code is not yet active';
                } else if (now > promo.validity.endDate) {
                    validationError = 'Promo code has expired';
                } else if (promo.usageLimit.total && promo.usageLimit.used >= promo.usageLimit.total) {
                    validationError = 'Promo code usage limit reached';
                }

                if (validationError) {
                    return res.status(400).json({
                        success: false,
                        msg: validationError
                    });
                }

                // Check minimum order value
                if (subtotal < promo.minOrderValue) {
                    return res.status(400).json({
                        success: false,
                        msg: `Minimum order value of ₹${promo.minOrderValue} required for this promo code`
                    });
                }

                // Calculate discount
                if (promo.discountType === 'percentage') {
                    promoDiscount = (subtotal * promo.discountValue) / 100;
                    if (promo.maxDiscount && promoDiscount > promo.maxDiscount) {
                        promoDiscount = promo.maxDiscount;
                    }
                } else if (promo.discountType === 'flat') {
                    promoDiscount = promo.discountValue;
                }

                promoDiscount = Math.min(promoDiscount, subtotal);
                promoCodeUsed = promo.code;

                // Increment usage count
                promo.usageLimit.used += 1;
                await promo.save();
            } else {
                return res.status(400).json({
                    success: false,
                    msg: "Invalid promo code"
                });
            }
        }

        // Calculate tax (18% GST)
        const taxRate = 0.18;
        const tax = (subtotal - promoDiscount) * taxRate;
        const totalAmount = subtotal - promoDiscount + tax;

        // Create booking
        const newBooking = new Booking({
            bookingId: generateBookingId(),
            user: user || null,
            guestInfo: {
                name: guestInfo.name,
                email: guestInfo.email.toLowerCase().trim(),
                phone: guestInfo.phone
            },
            experience: experience._id,
            slot: [slot],
            numberOfGuests,
            pricing: {
                basePrice,
                subtotal,
                discount: 0,
                promoCode: promoCodeUsed,
                promoDiscount,
                tax: Math.round(tax * 100) / 100,
                totalAmount: Math.round(totalAmount * 100) / 100,
                currency: 'INR'
            },
            bookingStatus: 'pending',
            paymentStatus: 'pending',
            paymentMethod: paymentMethod || null,
            specialRequests: specialRequests || ""
        });

        await newBooking.save();

        // Populate experience details for response
        await newBooking.populate('experience', 'experienceId title shortDescription location images price');

        res.status(201).json({
            success: true,
            msg: "Booking created successfully",
            data: newBooking
        });

    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({
            success: false,
            msg: "Failed to create booking"
        });
    }
};

// POST /api/promo/validate - Validate promo code
export const validatePromoCode = async (req, res) => {
    try {
        const { code, orderValue } = req.body;

        if (!code) {
            return res.status(400).json({
                success: false,
                msg: "Promo code is required"
            });
        }

        if (!orderValue || orderValue <= 0) {
            return res.status(400).json({
                success: false,
                msg: "Valid order value is required"
            });
        }

        // Find promo code
        const promo = await PromoCode.findOne({
            code: code.toUpperCase(),
            isActive: true
        });

        if (!promo) {
            return res.status(404).json({
                success: false,
                msg: "Invalid promo code"
            });
        }

        // Validate promo code manually
        const now = new Date();
        let validationError = null;

        if (!promo.isActive) {
            validationError = 'Promo code is inactive';
        } else if (now < promo.validity.startDate) {
            validationError = 'Promo code is not yet active';
        } else if (now > promo.validity.endDate) {
            validationError = 'Promo code has expired';
        } else if (promo.usageLimit.total && promo.usageLimit.used >= promo.usageLimit.total) {
            validationError = 'Promo code usage limit reached';
        }

        if (validationError) {
            return res.status(400).json({
                success: false,
                msg: validationError
            });
        }

        // Check minimum order value
        if (orderValue < promo.minOrderValue) {
            return res.status(400).json({
                success: false,
                msg: `Minimum order value of ₹${promo.minOrderValue} required for this promo code`
            });
        }

        // Calculate discount
        let discount = 0;
        if (promo.discountType === 'percentage') {
            discount = (orderValue * promo.discountValue) / 100;
            if (promo.maxDiscount && discount > promo.maxDiscount) {
                discount = promo.maxDiscount;
            }
        } else if (promo.discountType === 'flat') {
            discount = promo.discountValue;
        }
        discount = Math.min(discount, orderValue);

        res.status(200).json({
            success: true,
            msg: "Promo code is valid",
            data: {
                code: promo.code,
                description: promo.description,
                discountType: promo.discountType,
                discountValue: promo.discountValue,
                discount: Math.round(discount * 100) / 100,
                finalAmount: Math.round((orderValue - discount) * 100) / 100
            }
        });

    } catch (error) {
        console.error("Error validating promo code:", error);
        res.status(500).json({
            success: false,
            msg: "Failed to validate promo code"
        });
    }
};

// GET /api/bookings/:id - Get booking by ID
export const getBookingById = async (req, res) => {
    try {
        const { id } = req.params;

        const booking = await Booking.findOne({
            $or: [{ _id: id }, { bookingId: id }]
        })
            .populate('experience', 'experienceId title shortDescription location images price')
            .populate('user', 'name email');

        if (!booking) {
            return res.status(404).json({
                success: false,
                msg: "Booking not found"
            });
        }

        res.status(200).json({
            success: true,
            data: booking
        });

    } catch (error) {
        console.error("Error fetching booking:", error);
        res.status(500).json({
            success: false,
            msg: "Failed to fetch booking details"
        });
    }
};

// GET /api/bookings/user/:userId - Get all bookings for a user
export const getUserBookings = async (req, res) => {
    try {
        const { userId } = req.params;

        const bookings = await Booking.find({ user: userId })
            .populate('experience', 'experienceId title shortDescription location images price')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });

    } catch (error) {
        console.error("Error fetching user bookings:", error);
        res.status(500).json({
            success: false,
            msg: "Failed to fetch bookings"
        });
    }
};
