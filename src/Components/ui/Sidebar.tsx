"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const navigationItems = [
  {
    id: "dashboard",
    label: "DashBoard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    id: "reports",
    label: "Reports",
    icon: FileText,
    href: "/report",
  },
];

function SidebarContent({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate: (href: string) => void;
}) {
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

          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.href)}
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
          onClick={() => onNavigate("/logout")}
          className="p-0 hover:opacity-80 transition"
        >
          <LogOut className="w-[25px] h-[25px] text-white" />
        </button>
      </div>
    </aside>
  );
}

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavigate = (href: string) => {
    router.push(href);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Top Bar - Only visible on mobile */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 shadow-sm">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>

        <div className="flex items-center gap-2">
          <img
            className="w-8 h-8 object-contain"
            alt="Monsoon Map"
            src="https://c.animaapp.com/mk8ctpouJJCrVa/img/image-6.png"
          />
          <span className="font-bold text-gray-700 text-base">Monsoon Map</span>
        </div>

        <div className="w-10" />
      </div>

      {/* Desktop Sidebar - Only visible on desktop */}
      <div className="hidden md:flex h-full">
        <SidebarContent pathname={pathname} onNavigate={handleNavigate} />
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer Sidebar */}
          <div className="absolute left-0 top-0 h-full w-[300px] shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-[-48px] bg-white p-2 rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>

            <SidebarContent pathname={pathname} onNavigate={handleNavigate} />
          </div>
        </div>
      )}
    </>
  );
}



