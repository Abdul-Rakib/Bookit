import { useLocation, Link } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';

export default function BookingSuccess() {
    const location = useLocation();
    const { bookingId, booking } = location.state || {};

    if (!bookingId) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="text-center">
                    <p className="text-gray-500 text-lg mb-4">No booking information found</p>
                    <Link to="/experiences" className="text-yellow-600 hover:underline">
                        Back to experiences
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full rounded-2xl p-8 text-center">
                <div className="mb-6">
                    <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <FiCheckCircle className="text-green-600" size={48} />
                    </div>
                    <h1 className="text-3xl font-semibold text-gray-900 mb-2">Booking Confirmed</h1>
                </div>

                <div className="bg-gray-50 rounded-lg p-2 mb-6">
                    <div className="text-lg text-gray-500 mb-1">Ref ID</div>
                    <div className="text-lg text-gray-600 mb-4">{bookingId}</div>
                </div>

                <Link
                    to="/experiences"
                    className="block w-full py-3 bg-gray-200 hover:bg-yellow-500 text-gray-600 rounded-lg transition-colors"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
