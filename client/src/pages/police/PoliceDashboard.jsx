import Sidebar from "@/components/global/Sidebar";
import EmergencyCalls from "@/components/police/EmergencyCalls";

const PoliceDashboard = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div>
        <EmergencyCalls />
        </div>
        
      </div>
    </>
  );
};

export default PoliceDashboard;
