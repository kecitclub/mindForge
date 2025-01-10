import { Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocation, useNavigate } from "react-router-dom"

export function Header() {
  const navigate = useNavigate()
  const path = useLocation().pathname;


  const btnName = () => {
    switch (path) {
      case '/':
        return "Get Started"
        break;

      case '/chooserole':
        return "Login"
        break;

      case '/signin':
        return "Sign Up"
        break;

      case '/signup':
        return "Login"
        break;

      default:
        break;
    }
  }

  const redirectPath =  ()=>{
    switch (path) {
      case '/':
        return "/chooserole"
        break;

      case '/chooserole':
        return "/signin"
        break;

      case '/signin':
        return "/signup"
        break;

      case '/signup':
        return "/signin"
        break;

      default:
        break;
    }
  }

  return (
    <nav className="flex items-center justify-between px-6 py-4 ">
      <div className="flex items-center gap-2 hover:scale-110 cursor-pointer">
        <Shield className="h-8 w-8 text-red-600" />
        <span className="text-xl font-bold">Emergenix</span>
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

      <Button
        variant="destructive"
        className=" md:flex md:text-xl bg-red-600 hover:bg-red-800 rounded-lg"
        onClick={() => navigate(redirectPath())}
      >
       {
        btnName()
       }
      </Button>
    </nav>
  )
}
