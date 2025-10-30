import { useLocation, Link } from 'react-router-dom';
import { FiXCircle } from 'react-icons/fi';

export default function BookingFailed() {
    const location = useLocation();
    const { error } = location.state || {};

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                <div className="mb-6">
                    <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <FiXCircle className="text-red-600" size={48} />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Failed</h1>
                    <p className="text-gray-600">
                        {error || 'We were unable to process your booking. Please try again.'}
                    </p>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-red-800">
                        {error?.includes('already have a booking')
                            ? 'You already have a booking for this time slot. Please select a different slot or check your existing bookings.'
                            : 'If the amount was deducted, it will be refunded within 5-7 business days.'}
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <Link
                        to="/experiences"
                        className="block w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg transition-colors"
                    >
                        Back to Home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="block w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-lg transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        </div>
    );
}
