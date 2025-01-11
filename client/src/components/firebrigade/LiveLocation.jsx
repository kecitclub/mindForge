import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Layers, Maximize2 } from "lucide-react";
import MapFire from "./MapFire";

// Active units data
const activeUnits = [
  {
    id: "FB-101",
    location: "Downtown District",
    status: "active",
    bgColor: "bg-green-50",
    dotColor: "bg-green-500",
  },
  {
    id: "FB-102",
    location: "En route to emergency",
    status: "en-route",
    bgColor: "bg-yellow-50",
    dotColor: "bg-yellow-500",
  },
  {
    id: "FB-103",
    location: "Responding to fire",
    status: "responding",
    bgColor: "bg-red-50",
    dotColor: "bg-red-500",
  },
];

// Emergency locations data
const emergencyLocations = [
  {
    address: "123 Main Street",
    type: "Building Fire - High Priority",
    eta: "5 mins",
    etaColor: "text-red-500",
  },
  {
    address: "456 Oak Avenue",
    type: "Gas Leak - Medium Priority",
    eta: "8 mins",
    etaColor: "text-orange-500",
  },
];

export default function LiveLocation() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Live Location Tracking
          </h1>
          <p className="text-gray-600">
            Real-time monitoring of emergency situations and response units
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <div className="p-4 border-b flex items-center justify-between">
                <h2 className="text-lg font-semibold">Live Map View</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Layers className="h-4 w-4 mr-2" />
                    Layers
                  </Button>
                  <Button variant="outline" size="sm">
                    <Maximize2 className="h-4 w-4 mr-2" />
                    Fullscreen
                  </Button>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg  flex flex-col  justify-start w-full ">
               <MapFire/>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Active Units */}
            <Card>
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Active Units</h2>
              </div>
              <div className="p-4 space-y-3">
                {activeUnits.map((unit) => (
                  <div
                    key={unit.id}
                    className={`p-3 rounded-lg ${unit.bgColor} flex items-start`}
                  >
                    <div
                      className={`${unit.dotColor} h-2 w-2 rounded-full mt-2 mr-3`}
                    />
                    <div>
                      <div className="font-medium">Unit {unit.id}</div>
                      <div className="text-sm text-gray-600">
                        {unit.location}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Emergency Locations */}
            <Card>
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Emergency Locations</h2>
              </div>
              <div className="p-4 space-y-4">
                {emergencyLocations.map((location, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium">{location.address}</div>
                        <div className="text-sm text-gray-600">
                          {location.type}
                        </div>
                        <div
                          className={`text-sm font-medium ${location.etaColor}`}
                        >
                          ETA: {location.eta}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                    </div>
                    {index < emergencyLocations.length - 1 && (
                      <div className="border-b" />
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Filters */}
            <Card>
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Quick Filters</h2>
              </div>
              <div className="p-4 space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Show All Units
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Active Emergencies
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Available Units
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
