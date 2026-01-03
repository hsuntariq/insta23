import React from 'react';
import { Phone, PhoneOff } from 'lucide-react'; // Optional: install lucide-react for icons



const CallingToast = ( {
    callerName = 'Unknown Caller',
    callerNumber = '+1 (555) 123-4567',
    callerAvatar = 'https://via.placeholder.com/80', // Default placeholder
    onAccept,
    onDecline,
} ) => {
    return (
        <div className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-md animate-pulse">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                {/* Header - Ringing indicator */}
                <div className="bg-green-500 text-white text-center py-3">
                    <div className="flex items-center justify-center gap-2">
                        <Phone className="w-5 h-5 animate-pulse" />
                        <span className="text-sm font-medium">Incoming Call</span>
                    </div>
                </div>

                {/* Body */}
                <div className="p-6 text-center">
                    <img
                        src={callerAvatar}
                        alt={callerName}
                        className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-green-500"
                    />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {callerName}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">{callerNumber}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-600 mt-4 animate-pulse">
                        Ringing...
                    </p>
                </div>

                {/* Actions */}
                <div className="flex justify-center gap-12 pb-8">
                    <button
                        onClick={onDecline}
                        className="bg-red-500 hover:bg-red-600 text-white rounded-full p-4 shadow-lg transition transform hover:scale-110"
                    >
                        <PhoneOff className="w-8 h-8" />
                    </button>
                    <button
                        onClick={onAccept}
                        className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition transform hover:scale-110"
                    >
                        <Phone className="w-8 h-8 rotate-12" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CallingToast;