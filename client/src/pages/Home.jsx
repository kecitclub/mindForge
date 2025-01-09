import { Button } from "@/components/ui/button";
import heroImg from "../assets/heroImg.png";

export function Home() {
  return (
    <div className="min-h-screen bg-white px-6 py-4 md:py-24 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Your Safety, Our Priority - Instant Emergency Assistance at Your
            Fingertips!
          </h1>
          <p className="text-lg text-gray-600">
            Get immediate help with our advanced emergency response system.
            We&apos;re here 24/7 to ensure your safety.
          </p>
          <Button variant="destructive" size="lg" className=" text-lg px-8">
            Try SOS Now
          </Button>
        </div>

        <div className="relative rounded-2xl overflow-hidden bg-gray-100">
          <img src={heroImg} alt="Emergency vehicles on a map" className=" " />
        </div>
      </div>
    </div>
  );
}
