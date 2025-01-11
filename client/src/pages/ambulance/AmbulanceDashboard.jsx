import Sidebar from "@/components/global/Sidebar"
import PatientRequest from "@/components/ambulance/UserRequest"

const AmbulanceDashboard = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="p-6 w-full">
          <PatientRequest />
        </div>
      </div>
    </>
  )
}

export default AmbulanceDashboard
