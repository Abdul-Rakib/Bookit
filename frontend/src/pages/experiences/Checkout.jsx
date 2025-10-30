import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { createBooking, validatePromoCode } from '../../services/api';
import { FiArrowLeft, FiLoader } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function Checkout() {
    const location = useLocation();
    const navigate = useNavigate();
    const bookingData = location.state;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [promoCode, setPromoCode] = useState('');
    const [promoDiscount, setPromoDiscount] = useState(0);
    const [isValidatingPromo, setIsValidatingPromo] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    if (!bookingData) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="text-center">
                    <p className="text-gray-500 text-lg mb-4">No booking data found</p>
                    <Link to="/experiences" className="text-yellow-600 hover:underline">
                        Back to experiences
                    </Link>
                </div>
            </div>
        );
    }

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleApplyPromo = async () => {
        if (!promoCode.trim()) {
            toast.error('Please enter a promo code');
            return;
        }

        try {
            setIsValidatingPromo(true);
            const response = await validatePromoCode(promoCode, bookingData.pricing.subtotal);

            if (response.success) {
                setPromoDiscount(response.data.discount);
                toast.success(`Promo code applied! You saved ₹${response.data.discount}`);
            }
        } catch (error) {
            const message = error.response?.data?.msg || 'Invalid promo code';
            toast.error(message);
            setPromoDiscount(0);
        } finally {
            setIsValidatingPromo(false);
        }
    };

    const calculateFinalTotal = () => {
        const total = bookingData.pricing.total - promoDiscount;
        return Math.max(0, total);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            toast.error('Please enter your name');
            return;
        }
        if (!formData.email.trim()) {
            toast.error('Please enter your email');
            return;
        }
        if (!agreedToTerms) {
            toast.error('Please agree to terms and safety policy');
            return;
        }

        try {
            setIsSubmitting(true);

            const payload = {
                guestInfo: {
                    name: formData.name.trim(),
                    email: formData.email.trim(),
                },
                experienceId: bookingData.experience.id,
                slot: {
                    date: bookingData.slot.date,
                    time: bookingData.slot.time
                },
                numberOfGuests: bookingData.numberOfGuests,
                promoCode: promoCode.trim() || undefined,
                paymentMethod: 'card'
            };

            const response = await createBooking(payload);

            if (response.success) {
                navigate('/booking-success', {
                    state: {
                        bookingId: response.data.bookingId,
                        booking: response.data
                    }
                });
            }
        } catch (error) {
            console.error('Booking failed:', error);
            const message = error.response?.data?.msg || 'Booking failed. Please try again.';

            navigate('/booking-failed', {
                state: {
                    error: message
                }
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Guest Information */}
                            <div className="p-4">
                                <div className="max-w-7xl mx-auto pb-4">
                                    <button
                                        onClick={() => navigate(-1)}
                                        className="flex items-center text-gray-600 hover:text-gray-900"
                                    >
                                        <FiArrowLeft className="mr-2" />
                                        Checkout
                                    </button>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4 bg-gray-100 p-4 rounded">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Full name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Your name"
                                            className="w-full px-2 py-2 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="your@email.com"
                                            className="w-full px-2 py-2 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                                        />
                                    </div>
                                    <div className="flex gap-3">
                                        <input
                                            type="text"
                                            value={promoCode}
                                            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                                            placeholder="Enter promo code"
                                            className="flex-1 px-2 py-2 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleApplyPromo}
                                            disabled={isValidatingPromo}
                                            className="px-6 px-2 py-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isValidatingPromo ? 'Validating...' : 'Apply'}
                                        </button>


                                    </div>
                                    <label className="my-2 flex justify-center items-start gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={agreedToTerms}
                                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                                            className="mt-1 w-5 h-5 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400"
                                        />
                                        <span className="text-gray-700 text-sm">
                                            I agree to the terms and safety policy
                                        </span>
                                    </label>
                                </div>
                            </div>

                        </form>
                    </div>

                    {/* Right Column - Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-100 rounded-lg p-6 shadow-md sticky top-24 mt-6">
                            {/* Experience Details */}
                            <div className="mb-2">
                                <div className="flex gap-3 mb-4">
                                    Experience
                                    <div>
                                        <h3 className="text-gray-900 line-clamp-1">{bookingData.experience.title}</h3>
                                    </div>
                                </div>

                                <div className="space-y-2 text-sm text-gray-600">
                                    <div className="flex justify-between">
                                        <span>Date</span>
                                        <span className="font-medium text-gray-900">
                                            {new Date(bookingData.slot.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Time</span>
                                        <span className="font-medium text-gray-900">{bookingData.slot.time}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Qty</span>
                                        <span className="font-medium text-gray-900">{bookingData.numberOfGuests}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Price Breakdown */}
                            <div className="space-y-3 mb-2 border-b border-gray-300 pb-4">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>₹{bookingData.pricing.subtotal}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Taxes</span>
                                    <span>₹{bookingData.pricing.tax}</span>
                                </div>
                                {promoDiscount > 0 && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Promo Discount</span>
                                        <span>-₹{promoDiscount}</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-between text-lg font-semibold mb-6">
                                <span>Total</span>
                                <span>₹{calculateFinalTotal()}</span>
                            </div>

                            <button
                                type="submit"
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <FiLoader className="animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    'Pay and Confirm'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
