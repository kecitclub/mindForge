import Sidebar from "@/components/global/Sidebar";
import Call from "@/components/user/Call";
import Sos from "@/components/user/Sos";
import LocationSection from "@/components/user/LocationSection";
import { Bell, LogOut } from "lucide-react";

const UserDashboard = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="p-6 w-Sos">
          <div className="flex justify-between items-center px-8 pt-8 pb-6 bg-slate-200">
            <h1 className="text-2xl font-semibold">Welcome, fullName</h1>
            <div className="flex items-center gap-4">
              <Bell className="h-5 w-5 text-gray-500" />
              <LogOut className="h-5 w-5 text-gray-500" />
            </div>
          </div>
          <Call />
          <Sos />
          <LocationSection />
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
