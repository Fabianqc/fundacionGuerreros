import { create } from 'zustand';

export type NotificationType = "success" | "error" | "info" | "warning";

export interface Notification {
    id: string;
    type: NotificationType;
    message: string;
    duration?: number;
}

interface NotificationState {
    notifications: Notification[];
    addNotification: (type: NotificationType, message: string, duration?: number) => void;
    removeNotification: (id: string) => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
    notifications: [],
    
    addNotification: (type, message, duration = 3000) => {
        const id = Math.random().toString(36).substring(2, 9);
        const newNotification: Notification = { id, type, message, duration };

        set((state) => ({
            notifications: [...state.notifications, newNotification],
        }));

        if (duration > 0) {
            setTimeout(() => {
                get().removeNotification(id);
            }, duration);
        }
    },

    removeNotification: (id) => {
        set((state) => ({
            notifications: state.notifications.filter((notification) => notification.id !== id),
        }));
    },
}));
