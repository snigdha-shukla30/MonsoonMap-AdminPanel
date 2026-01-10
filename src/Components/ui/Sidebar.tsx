"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { FileTextIcon, LayoutDashboardIcon, LogOutIcon } from "lucide-react";

const navigationItems = [
  {
    id: "dashboard",
    label: "DashBoard",
    icon: LayoutDashboardIcon,
    href: "/dashboard",
  },
  {
    id: "reports",
    label: "Reports",
    icon: FileTextIcon,
    href: "/report",
  },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

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

          // ✅ Active route detect
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <button
              key={item.id}
              onClick={() => router.push(item.href)}
              className={`h-[50px] w-full flex items-center justify-start gap-[12px] px-[19px] rounded-[7px] transition-colors ${
                isActive
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
        <button
          onClick={() => router.push("/logout")}
          className="p-0 hover:opacity-80 transition"
        >
          <LogOutIcon className="w-[25px] h-[25px] text-white" />
        </button>
      </div>
    </aside>
  );
}









// "use client";

// import React from "react";
// import { FileTextIcon, LayoutDashboardIcon, LogOutIcon } from "lucide-react";

// const navigationItems = [
//   {
//     id: "dashboard",
//     label: "DashBoard",
//     icon: LayoutDashboardIcon,
//     active: false,
//   },
//   {
//     id: "reports",
//     label: "Reports",
//     icon: FileTextIcon,
//     active: true,
//   },
// ];

// export default function Sidebar() {
//   return (
//     <aside className="relative w-[300px] h-full bg-[linear-gradient(180deg,rgb(174,209,255)_0%,rgb(126,145,169)_100%)] flex flex-col shrink-0">
//       {/* Logo */}
//       <div className="flex flex-col items-center pt-[42px] px-6 pb-[43px]">
//         <img
//           className="w-[90px] h-[68px]"
//           alt="Monsoon Map Logo"
//           src="https://c.animaapp.com/mk8ctpouJJCrVa/img/image-6.png"
//         />
//         <h1 className="mt-3 font-bold text-white text-[24px] leading-[22.9px] whitespace-nowrap">
//           Monsoon Map
//         </h1>
//       </div>

//       {/* Navigation */}
//       <nav className="flex flex-col gap-[12px] px-6">
//         {navigationItems.map((item) => {
//           const Icon = item.icon;

//           return (
//             <button
//               key={item.id}
//               className={`h-[50px] w-full flex items-center justify-start gap-[12px] px-[19px] rounded-[7px] transition-colors ${
//                 item.active
//                   ? "bg-[linear-gradient(270deg,rgba(32,219,240,1)_0%,rgba(32,87,161,1)_100%)] shadow-[0px_2px_5.1px_#00000026]"
//                   : "hover:bg-white/10"
//               }`}
//             >
//               <Icon className="w-[20px] h-[20px] text-white" strokeWidth={2} />
//               <span className="font-semibold text-white text-[16px] leading-[24.4px]">
//                 {item.label}
//               </span>
//             </button>
//           );
//         })}
//       </nav>

//       {/* Footer Profile */}
//       <div className="mt-auto w-full h-[75px] flex items-center gap-[5px] px-[7.5px] border-t-[1.25px] border-t-white shadow-[0px_-5px_7.88px_rgba(0,0,0,1)]">
//         {/* Avatar */}
//         <div className="w-[37.5px] h-[37.5px] rounded-full overflow-hidden bg-gray-400 shrink-0">
//           <img
//             src="https://c.animaapp.com/mk8ctpouJJCrVa/img/chat-window.png"
//             alt="Divyansh Pandey"
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* Name + Email */}
//         <div className="flex flex-col flex-1 min-w-0">
//           <span className="font-semibold text-white text-[10px] leading-[15px] truncate">
//             Divyansh Pandey
//           </span>
//           <span className="font-semibold text-white text-[10px] leading-[15px] truncate">
//             pandeydivyansh574@gmail.com
//           </span>
//         </div>

//         {/* Logout */}
//         <button className="p-0 hover:opacity-80 transition">
//           <LogOutIcon className="w-[25px] h-[25px] text-white" />
//         </button>
//       </div>
//     </aside>
//   );
// }



