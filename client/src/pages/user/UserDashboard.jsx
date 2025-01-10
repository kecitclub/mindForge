import Sidebar from "@/components/global/Sidebar";
import Call from "@/components/user/Call";
import Sos from "@/components/user/Sos";
import LocationSection from "@/components/user/LocationSection";

const UserDashboard = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="p-6 w-Sos">
          <Call />
          <Sos />
          <LocationSection />
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
