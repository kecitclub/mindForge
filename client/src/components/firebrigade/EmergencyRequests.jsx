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
import { useSocket } from "@/store/useSocket";
import { useUserStore } from "@/store/useUserStore";
import { useEffect, useState } from "react";

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

export default function EmergencyRequests() {
  const { user } = useUserStore();
  const [decision, setDecision] = useState("");
  const { socket, setUserDetail, userDetail, setFireDecision } = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("bookFire", (data) => {
        console.log("book call from patient: ", data);
        setUserDetail(data);
      });
    }
  }, [socket]);

  const handleFireRequest = (decision) => {
    if (socket) {
      setDecision(decision);
      setFireDecision(decision);
      socket.emit("firedecision", decision);
    }
  };
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
                  <TableHead>User Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Number</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userDetail && (
                  <TableRow>
                    <TableCell className="font-medium">
                      {userDetail.user.fullName}
                    </TableCell>

                    <TableCell>{userDetail.user.email}</TableCell>
                    <TableCell>{userDetail.user.phoneNumber}</TableCell>
                    <TableCell>
                      <div className="space-x-2">
                        <>
                          {decision ? (
                            <Button variant="default" disable>
                              {decision}
                            </Button>
                          ) : (
                            <>
                              <Button
                                variant="default"
                                onClick={() => handleFireRequest("Accepted")}
                              >
                                Accept
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => handleFireRequest("Declined")}
                              >
                                Decline
                              </Button>
                            </>
                          )}
                        </>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
}
