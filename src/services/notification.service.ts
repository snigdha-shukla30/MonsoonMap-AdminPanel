import { api } from "../lib/axios";
import type { Notification } from "../types/notification"

export const notificationService = {
  getNotifications: async (): Promise<Notification[]> => {
    const res = await api.get<Notification[]>("/admin/notifications")
    return res.data
  },

  markAsRead: async (notificationId: string) => {
    const res = await api.put(`/admin/notifications/${notificationId}/read`)
    return res.data
  },
}