import { api } from "../lib/axios";

export type DashboardStatsResponse = {
  totalReports: number;
  completedReports: number;
  ongoingReports: number;
};

export const dashboardService = {
  getStats: async () => {
    const res = await api.get<DashboardStatsResponse>("/admin/dashboard-stats");
    return res.data;
  },
};
