import Sidebar from "@/components/global/Sidebar";
import EmergencyCalls from "@/components/police/EmergencyCalls";
import PoliceMap from "@/components/police/PoliceMap";

const PoliceDashboard = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="p-6 w-full">
          <EmergencyCalls />
          <PoliceMap/>
        </div>
      </div>
    </>
  );
};

export default PoliceDashboard;
