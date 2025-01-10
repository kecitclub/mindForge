import { Card, CardContent } from "@/components/ui/card";
import {
  FireExtinguisherIcon as FirstAidKit,
  Flame,
  Shield,
} from "lucide-react";

export function Services() {
  const services = [
    {
      icon: FirstAidKit,
      title: "Medical Emergency",
      description:
        "Immediate medical assistance with trained professionals and rapid response ambulance service.",
      responseTime: "< 5 minutes",
      features: [
        "24/7 Emergency Response",
        "Trained Medical Staff",
        "Advanced Life Support",
      ],
    },
    {
      icon: Flame,
      title: "Fire Emergency",
      description:
        "Swift fire response teams equipped with modern firefighting equipment and expertise.",
      responseTime: "< 7 minutes",
      features: [
        "Rapid Fire Response",
        "Advanced Equipment",
        "Expert Fire Team",
      ],
    },
    {
      icon: Shield,
      title: "Police Emergency",
      description:
        "Immediate police response for security threats and emergency situations.",
      responseTime: "< 4 minutes",
      features: ["Immediate Response", "Trained Officers", "24/7 Surveillance"],
    },
  ];

  return (
    <section className="bg-black py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Emergency Services
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            Comprehensive emergency response services available 24/7 for your
            safety and peace of mind
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="bg-zinc-900 border-zinc-800 ">
              <CardContent className="p-6 space-y-6">
                <div className="w-16 h-16 rounded-full bg-red-100/10 flex items-center justify-center mx-auto">
                  <service.icon className="w-8 h-8 text-red-500" />
                </div>

                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{service.description}</p>
                  <p className="text-red-500 font-bold">
                    Response Time: {service.responseTime}
                  </p>
                </div>

                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-white"
                    >
                      <svg
                        className="w-5 h-5 text-red-500 mr-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
