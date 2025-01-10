import axios from "axios"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate()

  useEffect(() => {
    const res = axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/profile`,
      {
        withCredentials: true,
      }
    )

    if (res.status !== 200) {
      navigate("/")
    }
  }, [])

  return <>{children}</>
}

export default ProtectedRoute
