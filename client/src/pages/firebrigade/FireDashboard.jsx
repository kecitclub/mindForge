import EmergencyRequests from "@/components/firebrigade/EmergencyRequests";
import LiveLocation from "@/components/firebrigade/LiveLocation";
import Sidebar from "@/components/global/Sidebar";
import { Bell, LogOut } from "lucide-react";

const FireDashboard = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <div className="flex justify-between items-center px-8 pt-8 pb-6 bg-slate-200">
            <h1 className="text-2xl font-semibold">Welcome, fullName</h1>
            <div className="flex items-center gap-4">
              <Bell className="h-5 w-5 text-gray-500" />
              <LogOut className="h-5 w-5 text-gray-500" />
            </div>
          </div>
          <EmergencyRequests />
          <LiveLocation />
        </div>
      </div>
    </>
  );
};

export default FireDashboard;
