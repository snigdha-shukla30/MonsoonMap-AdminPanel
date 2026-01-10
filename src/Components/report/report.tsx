"use client";

import React, { useEffect, useState } from "react";
import Header from "../ui/header";
import { reportService } from "../../services/report.service";

export default function Reports() {
  interface Report {
    id: string;
    location: string;
    date: string;
    time: string;
    reportType: string;
    status: string;
    imageUrl: string; // ✅ ADD THIS
  }

  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ useState always here (top level)
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const fetchReports = async () => {
    try {
      setLoading(true);

      const data: any = await reportService.getReports();

      const mappedReports: Report[] = data.features.map((feature: any) => {
        const p = feature.properties;
        const [lng, lat] = feature.geometry.coordinates;

        return {
          id: p.id,
          location: `Lat: ${lat}, Lng: ${lng}`,
          date: p.eventDate,
          time: p.eventTime,
          reportType: p.reportType,
          status: p.status,
          imageUrl: p.imageUrl, // ✅ ADD THIS
        };
      });

      setReports(mappedReports);
    } catch (error) {
      console.error("fetchReports error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-white rounded-l-[25px] shadow-lg overflow-hidden">
      <Header />

      <div className="flex-1 overflow-auto px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {loading ? (
            <div className="p-6 text-gray-500 text-sm">Loading reports...</div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Sr no
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Report Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {reports.map((report, index) => (
                  <tr key={report.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {index + 1}.
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700">
                      {report.location}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500">
                      {report.date}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500">
                      {report.time}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`text-sm font-medium ${
                          report.reportType === "Water Log"
                            ? "text-blue-600"
                            : "text-red-600"
                        }`}
                      >
                        {report.reportType}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500">
                      {report.status}
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setSelectedReport(report);
                          console.log("Selected Report:", report);
                          console.log("Image URL:", report.imageUrl);

                          if (report.imageUrl) {
                            window.open(report.imageUrl, "_blank");
                          } else {
                            alert("Image not available");
                          }
                        }}
                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600"
                      >
                        <span>📋</span>
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}

                {!loading && reports.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-10 text-gray-400">
                      No Reports Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}




