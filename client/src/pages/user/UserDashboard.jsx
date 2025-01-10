import Sidebar from "@/components/global/Sidebar";
import Call from "@/components/user/Call";
import Sos from "@/components/user/Sos";

const UserDashboard = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="p-6 w-Sos">
          <Call />
          <Sos />
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
