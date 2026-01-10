import React from "react";
import Sidebar from "../../Components/ui/Sidebar";
import Dashboard from "../../Components/dashboard/dashboard";


export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-[linear-gradient(180deg,rgb(174,209,255)_0%,rgb(126,145,169)_100%)]">
      <Sidebar />
      <Dashboard />
    </div>
  );
}
