import { NotificationItem } from '@/types';
import { MOCK_NOTIFICATIONS } from '@/lib/supabase/mock-data';

let notificationsStore: NotificationItem[] = [...MOCK_NOTIFICATIONS];

export class NotificationService {
  static getUserNotifications(userId: string): NotificationItem[] {
    return notificationsStore.filter((n) => n.user_id === userId);
  }

  static getUnreadCount(userId: string): number {
    return notificationsStore.filter((n) => n.user_id === userId && !n.is_read).length;
  }

  static markAsRead(notificationId: string): void {
    const item = notificationsStore.find((n) => n.id === notificationId);
    if (item) {
      item.is_read = true;
    }
  }

  static markAllAsRead(userId: string): void {
    notificationsStore.forEach((n) => {
      if (n.user_id === userId) {
        n.is_read = true;
      }
    });
  }

  static createNotification(params: {
    userId: string;
    type: string;
    title: string;
    message: string;
    metadata?: Record<string, any>;
  }): NotificationItem {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      user_id: params.userId,
      type: params.type,
      title: params.title,
      message: params.message,
      is_read: false,
      metadata: params.metadata,
      created_at: new Date().toISOString()
    };
    notificationsStore.unshift(newNotif);
    return newNotif;
  }
}
