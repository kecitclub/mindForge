import { Ambulance, Flame, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const services = [
  {
    title: "Ambulance",
    description:
      "Request immediate medical assistance with real-time location tracking",
    icon: Ambulance,
    buttonText: "Book Ambulance",
    buttonColor: "bg-red-500 hover:bg-red-600",
    iconColor: "text-red-500",
  },
  {
    title: "Fire Brigade",
    description: "Emergency fire response with immediate dispatch service",
    icon: Flame,
    buttonText: "Call Fire Brigade",
    buttonColor: "bg-orange-500 hover:bg-orange-600",
    iconColor: "text-orange-500",
  },
  {
    title: "Police",
    description: "Immediate police assistance with location tracking",
    icon: Shield,
    buttonText: "Call Police",
    buttonColor: "bg-blue-500 hover:bg-blue-600",
    iconColor: "text-blue-500",
  },
];

export default function Call() {
  return (
    <section className=" bg-gray-50 p-6">
      <div className="  space-y-8">
        <div className=" w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="p-6 shadow-md">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <service.icon className={`w-6 h-6 ${service.iconColor}`} />
                  <h2 className="text-xl font-bold text-gray-900">
                    {service.title}
                  </h2>
                </div>
                <span className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                  Available
                </span>
              </div>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <Button
                className={`w-full text-white ${service.buttonColor}`}
                onClick={() => console.log(`${service.title} service called`)}
              >
                {service.buttonText}
              </Button>
            </Card>
          ))}
        </div>

        {/* <div className="flex flex-col items-center space-y-4">
          <Button
            className="px-8 py-6 text-xl font-bold text-white bg-red-600 hover:bg-red-700 rounded-full shadow-lg transform transition-transform hover:scale-105"
            onClick={() => console.log("SOS Emergency called")}
          >
            SOS EMERGENCY
          </Button>
          <p className="text-gray-600 text-center text-sm">
            Click for immediate response from all emergency services
          </p>
        </div> */}
      </div>
    </section>
  );
}
