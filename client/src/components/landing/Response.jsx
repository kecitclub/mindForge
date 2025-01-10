import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, Shield, Zap } from "lucide-react";

export function Response() {
  const areaResponses = [
    { area: "Urban Areas", time: "< 5 min", progress: 90 },
    { area: "Suburban Areas", time: "< 7 min", progress: 80 },
    { area: "Rural Areas", time: "< 12 min", progress: 70 },
  ];

  const features = [
    {
      icon: Clock,
      title: "Real-time Tracking",
      description:
        "Monitor emergency response vehicles in real-time through our app",
    },
    {
      icon: Shield,
      title: "Smart Dispatch",
      description: "AI-powered system to dispatch the nearest available unit",
    },
    {
      icon: Zap,
      title: "Rapid Response",
      description:
        "Strategically positioned units for quickest possible response",
    },
  ];

  return (
    <section className="bg-white py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Lightning-Fast Response Times
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Every second counts in an emergency. Our advanced system ensures the
            fastest possible response times.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="flex justify-center">
            <div className="relative w-64 h-64">
              <div className="absolute inset-0 rounded-full animate-ping border-2 border-red-500 bg-red-50/30"></div>
              <div className="absolute inset-8 rounded-full bg-gray-50 flex flex-col items-center justify-center">
                <div className="text-6xl font-bold text-red-600">4</div>
                <div className="text-2xl font-bold text-red-600 -mt-2">min</div>
                <div className="text-gray-500 mt-2">Average Response</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {areaResponses.map((item, index) => (
              <Card key={index} className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-black">{item.area}</h3>
                  <span className="text-red-600 font-bold">{item.time}</span>
                </div>
                <Progress
                  value={item.progress}
                  className="h-2 bg-gray-100"
                  indicatorClassName="bg-red-600"
                />
              </Card>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-black mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
