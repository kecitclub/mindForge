import EmergencyRequests from "@/components/firebrigade/EmergencyRequests"
import LiveLocation from "@/components/firebrigade/LiveLocation"
import Sidebar from "@/components/global/Sidebar"
import { useUserStore } from "@/store/useUserStore"
import axios from "axios"
import { Bell, LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

const FireDashboard = () => {
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
        <div className="w-full">
          <div className="flex justify-between items-center px-8 pt-8 pb-6 bg-slate-200">
            <h1 className="text-2xl font-semibold">Welcome, {user.fullName}</h1>
            <div className="flex items-center gap-4">
              <Bell className="h-5 w-5 text-gray-500 cursor-pointer" />
              <LogOut
                onClick={handleLogout}
                className="h-5 w-5 text-gray-500 cursor-pointer"
              />
            </div>
          </div>
          <EmergencyRequests />
          <LiveLocation />
        </div>
      </div>
    </>
  )
}

export default FireDashboard
