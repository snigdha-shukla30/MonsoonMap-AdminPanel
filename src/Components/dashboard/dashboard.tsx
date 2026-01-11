"use client";

import React, { useEffect, useMemo, useState } from "react";
import { FileText, CheckCircle, Clock } from "lucide-react";
import {Header} from "../../Components/ui/header";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import { dashboardService } from "../../services/dashboard.service";

type MapType = "waterlog" | "drainblock";

type ReportMarker = {
  id: number;
  title: string;
  type: MapType;
  lat: number;
  lng: number;
  count?: number;
};

export default function DashboardRight() {
  const [mapType, setMapType] = useState<MapType>("waterlog");
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ API stats state
  const [statsData, setStatsData] = useState({
    totalReports: 0,
    completedReports: 0,
    ongoingReports: 0,
  });

  const fetchDashboardStats = async () => {
    try {
      const res = await dashboardService.getStats();

      setStatsData({
        totalReports: res.totalReports,
        completedReports: res.completedReports,
        ongoingReports: res.ongoingReports,
      });
    } catch (error) {
      console.error("fetchDashboardStats error:", error);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  // ✅ stats array (UI same, values API se)
  const stats = [
    {
      id: 1,
      count: statsData.totalReports, // ✅ API mapped
      label: "Total Report",
      sublabel: "Received",
      icon: FileText,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: 2,
      count: statsData.completedReports, // ✅ API mapped
      label: "Resolved Report",
      sublabel: "",
      icon: CheckCircle,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: 3,
      count: statsData.ongoingReports, // ✅ API mapped
      label: "Pending Reports",
      sublabel: "",
      icon: Clock,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
  ];

  // ✅ Dummy markers (same)
  const allMarkers: ReportMarker[] = [
    {
      id: 1,
      title: "Velle Punjabi G",
      type: "drainblock",
      lat: 28.6358,
      lng: 77.2245,
    },
    {
      id: 2,
      title: "TMB Tata Motors",
      type: "waterlog",
      lat: 28.6204,
      lng: 77.2142,
      count: 30,
    },
    {
      id: 3,
      title: "Gaurav Optical",
      type: "waterlog",
      lat: 28.5882,
      lng: 77.1726,
    },
    {
      id: 4,
      title: "Icon Hospital",
      type: "drainblock",
      lat: 28.5609,
      lng: 77.2511,
    },
  ];

  const filteredMarkers = useMemo(() => {
    return allMarkers.filter((m) => m.type === mapType);
  }, [mapType]);

  const mapCenter = useMemo(() => ({ lat: 28.6139, lng: 77.209 }), []);

  const markerIcon = useMemo(() => {
    const blue = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
    const red = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
    return mapType === "waterlog" ? blue : red;
  }, [mapType]);

  return (
    <div className="flex-1 flex flex-col bg-white rounded-l-[25px] shadow-lg overflow-hidden">
      <Header
        title="Welcome Alfred !"
        subtitle="Here is the overview of All Submitted reports ."
        showFilter={false}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="flex-1 overflow-auto bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.id}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-4xl font-bold text-gray-700 mb-1">
                        {stat.count}
                      </div>
                      <div className="text-gray-500 font-medium text-sm">
                        {stat.label}
                      </div>
                      {stat.sublabel && (
                        <div className="text-gray-400 text-sm">
                          {stat.sublabel}
                        </div>
                      )}
                    </div>

                    <div className={`${stat.bgColor} p-5 rounded-full`}>
                      <Icon className={`w-8 h-8 ${stat.iconColor}`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Map Analytics Section (unchanged) */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
              <h2 className="text-xl font-semibold text-gray-600">
                Map Analytics
              </h2>
            </div>

            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setMapType("waterlog")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all text-sm font-medium ${
                  mapType === "waterlog"
                    ? "bg-blue-50 border-blue-400 text-blue-600"
                    : "bg-white border-gray-300 text-gray-600 hover:border-gray-400"
                }`}
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    mapType === "waterlog" ? "bg-blue-500" : "bg-gray-400"
                  }`}
                ></div>
                Water Log
              </button>

              <button
                onClick={() => setMapType("drainblock")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all text-sm font-medium ${
                  mapType === "drainblock"
                    ? "bg-red-50 border-red-400 text-red-600"
                    : "bg-white border-gray-300 text-gray-600 hover:border-gray-400"
                }`}
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    mapType === "drainblock" ? "bg-red-500" : "bg-gray-400"
                  }`}
                ></div>
                Drain Block
              </button>
            </div>

            <div className="relative w-full h-96 bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
              <LoadScript
                googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!}
              >
                <GoogleMap
                  mapContainerStyle={{ width: "100%", height: "100%" }}
                  center={mapCenter}
                  zoom={11}
                  options={{
                    fullscreenControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                  }}
                >
                  {filteredMarkers.map((m) => (
                    <MarkerF
                      key={m.id}
                      position={{ lat: m.lat, lng: m.lng }}
                      title={m.title}
                      icon={markerIcon}
                    />
                  ))}
                </GoogleMap>
              </LoadScript>

              {/* existing overlay chips unchanged */}
              <div className="absolute top-6 left-32 bg-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1 pointer-events-none">
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                  🍽️
                </div>
                Velle Punjabi G
              </div>

              <div className="absolute top-6 right-32 bg-blue-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-2 pointer-events-none">
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-blue-600">
                  💧
                </div>
                TMB Tata Motors
                <span className="bg-yellow-400 text-blue-900 px-2 py-0.5 rounded-full text-xs font-bold">
                  30
                </span>
              </div>

              <div className="absolute bottom-24 left-32 bg-blue-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1 pointer-events-none">
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                  🏪
                </div>
                Gaurav Optical
              </div>

              <div className="absolute bottom-16 right-24 bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1 pointer-events-none">
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                  🏥
                </div>
                Icon Hospital
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



