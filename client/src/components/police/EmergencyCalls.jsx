import { AlertTriangle, Bell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const data = [
  {
    id: "1",
    status: "ACTIVE",
    title: "Armed Robbery",
    location: "Main Street Bank",
    address: "123 Main St, Downtown",
    timeAgo: "2 mins ago",
  },
  {
    id: "2",
    status: "PENDING",
    title: "Domestic Disturbance",
    location: "Residential Area",
    address: "456 Oak Ave, Suburbs",
    timeAgo: "5 mins ago",
  },
  {
    id: "3",
    status: "IN PROGRESS",
    title: "Traffic Accident",
    location: "Highway Junction",
    address: "Highway 101, Exit 23",
    timeAgo: "15 mins ago",
  },
];

const stats = [
  { label: "Active Calls", value: 12, color: "text-red-500" },
  { label: "Pending Responses", value: 5, color: "text-yellow-500" },
  { label: "Units Dispatched", value: 8, color: "text-blue-500" },
];

const EmergencyCalls = () => {
  const getStatusColor = () => {
    switch (data.status) {
      case "ACTIVE":
        return "bg-red-500";
      case "PENDING":
        return "bg-yellow-500";
      case "IN PROGRESS":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getCardBackground = () => {
    switch (data.status) {
      case "ACTIVE":
        return "bg-red-50";
      case "PENDING":
        return "bg-yellow-50";
      case "IN PROGRESS":
        return "bg-blue-50";
      default:
        return "bg-gray-50";
    }
  };
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex justify-between items-center px-8 pt-8 pb-6 bg-slate-200">
        <h1 className="text-2xl font-semibold">Welcome, fullName</h1>
        <div className="flex items-center gap-4">
          <Bell className="h-5 w-5 text-gray-500" />
          <LogOut className="h-5 w-5 text-gray-500" />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Emergency Calls</h1>
        <div className="flex gap-4">
          <Button className="bg-emerald-500 hover:bg-emerald-600">
            Accept All
          </Button>
          <Button className="bg-red-500 hover:bg-red-600">
            Emergency Mode
          </Button>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.map((call) => (
          <Card
            key={call.id}
            className={`relative overflow-hidden p-6 shadow-lg ${getCardBackground(
              call.status
            )}`}
          >
            <div className="mb-4 flex items-center justify-between">
              <span
                className={`rounded-full px-3 py-1 text-sm font-medium text-white ${getStatusColor(
                  call.status
                )}`}
              >
                {call.status}
              </span>
              <span className="text-sm text-gray-500">{call.timeAgo}</span>
            </div>

            <div className="mb-6 flex items-start gap-3">
              <AlertTriangle
                className={`h-5 w-5 ${
                  call.status === "ACTIVE"
                    ? "text-red-500"
                    : call.status === "PENDING"
                    ? "text-yellow-500"
                    : "text-blue-500"
                }`}
              />
              <div>
                <h3 className="font-semibold text-gray-900">{call.title}</h3>
                <p className="text-sm text-gray-600">{call.location}</p>
                <p className="text-sm text-gray-500">{call.address}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                className={
                  call.status === "IN PROGRESS"
                    ? "flex-1 bg-emerald-500 hover:bg-emerald-600"
                    : "flex-1 bg-blue-500 hover:bg-blue-600"
                }
              >
                {call.status === "IN PROGRESS" ? "View Status" : "Accept"}
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-gray-200 bg-white hover:bg-gray-50"
              >
                Details
              </Button>
            </div>
          </Card>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className="flex items-center justify-between p-6"
          >
            <h3 className="text-lg font-medium text-gray-900">{stat.label}</h3>
            <span className={`text-3xl font-bold ${stat.color}`}>
              {stat.value}
            </span>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EmergencyCalls;
