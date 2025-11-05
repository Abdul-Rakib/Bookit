import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchExperiences } from '../../services/api';
import { FiMapPin, FiLoader } from 'react-icons/fi';
import Footer from '../footer/footer';
import NavBar from '../../components/navbar/NavBar';

export default function ExperiencesHome() {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [imageLoadStates, setImageLoadStates] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        loadExperiences();
    }, []);

    const loadExperiences = async (filters = {}) => {
        try {
            setLoading(true);
            const response = await fetchExperiences(filters);
            setExperiences(response.data || []);
            // Initialize image load states
            const loadStates = {};
            response.data?.forEach(exp => {
                loadStates[exp._id] = false;
            });
            setImageLoadStates(loadStates);
        } catch (error) {
            console.error('Failed to load experiences:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (searchQuery) => {
        loadExperiences({ search: searchQuery });
    };

    const handleImageLoad = (expId) => {
        setImageLoadStates(prev => ({
            ...prev,
            [expId]: true
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <NavBar onSearch={handleSearch} showSearch={true} />
            {/* Experiences Grid */}
            <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <FiLoader className="animate-spin text-yellow-400" size={48} />
                    </div>
                ) : experiences.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-base sm:text-lg">No experiences found</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                        {experiences.map((experience) => (
                            <Link
                                key={experience._id}
                                to={`/experience/${experience._id}`}
                                className="bg-gray-100 rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden group"
                            >
                                {/* Image */}
                                <div className="relative h-40 sm:h-48 overflow-hidden bg-gray-200">
                                    {/* Loading skeleton */}
                                    {!imageLoadStates[experience._id] && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
                                    )}
                                    <img
                                        src={experience.images[0]?.url || 'https://via.placeholder.com/400x300'}
                                        alt={experience.title}
                                        loading="lazy"
                                        decoding="async"
                                        onLoad={() => handleImageLoad(experience._id)}
                                        className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-300 ${
                                            imageLoadStates[experience._id] ? 'opacity-100' : 'opacity-0'
                                        }`}
                                        style={{ 
                                            willChange: 'transform',
                                            backfaceVisibility: 'hidden',
                                            transform: 'translateZ(0)'
                                        }}
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-3 sm:p-4">

                                    <div className="flex items-center text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3">
                                        <FiMapPin className="mr-1 flex-shrink-0" size={14} />
                                        <span className="line-clamp-1">{experience.location.city}</span>
                                        <span className="line-clamp-1 bg-gray-200 p-1 rounded ml-2">{experience.location.city}</span>
                                    </div>

                                    <p className="text-gray-600 text-xs mb-3 sm:mb-4 line-clamp-2">
                                        {experience.shortDescription}
                                    </p>

                                    <div className="flex items-center justify-between gap-2">
                                        <div className='flex items-center gap-1 sm:gap-2'>
                                            <span className="text-xs sm:text-sm text-gray-500">From</span>
                                            <div className="text-base sm:text-lg font-semi-bold text-gray-900">
                                                ₹{experience.price}
                                            </div>
                                        </div>
                                        <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded text-xs sm:text-sm transition-colors whitespace-nowrap">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
