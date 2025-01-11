import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Bell, LogOut } from "lucide-react";

const emergencyCards = [
  {
    title: "Active Emergencies",
    count: "8",
    subtext: "Currently responding",
    badge: "12",
    className: "bg-red-50",
    titleColor: "text-red-600",
    badgeColor: "bg-red-500",
  },
  {
    title: "Pending Requests",
    count: "3",
    subtext: "Awaiting response",
    badge: "5",
    className: "bg-yellow-50",
    titleColor: "text-yellow-600",
    badgeColor: "bg-yellow-500",
  },
  {
    title: "Available Units",
    count: "6",
    subtext: "Ready to deploy",
    badge: "15",
    className: "bg-green-50",
    titleColor: "text-green-600",
    badgeColor: "bg-green-500",
  },
];

const emergencyRequests = [
  {
    location: "123 Main St, Downtown",
    type: "Building Fire",
    severity: { label: "High", color: "bg-red-100 text-red-700" },
    time: "2 mins ago",
    status: { label: "Pending", color: "bg-yellow-100 text-yellow-700" },
    action: { label: "Respond", variant: "destructive" },
  },
  {
    location: "456 Oak Ave, Westside",
    type: "Gas Leak",
    severity: { label: "Medium", color: "bg-orange-100 text-orange-700" },
    time: "5 mins ago",
    status: { label: "Responding", color: "bg-green-100 text-green-700" },
    action: { label: "View Details", variant: "secondary" },
  },
];

export default function EmergencyRequests() {
  return (
    <div className="bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Emergency Requests
          </h1>
          <p className="text-gray-600">
            Active emergency situations requiring immediate attention
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {emergencyCards.map((card, index) => (
            <Card key={index} className={`relative p-6 ${card.className}`}>
              <div
                className={`absolute top-4 right-4 ${card.badgeColor} text-white text-sm font-medium px-2 py-1 rounded-full`}
              >
                {card.badge}
              </div>
              <h3 className={`text-lg font-semibold ${card.titleColor}`}>
                {card.title}
              </h3>
              <p className="text-5xl font-bold text-gray-900 my-2">
                {card.count}
              </p>
              <p className="text-gray-600">{card.subtext}</p>
            </Card>
          ))}
        </div>

        {/* Emergency Requests Table */}
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Current Emergency Requests
            </h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Location</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {emergencyRequests.map((request, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {request.location}
                    </TableCell>
                    <TableCell>{request.type}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${request.severity.color}`}
                      >
                        {request.severity.label}
                      </span>
                    </TableCell>
                    <TableCell>{request.time}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${request.status.color}`}
                      >
                        {request.status.label}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant={request.action.variant} size="sm">
                        {request.action.label}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
}
