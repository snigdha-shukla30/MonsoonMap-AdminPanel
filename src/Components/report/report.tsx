"use client";

import React, { useEffect, useState } from "react";
import { Search, Filter, Bell } from "lucide-react";

export default function Reports() {
  interface Report {
    id: number;
    location: string;
    date: string;
    time: string;
    reportType: string;
    status: string;
  }

  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ future API call yahi pe
  const fetchReports = async () => {
    try {
      setLoading(true);

      // TODO: yaha tum apna API URL laga dena
      // const res = await fetch("YOUR_API_URL");
      // const data = await res.json();
      // setReports(data);

      // Dummy
      setReports([
        {
          id: 1,
          location: "Canaught Place",
          date: "25/02/2025",
          time: "09:45 AM",
          reportType: "Water Log",
          status: "09:45 AM",
        },
        {
          id: 2,
          location: "Akhand Vihar",
          date: "25/02/2025",
          time: "09:45 AM",
          reportType: "Drain Block",
          status: "09:45 AM",
        },
        {
          id: 3,
          location: "Janki Vihar",
          date: "25/02/2025",
          time: "09:45 AM",
          reportType: "Water Log",
          status: "09:45 AM",
        },
      ]);
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
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-600">
              Welcome Alfred !
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Here is the overview of All Submitted reports
            </p>
          </div>

          <button className="relative p-2 hover:bg-gray-100 rounded-lg">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
        </div>

        {/* Search */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
            <input
              type="text"
              placeholder="Search for complaint id"
              className="w-full pl-10 pr-4 py-2.5 placeholder:text-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Table */}
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
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {report.id}.
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
                      <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600">
                        <span>📋</span>
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
