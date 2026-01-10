"use client";

import React, { useState } from "react";
import { FileText, CheckCircle, Clock } from "lucide-react";
import Header from "../../Components/ui/header";

export default function DashboardRight() {
  const [mapType, setMapType] = useState<"waterlog" | "drainblock">("waterlog");
  const [searchQuery, setSearchQuery] = useState("");

  const stats = [
    {
      id: 1,
      count: 25,
      label: "Total Report",
      sublabel: "Received",
      icon: FileText,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: 2,
      count: 15,
      label: "Resolved Report",
      sublabel: "",
      icon: CheckCircle,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: 3,
      count: 5,
      label: "Pending Reports",
      sublabel: "",
      icon: Clock,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
  ];

  return (
    <div className="flex-1 flex flex-col bg-white rounded-l-[25px] shadow-lg overflow-hidden">
      {/* ✅ SAME HEADER AS REPORT PAGE */}
      <Header
        title="Welcome Alfred !"
        subtitle="Here is the overview of All Submitted reports ."
        showFilter={false}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* ✅ Dashboard Body */}
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

          {/* Map Analytics Section */}
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

            {/* Map Type Toggles */}
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

            {/* Map Container */}
            <div className="relative w-full h-96 bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224346.54004882768!2d77.04417!3d28.527554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1234567890"
              ></iframe>

              {/* Markers */}
              <div className="absolute top-6 left-32 bg-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1">
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                  🍽️
                </div>
                Velle Punjabi G
              </div>

              <div className="absolute top-6 right-32 bg-blue-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-2">
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-blue-600">
                  💧
                </div>
                TMB Tata Motors
                <span className="bg-yellow-400 text-blue-900 px-2 py-0.5 rounded-full text-xs font-bold">
                  30
                </span>
              </div>

              <div className="absolute bottom-24 left-32 bg-blue-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1">
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                  🏪
                </div>
                Gaurav Optical
              </div>

              <div className="absolute bottom-16 right-24 bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1">
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








// "use client";

// import React, { useEffect, useState } from "react";
// import { Search, Filter, Bell } from "lucide-react";

// export default function Dashboard() {
//   interface Report {
//     id: number;
//     location: string;
//     date: string;
//     time: string;
//     reportType: string;
//     status: string;
//   }

//   const [reports, setReports] = useState<Report[]>([]);
//   const [loading, setLoading] = useState(false);

//   // ✅ future API call yahi pe
// //   const fetchReports = async () => {
// //     try {
// //       setLoading(true);

// //       // TODO: yaha tum apna API URL laga dena
// //       // const res = await fetch("YOUR_API_URL");
// //       // const data = await res.json();
// //       // setReports(data);

// //       // Dummy
// //       setReports([
// //         {
// //           id: 1,
// //           location: "Canaught Place",
// //           date: "25/02/2025",
// //           time: "09:45 AM",
// //           reportType: "Water Log",
// //           status: "09:45 AM",
// //         },
// //         {
// //           id: 2,
// //           location: "Akhand Vihar",
// //           date: "25/02/2025",
// //           time: "09:45 AM",
// //           reportType: "Drain Block",
// //           status: "09:45 AM",
// //         },
// //         {
// //           id: 3,
// //           location: "Janki Vihar",
// //           date: "25/02/2025",
// //           time: "09:45 AM",
// //           reportType: "Water Log",
// //           status: "09:45 AM",
// //         },
// //       ]);
// //     } catch (error) {
// //       console.error("fetchReports error:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchReports();
// //   }, []);

//   return (
//     <div className="flex-1 flex flex-col bg-white rounded-l-[25px] shadow-lg overflow-hidden">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200 px-8 py-6">
//         <div className="flex items-start justify-between mb-4">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-600">
//               Welcome Alfred !
//             </h2>
//             <p className="text-sm text-gray-500 mt-1">
//               Here is the overview of All Submitted reports
//             </p>
//           </div>

//           <button className="relative p-2 hover:bg-gray-100 rounded-lg">
//             <Bell className="w-5 h-5 text-gray-600" />
//             <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
//           </button>
//         </div>

//         {/* Search */}
//         <div className="flex gap-3">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
//             <input
//               type="text"
//               placeholder="Search for complaint id"
//               className="w-full pl-10 pr-4 py-2.5 placeholder:text-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <button className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
//             <Filter className="w-5 h-5 text-gray-600" />
//           </button>
//         </div>
//       </div>

//       {/* Table */}
//       {/* <div className="flex-1 overflow-auto px-8 py-6">
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//           {loading ? (
//             <div className="p-6 text-gray-500 text-sm">Loading reports...</div>
//           ) : (
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b border-gray-200">
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Sr no
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Location
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Date
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Time
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Report Type
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Details
//                   </th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-gray-200">
//                 {reports.map((report) => (
//                   <tr key={report.id} className="hover:bg-gray-50 transition">
//                     <td className="px-6 py-4 text-sm text-gray-500">
//                       {report.id}.
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-700">
//                       {report.location}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-500">
//                       {report.date}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-500">
//                       {report.time}
//                     </td>

//                     <td className="px-6 py-4">
//                       <span
//                         className={`text-sm font-medium ${
//                           report.reportType === "Water Log"
//                             ? "text-blue-600"
//                             : "text-red-600"
//                         }`}
//                       >
//                         {report.reportType}
//                       </span>
//                     </td>

//                     <td className="px-6 py-4 text-sm text-gray-500">
//                       {report.status}
//                     </td>

//                     <td className="px-6 py-4">
//                       <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600">
//                         <span>📋</span>
//                         <span>View</span>
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div> */}
//       {/* </div> */}
//     </div>
//   );
// }
