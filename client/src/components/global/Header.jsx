import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
      <div className="flex items-center gap-2">
        <Shield className="h-8 w-8 text-red-600" />
        <span className="text-xl font-bold">EmergencyOS</span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        <a href="#" className="text-gray-700 hover:text-gray-900">
          Home
        </a>
        <a href="#" className="text-gray-700 hover:text-gray-900">
          Features
        </a>
        <a href="#" className="text-gray-700 hover:text-gray-900">
          About Us
        </a>
        <a href="#" className="text-gray-700 hover:text-gray-900">
          Contact
        </a>
        <a href="#" className="text-gray-700 hover:text-gray-900">
          FAQ
        </a>
      </div>

      <Button variant="destructive" className="hidden md:block">
        Get Started
      </Button>
    </nav>
  );
}
