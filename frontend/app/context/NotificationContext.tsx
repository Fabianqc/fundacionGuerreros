"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
// import { v4 as uuidv4 } from 'uuid'; // Removed to avoid type issues
import NotificationToast from "@/app/components/NotificationToast";

export type NotificationType = "success" | "error" | "info" | "warning";

export interface Notification {
    id: string;
    type: NotificationType;
    message: string;
    duration?: number;
}

interface NotificationContextProps {
    addNotification: (type: NotificationType, message: string, duration?: number) => void;
    removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const addNotification = useCallback((type: NotificationType, message: string, duration = 3000) => {
        const id = Math.random().toString(36).substring(2, 9); // Simple ID generation
        const newNotification: Notification = { id, type, message, duration };

        setNotifications((prev) => [...prev, newNotification]);

        if (duration > 0) {
            setTimeout(() => {
                removeNotification(id);
            }, duration);
        }
    }, []);

    const removeNotification = useCallback((id: string) => {
        setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    }, []);

    return (
        <NotificationContext.Provider value={{ addNotification, removeNotification }}>
            {children}
            <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-2 pointer-events-none">
                {notifications.map((notification) => (
                    <div key={notification.id} className="pointer-events-auto">
                        <NotificationToast
                            id={notification.id}
                            type={notification.type}
                            message={notification.message}
                            onClose={() => removeNotification(notification.id)}
                        />
                    </div>
                ))}
            </div>
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error("useNotification must be used within a NotificationProvider");
    }
    return context;
}
