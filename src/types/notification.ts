export interface Notification {
  _id: string
  message: string
  type: string
  relatedReport?: {
    _id: string
    address: string
    reportType: string
  }
  isRead: boolean
  createdAt: string
}