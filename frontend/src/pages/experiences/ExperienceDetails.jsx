import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchExperienceById } from '../../services/api';
import { FiArrowLeft, FiMapPin, FiClock, FiUsers, FiMinus, FiPlus, FiLoader } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { GlobalContext } from '../../context/globalContext';
import NavBar from '../../components/navbar/NavBar';

export default function ExperienceDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isLoggedIn } = useContext(GlobalContext);

    const [experience, setExperience] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageLoaded, setImageLoaded] = useState(false);

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
            setImageLoaded(false); // Reset image loaded state for new experience
        } catch (error) {
            console.error('Failed to load experience:', error);
            toast.error('Failed to load experience details');
        } finally {
            setLoading(false);
        }
    };

    // Reset image loaded state when changing images
    useEffect(() => {
        setImageLoaded(false);
    }, [currentImageIndex]);

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
            <NavBar />
            <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2">
                <div className="max-w-7xl mx-auto py-3 sm:py-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center text-gray-600 hover:text-gray-900 text-sm sm:text-base"
                    >
                        <FiArrowLeft className="mr-2" />
                        Details
                    </button>
                </div>
                <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    {/* Left Column - Details */}
                    <div className="lg:col-span-2 space-y-3 sm:space-y-4">
                        {/* Image Gallery */}
                        <div className="rounded-lg overflow-hidden shadow-md">
                            <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 bg-gray-200">
                                {/* Loading skeleton */}
                                {!imageLoaded && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
                                )}
                                <img
                                    src={experience.images[currentImageIndex]?.url || 'https://via.placeholder.com/800x400'}
                                    alt={experience.title}
                                    loading="eager"
                                    decoding="async"
                                    onLoad={() => setImageLoaded(true)}
                                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                                        imageLoaded ? 'opacity-100' : 'opacity-0'
                                    }`}
                                    style={{ 
                                        willChange: 'opacity',
                                        backfaceVisibility: 'hidden'
                                    }}
                                />
                                {experience.images.length > 1 && (
                                    <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                                        {experience.images.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentImageIndex(index)}
                                                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                                                    index === currentImageIndex ? 'bg-yellow-400' : 'bg-white/60 hover:bg-white/80'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Title and Description */}
                        <div className="rounded-lg p-2 sm:p-3">
                            <h1 className="text-xl sm:text-2xl font-semi-bold text-gray-900 mb-3 sm:mb-4">{experience.title}</h1>

                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                                {experience.description}
                            </p>
                        </div>

                        {/* Choose Date */}
                        <div className="rounded-lg p-2 sm:p-3">
                            <h2 className="text-base sm:text-lg text-gray-900 mb-3 sm:mb-4">Choose date</h2>
                            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-2 sm:gap-3">
                                {availableDates.map((date, index) => {
                                    const dateStr = date.toISOString().split('T')[0];
                                    const isSelected = selectedDate === dateStr;
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedDate(dateStr)}
                                            className={`flex flex-col items-center justify-center gap-0.5 sm:gap-1 p-2 sm:p-3 rounded border-2 text-center transition-all ${isSelected
                                                ? 'bg-yellow-400 text-white'
                                                : 'border-gray-200 hover:border-yellow-300'
                                                }`}
                                        >
                                            <div className="text-[10px] sm:text-xs">
                                                {date.toLocaleString('default', { month: 'short' })}
                                            </div>
                                            <div className="text-xs sm:text-sm font-semibold">
                                                {date.getDate()}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Choose Time */}
                        <div className="rounded p-2 sm:p-3">
                            <h2 className="text-base sm:text-lg font-semi-bold mb-3 sm:mb-4">Choose time</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
                                {timeSlots.map((slot, index) => {
                                    const isSelected = selectedTime === slot.time;
                                    const isSoldOut = slot.available === 0;
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => !isSoldOut && setSelectedTime(slot.time)}
                                            disabled={isSoldOut}
                                            className={`p-2 sm:p-3 flex flex-col items-center justify-center gap-1 rounded border-2 text-center transition-all ${isSoldOut
                                                ? 'border-gray-200 bg-gray-100 cursor-not-allowed opacity-50'
                                                : isSelected
                                                    ? 'border-yellow-400 bg-yellow-400 text-white'
                                                    : 'border-gray-200 hover:border-yellow-300'
                                                }`}
                                        >
                                            <div className="text-[10px] sm:text-xs">{slot.time}</div>
                                            <div className="text-[10px] sm:text-xs text-red-500">
                                                {isSoldOut ? 'sold out' : `${slot.available} left`}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                            <p className="text-[10px] sm:text-xs text-gray-500 mt-2 sm:mt-3">
                                All times are in IST (GMT +5:30)
                            </p>
                        </div>

                        {/* About */}
                        <div className="rounded-lg p-2 sm:p-3">
                            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">About</h2>
                            <p className="text-xs sm:text-sm text-gray-600 bg-gray-100 p-2 sm:p-3 rounded leading-relaxed">
                                {experience.shortDescription}
                            </p>
                        </div>
                    </div>

                    {/* Right Column - Booking Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-100 rounded-lg p-4 sm:p-6 shadow-md lg:sticky lg:top-24">
                            <div className="flex justify-between mb-4 sm:mb-6">
                                <div className="text-sm sm:text-base text-gray-500 mb-1">Starts at</div>
                                <div className="text-base sm:text-lg text-gray-900 font-semibold">₹{experience.price}</div>
                            </div>

                            {/* Quantity Selector */}
                            <div className="flex items-center justify-between mb-4 sm:mb-6">
                                <label className="block text-xs sm:text-sm font-medium text-gray-500">
                                    Quantity
                                </label>
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <button
                                        onClick={() => handleQuantityChange(-1)}
                                        className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border-2 border-gray-300 rounded hover:border-yellow-400 transition-colors"
                                    >
                                        <FiMinus size={14} />
                                    </button>
                                    <span className="text-sm sm:text-base w-8 sm:w-12 text-center font-semibold">{quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange(1)}
                                        className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border-2 border-gray-300 rounded hover:border-yellow-400 transition-colors"
                                    >
                                        <FiPlus size={14} />
                                    </button>
                                </div>
                            </div>

                            {/* Price Breakdown */}
                            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-300">
                                <div className="flex justify-between text-xs sm:text-sm text-gray-500">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal}</span>
                                </div>
                                <div className="flex justify-between text-xs sm:text-sm text-gray-500">
                                    <span>Taxes</span>
                                    <span>₹{tax}</span>
                                </div>
                            </div>

                            <div className="flex justify-between text-base sm:text-lg font-semibold mb-4 sm:mb-6">
                                <span>Total</span>
                                <span>₹{total}</span>
                            </div>

                            {isLoggedIn ? (
                                <button
                                    onClick={handleConfirm}
                                    className="w-full py-2.5 sm:py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-sm sm:text-base font-semibold rounded-lg transition-colors"
                                >
                                    Confirm
                                </button>
                            ) : (
                                <button
                                    onClick={() => navigate('/login')}
                                    className="w-full py-2.5 sm:py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-sm sm:text-base font-semibold rounded-lg transition-colors"
                                >
                                    Please login first
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
