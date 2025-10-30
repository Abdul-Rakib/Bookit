import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchExperienceById } from '../../services/api';
import { FiArrowLeft, FiMapPin, FiClock, FiUsers, FiMinus, FiPlus, FiLoader } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function ExperienceDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [experience, setExperience] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Generate available dates (next 7 days)
    const availableDates = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return date;
    });

    // Time slots
    const timeSlots = [
        { time: '07:00 - 09:00', available: 4 },
        { time: '09:00 - 11:00', available: 2 },
        { time: '11:00 - 13:00', available: 5 },
        { time: '13:00 - 15:00', available: 0 }, // Sold out
    ];

    useEffect(() => {
        loadExperience();
    }, [id]);

    const loadExperience = async () => {
        try {
            setLoading(true);
            const response = await fetchExperienceById(id);
            setExperience(response.data);
        } catch (error) {
            console.error('Failed to load experience:', error);
            toast.error('Failed to load experience details');
        } finally {
            setLoading(false);
        }
    };

    const handleQuantityChange = (delta) => {
        const newQuantity = quantity + delta;
        if (newQuantity >= 1 && newQuantity <= 10) {
            setQuantity(newQuantity);
        }
    };

    const calculateTotal = () => {
        if (!experience) return { subtotal: 0, tax: 0, total: 0 };
        const subtotal = experience.price * quantity;
        const tax = Math.round(subtotal * 0.18); // 18% GST
        const total = subtotal + tax;
        return { subtotal, tax, total };
    };

    const handleConfirm = () => {
        if (!selectedDate) {
            toast.error('Please select a date');
            return;
        }
        if (!selectedTime) {
            toast.error('Please select a time slot');
            return;
        }

        const { subtotal, tax, total } = calculateTotal();

        navigate('/checkout', {
            state: {
                experience: {
                    id: experience._id,
                    title: experience.title,
                    image: experience.images[0]?.url
                },
                slot: {
                    date: selectedDate,
                    time: selectedTime
                },
                numberOfGuests: quantity,
                pricing: {
                    basePrice: experience.price,
                    subtotal,
                    tax,
                    total
                }
            }
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <FiLoader className="animate-spin text-yellow-400" size={48} />
            </div>
        );
    }

    if (!experience) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="text-center">
                    <p className="text-gray-500 text-lg mb-4">Experience not found</p>
                    <Link to="/experiences" className="text-yellow-600 hover:underline">
                        Back to experiences
                    </Link>
                </div>
            </div>
        );
    }

    const { subtotal, tax, total } = calculateTotal();

    return (
        <div className="min-h-screen bg-gray-50">

            <div className="max-w-6xl mx-auto px-4 py-2">
                <div className="max-w-7xl mx-auto py-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center text-gray-600 hover:text-gray-900"
                    >
                        <FiArrowLeft className="mr-2" />
                        Details
                    </button>
                </div>
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Details */}
                    <div className="lg:col-span-2 space-y-2">
                        {/* Image Gallery */}
                        <div className="rounded-lg overflow-hidden shadow-md">
                            <div className="relative h-86">
                                <img
                                    src={experience.images[currentImageIndex]?.url || 'https://via.placeholder.com/800x400'}
                                    alt={experience.title}
                                    className="w-full h-full object-cover"
                                />
                                {experience.images.length > 1 && (
                                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                                        {experience.images.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentImageIndex(index)}
                                                className={`w-3 h-3 rounded-full ${index === currentImageIndex ? 'bg-yellow-400' : 'bg-white/60'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Title and Description */}
                        <div className="rounded-lg p-2">
                            <h1 className="text-2xl font-semi-bold text-gray-900 mb-4">{experience.title}</h1>

                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                {experience.description}
                            </p>
                        </div>

                        {/* Choose Date */}
                        <div className="rounded-lg p-2">
                            <h2 className="text-gray-900 mb-4">Choose date</h2>
                            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-3">
                                {availableDates.map((date, index) => {
                                    const dateStr = date.toISOString().split('T')[0];
                                    const isSelected = selectedDate === dateStr;
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedDate(dateStr)}
                                            className={`flex justify-center gap-1 p-2 rounded border-2 text-center transition-all ${isSelected
                                                ? 'bg-yellow-400 text-white'
                                                : 'border-gray-200 hover:border-yellow-300'
                                                }`}
                                        >
                                            <div className="text-xs mb-1">
                                                {date.toLocaleString('default', { month: 'long' })}
                                            </div>
                                            <div className="text-xs font-semibold">
                                                {date.getDate()}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Choose Time */}
                        <div className="rounded p-2">
                            <h2 className="text-md font-semi-bold mb-4">Choose time</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {timeSlots.map((slot, index) => {
                                    const isSelected = selectedTime === slot.time;
                                    const isSoldOut = slot.available === 0;
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => !isSoldOut && setSelectedTime(slot.time)}
                                            disabled={isSoldOut}
                                            className={`p-2 flex justify-center gap-1 rounded border-2 text-center transition-all ${isSoldOut
                                                ? 'border-gray-200 bg-gray-100 cursor-not-allowed opacity-50'
                                                : isSelected
                                                    ? 'border-yellow-400 bg-yellow-400 text-white'
                                                    : 'border-gray-200 hover:border-yellow-300'
                                                }`}
                                        >
                                            <div className="text-xs mb-1">{slot.time}</div>
                                            <div className="text-xs text-red-500">
                                                {isSoldOut ? 'sold out' : `${slot.available} left`}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                            <p className="text-xs text-gray-500 mt-3">
                                All times are in IST (GMT +5:30)
                            </p>
                        </div>

                        {/* About */}
                        <div className="rounded-lg p-2">
                            <h2 className="text-md font-semibold text-gray-900 mb-4">About</h2>
                            <p className="text-gray-600 bg-gray-100 p-1 rounded leading-relaxed">
                                {experience.shortDescription}
                            </p>
                        </div>
                    </div>

                    {/* Right Column - Booking Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-100 rounded-lg p-6 shadow-md sticky top-24">
                            <div className="flex justify-between mb-6">
                                <div className="text-gray-500 mb-1">Starts at</div>
                                <div className="text-gray-900">₹{experience.price}</div>
                            </div>

                            {/* Quantity Selector */}
                            <div className="flex items-center justify-between mb-6">
                                <label className="block text-sm font-medium text-gray-500 mb-2">
                                    Quantity
                                </label>
                                <div className="flex items-center">
                                    <button
                                        onClick={() => handleQuantityChange(-1)}
                                        className="w-6 h-6 flex items-center justify-center border-2 border-gray-300 rounded hover:border-yellow-400 transition-colors"
                                    >
                                        <FiMinus />
                                    </button>
                                    <span className="text w-12 text-center">{quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange(1)}
                                        className="w-6 h-6 flex items-center justify-center border-2 border-gray-300 rounded hover:border-yellow-400 transition-colors"
                                    >
                                        <FiPlus />
                                    </button>
                                </div>
                            </div>

                            {/* Price Breakdown */}
                            <div className="space-y-3 mb-6 pb-6 border-b border-gray-300">
                                <div className="flex justify-between text-gray-500">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal}</span>
                                </div>
                                <div className="flex justify-between text-gray-500">
                                    <span>Taxes</span>
                                    <span>₹{tax}</span>
                                </div>
                            </div>

                            <div className="flex justify-between text-lg font-semibold mb-6">
                                <span>Total</span>
                                <span>₹{total}</span>
                            </div>

                            <button
                                onClick={handleConfirm}
                                className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg transition-colors"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
