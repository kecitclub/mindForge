import { useSocket } from "@/store/useSocket"
import { useUserStore } from "@/store/useUserStore"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate()
  const { user } = useUserStore()
  const { setSocket } = useSocket();

  useEffect(() => {
    if (!user) {
      navigate("/")
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const socket = io('http://localhost:4000');
      setSocket(socket);
      return () => {
        socket.disconnect();
      };
    }
  }, [setSocket]);

  return <>{children}</>
}

export default ProtectedRoute
