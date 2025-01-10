import { Link } from "react-router-dom";
import { Ambulance, FireExtinguisher, Shield, User } from "lucide-react"

function RoleCard({
  icon,
  title,
  description,
  buttonColor,
  iconBgColor,
  onClick,
}) {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg">
      <div className={`p-4 rounded-full mb-4 ${iconBgColor}`}>{icon}</div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-center mb-6">{description}</p>
      
      <Link to="/signup">
        <button
          onClick={onClick}
          className={`w-full py-2 px-4 rounded-lg text-white font-medium transition-colors duration-200 ${buttonColor}`}
        >
          Register as {title}
        </button>
      </Link>
    </div>
  )
}

export function Chooserole() {
  const roles = [
    {
      icon: <User className="w-8 h-8 text-blue-500 animate-pulse" />,
      title: "User",
      description: "Request help in emergencies and access emergency services",
      buttonColor: "bg-blue-500 hover:bg-blue-600",
      iconBgColor: "bg-blue-50",
    },
    {
      icon: <Ambulance className="w-8 h-8 text-emerald-500 animate-pulse" />,
      title: "Ambulance",
      description: "Provide medical emergency response and transportation",
      buttonColor: "bg-emerald-500 hover:bg-emerald-600",
      iconBgColor: "bg-emerald-50",
      vehicleNo: "Vehicle Number",
    },
    {
      icon: <FireExtinguisher className="w-8 h-8 text-red-500 animate-pulse" />,
      title: "FireBrigade",
      description: "Respond to fire emergencies and rescue operations",
      buttonColor: "bg-red-500 hover:bg-red-600",
      iconBgColor: "bg-red-50",
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-500 animate-pulse" />,
      title: "Police",
      description: "Maintain law and order, respond to emergencies",
      buttonColor: "bg-purple-500 hover:bg-purple-600",
      iconBgColor: "bg-purple-50",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose your role to get started
          </h1>
          <p className="text-xl text-gray-600">
            Select the appropriate role that best describes your emergency
            service position
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map(role => (
            <RoleCard
              key={role.title}
              {...role}
              onClick={() => localStorage.setItem("role", role.title)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
