import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchExperiences } from '../../services/api';
import { FiSearch, FiMapPin, FiLoader } from 'react-icons/fi';
import Footer from '../footer/footer';
import Sidebar from '../../components/navbar/sideBar';

export default function ExperiencesHome() {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const [isSidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        loadExperiences();
    }, []);

    const loadExperiences = async (filters = {}) => {
        try {
            setLoading(true);
            const response = await fetchExperiences(filters);
            setExperiences(response.data || []);
        } catch (error) {
            console.error('Failed to load experiences:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        loadExperiences({ search: searchQuery });
    };

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };


    return (
        <div className="min-h-screen bg-gray-50">


            <header className="sticky top-0 z-10 w-full bg-white shadow-sm">
                <div className="flex items-center justify-between p-3 px-6">
                    {/* Left Side: Hamburger Menu & Logo */}
                    <div className="flex items-center gap-5">
                        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

                        {/* Logo: This is a recreation of the logo from your image. */}
                        <div className="flex cursor-pointer items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black">
                                <span className="text-sm font-bold leading-none text-yellow-400">hd</span>
                            </div>
                            <span className="text-lg font-semibold text-gray-800">highway delite</span>
                        </div>
                    </div>

                    {/* Right Side: Search Form */}
                    <form onSubmit={handleSearch} className="flex items-center gap-3">
                        <input
                            type="text"
                            placeholder="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-80 rounded-md border-0 bg-gray-100 text-black px-4 py-2 text-sm focus:outline-none focus:ring-0"
                        />
                        <button
                            type="submit"
                            className="rounded-md bg-yellow-400 px-6 py-2 text-black transition-colors hover:bg-yellow-500"
                        >
                            Search
                        </button>
                    </form>
                </div>
            </header>
            {/* Experiences Grid */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <FiLoader className="animate-spin text-yellow-400" size={48} />
                    </div>
                ) : experiences.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No experiences found</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {experiences.map((experience) => (
                            <Link
                                key={experience._id}
                                to={`/experience/${experience._id}`}
                                className="bg-gray-100 rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden group"
                            >
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={experience.images[0]?.url || 'https://via.placeholder.com/400x300'}
                                        alt={experience.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-4">

                                    <div className="flex items-center text-gray-600 text-sm mb-3">
                                        <FiMapPin className="mr-1" size={14} />
                                        <span className="line-clamp-1">{experience.location.city}</span>
                                        <span className="line-clamp-1 bg-gray-200 p-1 rounded">{experience.location.city}</span>
                                    </div>

                                    <p className="text-gray-600 text-xs mb-4 line-clamp-2">
                                        {experience.shortDescription}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <div className='flex items-center gap-2'>
                                            <span className="text-sm text-gray-500">From</span>
                                            <div className="text-lg font-semi-bold text-gray-900">
                                                ₹{experience.price}
                                            </div>
                                        </div>
                                        <button className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded text-sm transition-colors">
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
