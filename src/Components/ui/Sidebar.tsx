"use client";

import React from "react";
import { FileTextIcon, LayoutDashboardIcon, LogOutIcon } from "lucide-react";

const navigationItems = [
  {
    id: "dashboard",
    label: "DashBoard",
    icon: LayoutDashboardIcon,
    active: false,
  },
  {
    id: "reports",
    label: "Reports",
    icon: FileTextIcon,
    active: true,
  },
];

export default function Sidebar() {
  return (
    <aside className="relative w-[300px] h-full bg-[linear-gradient(180deg,rgb(174,209,255)_0%,rgb(126,145,169)_100%)] flex flex-col shrink-0">
      {/* Logo */}
      <div className="flex flex-col items-center pt-[42px] px-6 pb-[43px]">
        <img
          className="w-[90px] h-[68px]"
          alt="Monsoon Map Logo"
          src="https://c.animaapp.com/mk8ctpouJJCrVa/img/image-6.png"
        />
        <h1 className="mt-3 font-bold text-white text-[24px] leading-[22.9px] whitespace-nowrap">
          Monsoon Map
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-[12px] px-6">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              className={`h-[50px] w-full flex items-center justify-start gap-[12px] px-[19px] rounded-[7px] transition-colors ${
                item.active
                  ? "bg-[linear-gradient(270deg,rgba(32,219,240,1)_0%,rgba(32,87,161,1)_100%)] shadow-[0px_2px_5.1px_#00000026]"
                  : "hover:bg-white/10"
              }`}
            >
              <Icon className="w-[20px] h-[20px] text-white" strokeWidth={2} />
              <span className="font-semibold text-white text-[16px] leading-[24.4px]">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Footer Profile */}
      <div className="mt-auto w-full h-[75px] flex items-center gap-[5px] px-[7.5px] border-t-[1.25px] border-t-white shadow-[0px_-5px_7.88px_rgba(0,0,0,1)]">
        {/* Avatar */}
        <div className="w-[37.5px] h-[37.5px] rounded-full overflow-hidden bg-gray-400 shrink-0">
          <img
            src="https://c.animaapp.com/mk8ctpouJJCrVa/img/chat-window.png"
            alt="Divyansh Pandey"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name + Email */}
        <div className="flex flex-col flex-1 min-w-0">
          <span className="font-semibold text-white text-[10px] leading-[15px] truncate">
            Divyansh Pandey
          </span>
          <span className="font-semibold text-white text-[10px] leading-[15px] truncate">
            pandeydivyansh574@gmail.com
          </span>
        </div>

        {/* Logout */}
        <button className="p-0 hover:opacity-80 transition">
          <LogOutIcon className="w-[25px] h-[25px] text-white" />
        </button>
      </div>
    </aside>
  );
}




// import React from "react";

// export default function Sidebar() {
//   return (
//     <div className="w-64 h-screen bg-gradient-to-b from-blue-300 via-blue-300 to-blue-200 text-white flex flex-col">
//       {/* Logo Section */}
//       <div className="pt-8 pb-6 flex flex-col items-center">
//         <div className="relative mb-3">
//           {/* Ripple effect */}
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="w-14 h-3 border border-white border-opacity-40 rounded-full"></div>
//           </div>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="w-20 h-4 border border-white border-opacity-30 rounded-full mt-2"></div>
//           </div>
//           {/* Water droplet */}
//           <div className="relative w-12 h-12 flex items-center justify-center">
//             <svg width="40" height="48" viewBox="0 0 40 48" fill="none">
//               <path d="M20 0C20 0 0 20 0 32C0 40.8366 8.95431 48 20 48C31.0457 48 40 40.8366 40 32C40 20 20 0 20 0Z" fill="rgba(255,255,255,0.3)"/>
//             </svg>
//           </div>
//         </div>
//         <h1 className="text-xl font-bold tracking-wide">Monsoon Map</h1>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 px-5 mt-4">
//         <button className="w-full flex items-center gap-3 px-4 py-3 text-white text-opacity-80 hover:bg-white hover:bg-opacity-10 rounded-md transition mb-1 group">
//           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//             <rect x="3" y="3" width="7" height="7"></rect>
//             <rect x="14" y="3" width="7" height="7"></rect>
//             <rect x="14" y="14" width="7" height="7"></rect>
//             <rect x="3" y="14" width="7" height="7"></rect>
//           </svg>
//           <span className="text-sm">Dashboard</span>
//         </button>

//         <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-500 bg-opacity-60 rounded-md shadow-sm">
//           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//             <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
//             <polyline points="14 2 14 8 20 8"></polyline>
//             <line x1="16" y1="13" x2="8" y2="13"></line>
//             <line x1="16" y1="17" x2="8" y2="17"></line>
//             <polyline points="10 9 9 9 8 9"></polyline>
//           </svg>
//           <span className="text-sm font-semibold">Reports</span>
//         </button>
//       </nav>

//       {/* User Profile */}
//       <div className="p-4 mt-auto">
//         <div className="flex items-center gap-3 bg-white bg-opacity-10 rounded-lg p-3">
//           <div className="w-9 h-9 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
//             <img
//               src="https://api.dicebear.com/7.x/avataaars/svg?seed=Gwynneth"
//               alt="User"
//               className="w-full h-full"
//             />
//           </div>

//           <div className="flex-1 min-w-0">
//             <p className="text-xs font-semibold truncate">Gwynneth Pandey</p>
//             <p className="text-xs text-white text-opacity-60 truncate">
//               pandeyshyonkj1874@gmail.com
//             </p>
//           </div>

//           <button className="text-white text-opacity-60 hover:text-opacity-100 flex-shrink-0">
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//               <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
//               <line x1="9" y1="9" x2="15" y2="15"></line>
//               <line x1="15" y1="9" x2="9" y2="15"></line>
//             </svg>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

