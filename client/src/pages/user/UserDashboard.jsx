import Sidebar from "@/components/global/Sidebar";
import EmergencyCalls from "@/components/police/EmergencyCalls";

const UserDashboard = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="p-6 w-full">
          <EmergencyCalls />
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
