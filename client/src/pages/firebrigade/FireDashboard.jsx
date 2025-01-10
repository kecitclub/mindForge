import EmergencyRequests from "@/components/firebrigade/EmergencyRequests";
import LiveLocation from "@/components/firebrigade/LiveLocation";
import Sidebar from "@/components/global/Sidebar";

const FireDashboard = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <EmergencyRequests />
          <LiveLocation />
        </div>
      </div>
    </>
  );
};

export default FireDashboard;
