import { Ambulance, FireExtinguisher, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import MapUser from "./MapUser";
import { useEffect, useState } from "react";
import { useSocket } from "@/store/useSocket";
import { useUserStore } from "@/store/useUserStore";
import { toast } from 'sonner'
import { useLocationStore } from "@/store/useLocationStore";

export default function LocationSection() {
  const [ambulanceLocation, setAmbulanceLocation] = useState([]);
  const [ambulanceList, setAmbulanceList] = useState([]);
  const [fireBrigadeLocation, setFireBrigadeLocation] = useState([]);
  const [fireBrigadeList, setFireBrigadeList] = useState([]);
  const { socket, } = useSocket();
  const { user } = useUserStore();
  const { userLocationUser } = useLocationStore();
  const [isBookedClicked, setIsBookedClicked] = useState("Book Now");
  const [isFireBrigadeBookedClicked, setIsFireBrigadeBookedClicked] = useState("Book Now");

  useEffect(() => {
    if (socket) {
      socket.on('ambulanceLocation', (data) => {
        console.log("Ambulance Data: ", data);

        setAmbulanceList((prevList) => {
          if (!prevList.some((ambulance) => ambulance.vehicleNumber === data.user.vehicleNumber)) {
            // If the ambulance doesn't exist, add to both the ambulanceList and ambulanceLocation
            setAmbulanceLocation((prevLocations) => [
              ...prevLocations,
              data?.location,
            ]);
            return [...prevList, data.user];
          }
          return prevList; // Return the same list if the ambulance already exists
        });

        console.log("Ambulance Location: ", data);
      });

      socket.on('fireLocation', (data) => {
        console.log("Fire Data: ", data);

        setFireBrigadeList((prevList) => {
          if (!prevList.some((ambulance) => ambulance.vehicleNumber === data.user.vehicleNumber)) {
            // If the ambulance doesn't exist, add to both the ambulanceList and ambulanceLocation
            setFireBrigadeLocation((prevLocations) => [
              ...prevLocations,
              data?.location,
            ]);
            return [...prevList, data.user];
          }
          return prevList; // Return the same list if the fireBridage already exists
        });

        console.log("Fire Location: ", data);
      });

      socket.on("decision", (data) => {
        setIsBookedClicked(data);

      })
      socket.on("firedecision", (data) => {
        setIsFireBrigadeBookedClicked(data);

      })
    }
  }, [socket])

  const bookNow = (vehicleNumber) => {
    if (socket) {
      console.log("book data send: ", user, userLocationUser)
      localStorage.setItem("ambulanceNo", vehicleNumber)
      console.log("User Location: ", userLocationUser)
      socket.emit('bookAmbulance', { user, location: userLocationUser });
      toast('Booking request sent')
      setIsBookedClicked("Pending Request");
    }
  }


  const bookFireNow = (vehicleNumber) => {
    if (socket) {
      console.log("book data send: ", user, userLocationUser)
      localStorage.setItem("fireNo", vehicleNumber)
      console.log("User Location: ", userLocationUser)
      socket.emit('bookFire', { user, location: userLocationUser });
      toast('Booking request sent')
      setIsFireBrigadeBookedClicked("Pending Request");
    }
  }

  return (
    <div className=" p-4 " id="book">
      <div className="flex flex-col gap-6 ">
        {
          ambulanceList.length === 0 &&
          <div className="bg-white p-4 rounded-lg border flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Ambulance className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <div className="font-medium">Ambulance Not Available</div>
              </div>
            </div>
          </div>
        }

        {
          fireBrigadeList.length === 0 &&
          <div className="bg-red-400 p-4 rounded-lg border flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                <FireExtinguisher className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <div className="font-medium">FireBrigade Not Available</div>
              </div>
            </div>
          </div>
        }

        {
          ambulanceList.length > 0 &&
          ambulanceList.map((ambulance, index) => (
            <div className="bg-white p-4 rounded-lg border flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Ambulance className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <div className="font-medium">Ambulance No: {ambulance.vehicleNumber}</div>
                  <div className="text-sm text-gray-500">{
                    ambulance.fullName
                  }</div>
                </div>
              </div>
              <Button onClick={() =>
                bookNow(ambulance.vehicleNumber)
              }>{
                  isBookedClicked
                }</Button>
            </div>
          ))
        }

        {
          fireBrigadeList.length > 0 &&
          fireBrigadeList.map((items, index) => (
            <div className="bg-red-400 p-4 rounded-lg border flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <FireExtinguisher className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <div className="font-medium">Fire Brigade No: {items.vehicleNumber}</div>
                  <div className="text-sm text-white">{
                    items.fullName
                  }</div>
                </div>
              </div>
              <Button onClick={() =>
                bookFireNow(items.vehicleNumber)
              }>{
                  isFireBrigadeBookedClicked
                }</Button>
            </div>
          ))
        }
        <div className="rounded-lg border bg-background shadow-sm">
          <div className="flex items-center justify-between border-b p-4">
            <h1 className="text-xl font-semibold">Live Location Tracking</h1>
            <Button variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Map
            </Button>
          </div>
          <div className="flex items-center justify-center bg-muted/10">
            <div className="bg-gray-50 rounded-lg  flex flex-col  justify-start w-full ">
              <MapUser ambulanceLocation={ambulanceLocation} fireBrigadeLocation={fireBrigadeLocation} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

