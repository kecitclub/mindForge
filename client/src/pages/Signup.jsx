import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Link, useNavigate } from "react-router-dom"
import sideLogo from "../assets/sidelogo.png"
import { useState } from "react"
import axios from "axios"
import { useUserStore } from "@/store/useUserStore"
import LocationPicker from "@/components/map/SignUpLocationPicker"
import { useLocationStore } from "@/store/useLocationStore"
import { toast } from "sonner"

export function Signup() {
  const navigate = useNavigate()

  const { role } = useUserStore()
  const { policePosition } = useLocationStore()

  const [formInputs, setFormInputs] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
  })

  const changeEventHandler = e => {
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value })
  }

  const formSubmitHandler = async e => {
    e.preventDefault()

    const data = {
      ...formInputs,
      role: role === "User" ? "NormalUser" : role,
      ...policePosition,
    }

    try {
      console.log(data)
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/register`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )

      if (response.status === 201) {
        navigate("/signin")
        toast.success("Account created successfully! Proceed to sign in.")
      }
    } catch (e) {
      console.error(e)
      toast.error("An error occurred. Please try again.")
    }
  }

  return (
    <form
      onSubmit={formSubmitHandler}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white lg:flex items-center justify-center p-4 "
    >
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="space-y-3 text-center">
          <div className="flex justify-center">
            <div className="relative inline-block">
              <img src={sideLogo} className="h-10 w-10 text-red-600" />
              <Heart className="h-6 w-6 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-500">
            Join LifeLink for instant emergency assistance
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              placeholder="Enter your name"
              type="text"
              value={formInputs.fullName}
              name="fullName"
              onChange={changeEventHandler}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formInputs.email}
              name="email"
              onChange={changeEventHandler}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              value={formInputs.password}
              name="password"
              onChange={changeEventHandler}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="number"
              placeholder="Enter your phone number"
              value={formInputs.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
            />
          </div>
          {(role === "Ambulance" || role === "FireBrigade") && (
            <div className="space-y-2">
              <Label htmlFor="vehicleNumber">Vehicle Number</Label>
              <Input
                id="vehicleNumber"
                type="text"
                placeholder="Enter your vehicle number"
                value={formInputs.vehicleNumber}
                name="vehicleNumber"
                onChange={changeEventHandler}
              />
            </div>
          )}
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I accept all the terms and conditions
            </label>
          </div>

          <Button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white"
          >
            Create Account
          </Button>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
      {role === "FireBrigade" && <LocationPicker />}
      {role === "Police" && <LocationPicker />}
    </form>
  )
}
