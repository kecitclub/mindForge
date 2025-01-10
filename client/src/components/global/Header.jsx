import { Shield } from "lucide-react";
import headerLogo from "../../assets/mainlogo.png";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between px-6 py-4 ">
      <Link
        to="/"
        className="flex items-center gap-2 hover:scale-110 cursor-pointer"
      >
        <img src={headerLogo} alt="headerLogo" className="h-14 w-14" />
        <span className="text-xl font-bold">Emergenix</span>
      </Link>

      <div className="hidden md:flex items-center text-lg font-semibold gap-8">
        <Link
          href="/"
          className="text-gray-700 hover:text-red-600 group group relative inline-block"
        >
          Home
          <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-red-600 transition-all duration-1000 group-hover:w-full"></span>
        </Link>
        <a
          href="#features"
          className="text-gray-700 hover:text-red-600 group group relative inline-block"
        >
          Features{" "}
          <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-red-600 transition-all  duration-1000 group-hover:w-full"></span>
        </a>
        <a
          href="#services"
          className="text-gray-700 hover:text-red-600 group group relative inline-block"
        >
          Services{" "}
          <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-red-600 transition-all  duration-1000 group-hover:w-full"></span>
        </a>
        <a
          href="#impact"
          className="text-gray-700 hover:text-red-600 group group relative inline-block"
        >
          Impact{" "}
          <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-red-600 transition-all  duration-1000 group-hover:w-full"></span>
        </a>
        <a
          href="#response"
          className="text-gray-700 hover:text-red-600 group group relative inline-block"
        >
          Response{" "}
          <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-red-600 transition-all  duration-1000 group-hover:w-full"></span>
        </a>
      </div>

      <Button
        variant="destructive"
        className=" md:flex md:text-xl bg-red-600 hover:bg-red-800 rounded-lg"
        onClick={() => navigate("/chooserole")}
      >
        Get Started
      </Button>
    </nav>
  );
}
