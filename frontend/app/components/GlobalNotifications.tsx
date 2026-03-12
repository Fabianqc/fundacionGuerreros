"use client";

import React from "react";
import NotificationToast from "./NotificationToast";
import { useNotificationStore } from "../store/useNotificationStore";

export default function GlobalNotifications() {
    const { notifications, removeNotification } = useNotificationStore();

    return (
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
    );
}
