"use client";

import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, Info, X, AlertTriangle } from "lucide-react";
import { useEffect } from "react";
import { NotificationType } from "../context/NotificationContext";

interface NotificationToastProps {
    id: string;
    type: NotificationType;
    message: string;
    onClose: () => void;
}

const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
};

const styles = {
    success: "bg-white border-green-100",
    error: "bg-white border-red-100",
    warning: "bg-white border-yellow-100",
    info: "bg-white border-blue-100",
};

export default function NotificationToast({ id, type, message, onClose }: NotificationToastProps) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`flex items-start gap-3 p-4 rounded-xl shadow-lg border border-l-4 min-w-[300px] max-w-sm backdrop-blur-sm ${styles[type]} ${type === 'success' ? 'border-l-green-500' :
                    type === 'error' ? 'border-l-red-500' :
                        type === 'warning' ? 'border-l-yellow-500' :
                            'border-l-blue-500'
                }`}
        >
            <div className="flex-shrink-0 mt-0.5">{icons[type]}</div>
            <div className="flex-1">
                <p className="text-sm font-medium text-gray-800 leading-snug">{message}</p>
            </div>
            <button
                onClick={onClose}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
            >
                <X className="w-4 h-4" />
            </button>
        </motion.div>
    );
}
