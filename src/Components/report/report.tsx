"use client";

import React, { useEffect, useState } from "react";
import {Header} from "../ui/header";
import { reportService } from "../../services/report.service";

export default function Reports() {
  interface Report {
    id: string;
    location: string;
    address?: string;
    date: string;
    time: string;
    reportType: string;
    status: string;
    imageUrl: string;
    description: string; // ✅ ADD
  }

  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Modal states
  const [openModal, setOpenModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const fetchReports = async () => {
    try {
      setLoading(true);

      const data: any = await reportService.getReports();

      const mappedReports: Report[] = (data?.features || []).map(
        (feature: any) => {
          const p = feature?.properties || {};
          const coords = feature?.geometry?.coordinates || [0, 0];
          const [lng, lat] = coords;

          return {
            id: p.id,
            location: p.address || `Lat: ${lat}, Lng: ${lng}`,
            address: p.address,
            date: p.eventDate || "",
            time: p.eventTime || "",
            reportType: p.reportType || "",
            status: p.status || "",
            description: p.description || "", // ✅ ADD

            // ✅ FIX: try https also
            imageUrl: (p.imageUrl || "").replace("http://", "https://"),
          };
        }
      );

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
    <div className="flex-1 flex flex-col bg-white rounded-l-[25px] shadow-lg overflow-hidden relative">
      <Header />

      <div className="flex-1 overflow-auto px-4 sm:px-8 py-4 sm:py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {loading ? (
            <div className="p-6 text-gray-500 text-sm">Loading reports...</div>
          ) : (
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[900px]">
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
                            console.log("Selected Report:", report);
                            console.log("Image URL:", report.imageUrl);

                            setSelectedReport(report);
                            setOpenModal(true);
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
            </div>
          )}
        </div>
      </div>

      {/* ✅ MODAL */}
      {openModal && selectedReport && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => {
            setOpenModal(false);
            setSelectedReport(null);
          }}
        >
          {/* Modal Box */}
          <div
            className="bg-white w-[90%] max-w-md rounded-xl shadow-xl overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cross Button */}
            <button
              onClick={() => {
                setOpenModal(false);
                setSelectedReport(null);
              }}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center text-gray-600 hover:text-black"
            >
              ✖
            </button>

            {/* ✅ Image */}
            <div className="w-full h-72 bg-gray-100 flex items-center justify-center">
              {selectedReport.imageUrl ? (
                <img
                  src={selectedReport.imageUrl}
                  alt="Report"
                  className="max-w-full max-h-full object-contain"
                  onLoad={() => {
                    console.log("✅ Image Loaded:", selectedReport.imageUrl);
                  }}
                  onError={(e) => {
                    console.log(
                      "❌ Image Load Failed (blocked or invalid):",
                      selectedReport.imageUrl
                    );

                    // ✅ remove broken image from UI
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <p className="text-sm text-gray-500">No image available</p>
              )}
            </div>

            {/* ✅ Details (includes description) */}
            <div className="p-4 space-y-1">
              <p className="text-sm text-gray-600">
                <b>Type:</b> {selectedReport.reportType}
              </p>

              <p className="text-sm text-gray-600">
                <b>Status:</b> {selectedReport.status}
              </p>

              <p className="text-sm text-gray-600">
                <b>Date/Time:</b> {selectedReport.date} {selectedReport.time}
              </p>

              <p className="text-sm text-gray-600">
                <b>Location:</b> {selectedReport.location}
              </p>

              {/* ✅ Description show */}
              <p className="text-sm text-gray-600">
                <b>Description:</b>{" "}
                {selectedReport.description?.trim()
                  ? selectedReport.description
                  : "N/A"}
              </p>

              {/* ✅ Image missing info */}
              {!selectedReport.imageUrl && (
                <p className="text-sm text-red-500 mt-2">
                  Image not available
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}







