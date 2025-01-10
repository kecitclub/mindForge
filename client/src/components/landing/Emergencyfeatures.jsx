import { Card, CardContent } from "@/components/ui/card";
import {
  Zap,
  MapPin,
  Smartphone,
  Users,
  Shield,
  ClipboardList,
} from "lucide-react";

export function Emergencyfeatures() {
  const features = [
    {
      icon: Zap,
      title: "Instant Response",
      description:
        "24/7 emergency response with guaranteed assistance within minutes of your alert.",
    },
    {
      icon: MapPin,
      title: "GPS Tracking",
      description:
        "Precise location tracking ensures help reaches you exactly where you need it.",
    },
    {
      icon: Smartphone,
      title: "Mobile App",
      description:
        "One-touch emergency activation through our user-friendly mobile application.",
    },
    {
      icon: Users,
      title: "Professional Network",
      description:
        "Access to a vast network of verified emergency response professionals.",
    },
    {
      icon: Shield,
      title: "Secure System",
      description:
        "Enhanced security protocols to protect your personal information and emergency data.",
    },
    {
      icon: ClipboardList,
      title: "Real-time Updates",
      description:
        "Live status updates and ETA tracking for emergency response units.",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-8" id="features">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight mb-4">
          Advanced Emergency Features
        </h2>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
          Our comprehensive emergency response system comes equipped with
          cutting-edge features designed to provide immediate assistance when
          you need it most.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="border-2 shadow-sm cursor-pointer hover:animate-pulse"
          >
            <CardContent className="pt-6">
              <div className="mb-4 inline-flex items-center justify-center rounded-full bg-[#FFE5E5] p-4">
                <feature.icon className="h-6 w-6 text-[#FF4545]" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
