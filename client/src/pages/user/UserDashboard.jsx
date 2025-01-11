import Sidebar from "@/components/global/Sidebar"
import Call from "@/components/user/Call"
import Sos from "@/components/user/Sos"
import LocationSection from "@/components/user/LocationSection"
import { Bell, LogOut } from "lucide-react"
import { useUserStore } from "@/store/useUserStore"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "sonner"

const UserDashboard = () => {
  const { user, setUser } = useUserStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/logout`,
        {
          withCredentials: true,
        }
      )

      if (response.status === 200) {
        setUser(null)
        navigate("/")
        toast.success("Logged out successfully")
      }
    } catch (e) {
      console.error(e)
      toast.error("An error occurred. Please try again.")
    }
  }
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="p-6 w-Sos">
          <div className="flex justify-between items-center px-8 pt-8 pb-6 bg-slate-200">
            <h1 className="text-2xl font-semibold">
              Welcome, {user?.fullName}
            </h1>
            <div className="flex items-center gap-4">
              <Bell className="h-5 w-5 text-gray-500" />
              <LogOut
                onClick={handleLogout}
                className="h-5 w-5 text-gray-500"
              />
            </div>
          </div>
          <Call />
          <Sos />
          <LocationSection />
        </div>
      </div>
    </>
  )
}

export default UserDashboard
