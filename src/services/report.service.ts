// import { api } from "../lib/axios";
// import type { GeoJSONReportsResponse } from "../types/report";

// export const reportService = {
//   getReports: async () => {
   
//     const res = await api.get<GeoJSONReportsResponse>("/admin/reports");
//     return res.data;
//   },
// };

import { api } from "../lib/axios";
import type { GeoJSONReportsResponse } from "../types/report";

export const reportService = {
  getReports: async () => {
    const res = await api.get<GeoJSONReportsResponse>("/admin/reports");
    return res.data;
  },
};
