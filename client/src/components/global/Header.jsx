import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 ">
      <div className="flex items-center gap-2 hover:scale-110 cursor-pointer">
        <Shield className="h-8 w-8 text-red-600" />
        <span className="text-xl font-bold">Emergenix</span>
      </div>

      <Button
        variant="destructive"
        className=" md:flex md:text-xl bg-red-600 hover:bg-red-800 rounded-lg"
      >
        Get Started
      </Button>
    </nav>
  );
}
