import { useUserStore } from "@/store/useUserStore"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate()
  const { user } = useUserStore()

  useEffect(() => {
    if (!user) {
      navigate("/")
    }
  }, [])

  return <>{children}</>
}

export default ProtectedRoute
