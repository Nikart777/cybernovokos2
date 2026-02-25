'use client';

// The Arena module was deprecated and removed.
// Previously this component polled /api/arena/lobbies every 15s.
// Since Social Hub uses websockets directly for challenges, this
// polling component is being heavily stripped to only request Notification
// Permission, should any other part of the app need it in the future.

import { useState, useEffect } from 'react';

export default function NotificationSystem() {
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    // Проверяем текущий статус прав
    if ("Notification" in window) {
      setPermission(Notification.permission);
    }
  }, []);

  return null; // Empty component now, it doesn't render any UI
}