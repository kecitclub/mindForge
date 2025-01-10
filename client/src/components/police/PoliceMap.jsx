import { Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MapPolice from "./MapPolice";

const incidents = [
  {
    status: "Critical",
    type: "Armed Robbery",
    location: "Central Bank, Downtown",
    unitsAssigned: 3,
    time: "10:30 AM",
  },
  {
    status: "Ongoing",
    type: "Traffic Accident",
    location: "Highway 101, Exit 23",
    unitsAssigned: 2,
    time: "10:45 AM",
  },
];

const PoliceMap = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Active Incidents</h1>
        <div className="space-x-4">
          <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
            Filter View
          </Button>
          <Button variant="destructive">Critical Incidents</Button>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-12 flex flex-col items-center justify-center min-h-[400px]">
        <MapPolice />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>STATUS</TableHead>
            <TableHead>INCIDENT TYPE</TableHead>
            <TableHead>LOCATION</TableHead>
            <TableHead>UNITS ASSIGNED</TableHead>
            <TableHead>TIME</TableHead>
            <TableHead>ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {incidents.map((incident, index) => (
            <TableRow key={index}>
              <TableCell>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${incident.status === "Critical"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                  {incident.status}
                </span>
              </TableCell>
              <TableCell className="flex items-center gap-2">
                <span className="inline-block p-1 rounded bg-gray-100">⚠️</span>
                {incident.type}
              </TableCell>
              <TableCell>{incident.location}</TableCell>
              <TableCell>
                <div className="flex -space-x-2">
                  {Array.from({ length: incident.unitsAssigned }).map(
                    (_, i) => (
                      <Avatar key={i} className="border-2 border-white">
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt={`Unit ${i + 1}`}
                        />
                        <AvatarFallback>{`U${i + 1}`}</AvatarFallback>
                      </Avatar>
                    )
                  )}
                </div>
              </TableCell>
              <TableCell>{incident.time}</TableCell>
              <TableCell>
                <Button
                  variant="link"
                  className="text-blue-600 hover:text-blue-800 p-0"
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PoliceMap;
