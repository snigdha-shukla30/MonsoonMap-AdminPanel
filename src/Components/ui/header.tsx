"use client"

import { useEffect, useState, useRef } from "react"
import { Bell } from "lucide-react"
import { Button } from "./button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./drop-downmenu"
import { notificationService } from "../../services/notification.service"
import { storage } from "@/src/utils/storage"
import type { Notification } from "../../types/notification"

export function Header() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [unreadCount, setUnreadCount] = useState(0)
  const [hasToken, setHasToken] = useState(false)
  // Show badge until user opens the dropdown; reset when new unread arrives
  const [showBadge, setShowBadge] = useState(false)
  // Track how many unread notifications were last seen when dropdown was opened
  const [lastSeenUnread, setLastSeenUnread] = useState(0)
  const lastSeenUnreadRef = useRef(0)
  const [badgeCount, setBadgeCount] = useState(0)

  useEffect(() => {
    const token = storage.getToken()
    setHasToken(!!token)

    if (!token) {
      setIsLoading(false)
      return
    }

    const fetchNotifications = async () => {
      try {
        setIsLoading(true)
        const data: any = await notificationService.getNotifications()
        let notificationsArr: Notification[] = Array.isArray(data) ? data : (data.notifications ?? [])

        // Deduplicate notifications by _id (API may return duplicates)
        const uniqueMap = new Map<string, Notification>()
        notificationsArr.forEach((n) => {
          if (!uniqueMap.has(n._id)) uniqueMap.set(n._id, n)
        })
        notificationsArr = Array.from(uniqueMap.values())

        setNotifications(notificationsArr)

        // Count unread notifications
        const unread = notificationsArr.filter((n) => !n.isRead).length
        setUnreadCount(unread)

        // Compute new notifications since the user last opened the dropdown
        const diff = Math.max(0, unread - lastSeenUnreadRef.current)
        setBadgeCount(diff)
        setShowBadge(diff > 0)

        setError(null)
      } catch (err) {
        console.error("[v0] Error fetching notifications:", err)
        setError("Failed to load notifications")
      } finally {
        setIsLoading(false)
      }
    }

    fetchNotifications()

    // Refresh notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000)

    return () => clearInterval(interval)
  }, [])

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await notificationService.markAsRead(notificationId)

      // Update local state
      setNotifications((prev) => prev.map((n) => (n._id === notificationId ? { ...n, isRead: true } : n)))

      setUnreadCount((prev) => Math.max(0, prev - 1))
    } catch (err) {
      console.error("[v0] Error marking notification as read:", err)
    }
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
      <div className="text-2xl font-bold text-gray-800">Monsoon Map</div>

      <DropdownMenu onOpenChange={(open) => {
            if (open) {
              setShowBadge(false)
              setLastSeenUnread(unreadCount)
              lastSeenUnreadRef.current = unreadCount
              setBadgeCount(0)
            }
          }}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-gray-700" />

            {/* Unread notification badge (shown until dropdown is opened) */}
            {showBadge && badgeCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                {badgeCount}
              </span>
            )}

          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-80">
          <div className="px-4 py-3 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
          </div>

          {/* Notifications list */}
          <div className="max-h-96 overflow-y-auto">
            {!hasToken ? (
              <div className="px-4 py-8 text-center text-sm text-gray-500">Please login to view notifications</div>
            ) : isLoading ? (
              <div className="px-4 py-8 text-center text-sm text-gray-500">Loading notifications...</div>
            ) : error ? (
              <div className="px-4 py-8 text-center text-sm text-red-500">{error}</div>
            ) : notifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-gray-500">No notifications</div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification._id}
                  className={`px-4 py-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition ${
                    !notification.isRead ? "bg-blue-50" : ""
                  }`}
                  onClick={() => handleMarkAsRead(notification._id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {notification.type === "REPORT_SUBMISSION"
                          ? (notification.relatedReport?.reportType ?? "New Report")
                          : notification.type}
                      </p>

                      {notification.type === "REPORT_SUBMISSION" ? (
                        notification.relatedReport ? (
                          notification.relatedReport.address ? (
                            <p className="text-sm text-gray-600 mt-1 wrap-break-word">📍 {notification.relatedReport.address}</p>
                          ) : (
                            <p className="text-sm text-gray-600 mt-1 wrap-break-word">No report details</p>
                          )
                        ) : (
                          <p className="text-sm text-gray-600 mt-1 wrap-break-word">No report details</p>
                        )
                      ) : (
                        <p className="text-sm text-gray-600 mt-1 wrap-break-word">{notification.message}</p>
                      )}

                      <p className="text-xs text-gray-400 mt-2">{formatTimeAgo(notification.createdAt)}</p>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}

// Helper function to format time ago
function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return "just now"
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`

  return date.toLocaleDateString()
}






// "use client";

// import React from "react";
// import { Search, Filter, Bell } from "lucide-react";

// export default function Header() {
//   return (
//     <div className="bg-white border-b border-gray-200 px-4 sm:px-8 py-4 sm:py-6">
//       <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
//         <div>
//           <h2 className="text-xl sm:text-2xl font-bold text-gray-600">
//             Welcome Alfred !
//           </h2>
//           <p className="text-sm text-gray-500 mt-1">
//             Here is the overview of All Submitted reports
//           </p>
//         </div>

//         <button className="relative p-2 hover:bg-gray-100 rounded-lg self-end sm:self-auto">
//           <Bell className="w-5 h-5 text-gray-600" />
//           <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
//         </button>
//       </div>

//       {/* Search */}
//       <div className="flex flex-col sm:flex-row gap-3">
//         <div className="flex-1 relative">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
//           <input
//             type="text"
//             placeholder="Search for complaint id"
//             className="w-full pl-10 pr-4 py-2.5 placeholder:text-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <button className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 justify-center sm:justify-start">
//           <Filter className="w-5 h-5 text-gray-600" />
//         </button>
//       </div>
//     </div>
//   );
// }



