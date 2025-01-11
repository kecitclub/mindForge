import React, { useEffect, useState } from "react";
import MapLocation from "../MapLocation";
import { useLocationStore } from "@/store/useLocationStore";
import { useSocket } from "@/store/useSocket";
import { Loader2 } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";

const customIcon = new L.Icon({
  iconUrl:
    "https://cdn.discordapp.com/attachments/1326815889643016196/1326925082114920520/ambulance.png?ex=67828448&is=678132c8&hm=89394a55de349b89811de315efce6c9f5aa52010d55e12685c0ee17c7bf6d1a7&",
  shadowUrl:
    "https://img.freepik.com/premium-photo/abstract-background-design-hd-light-alphabet-red-color_851755-118955.jpg?semt=ais_hybrid",
  iconSize: [24, 24],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [24, 24],
});

const userIcon = new L.Icon({
  iconUrl:
    "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [24, 34],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [24, 24],
});

const getAmbulanceLocations = (center, count, radius = 1000) => {
  const randomLocations = [];
  const earthRadius = 6371e3; // Earth's radius in meters (6,371 km)

  for (let i = 0; i < count; i++) {
    const randomDistance = Math.random() * radius; // Random distance up to 10 km
    const randomBearing = Math.random() * 2 * Math.PI; // Random bearing (angle) in radians

    // Convert distance to latitude and longitude offsets
    const latOffset = randomDistance / earthRadius; // Angular distance in radians
    const lngOffset =
      randomDistance / (earthRadius * Math.cos((Math.PI * center.lat) / 180)); // Adjust for longitude scaling

    // New coordinates based on the random distance and bearing
    const newLat =
      center.lat + latOffset * (180 / Math.PI) * Math.cos(randomBearing);
    const newLng =
      center.lng + lngOffset * (180 / Math.PI) * Math.sin(randomBearing);

    randomLocations.push({ lat: newLat, lng: newLng });
  }

  return randomLocations;
};

const MapUser = ({ ambulanceLocation }) => {
  const [locations, setLocations] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const { setUserLocationUser, userLocationUser } = useLocationStore();
  const { socket, ambulanceList, selectedAmbulance } = useSocket();

  useEffect(() => {
    setIsLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          console.log("User Position: ", userPos);
          setUserLocation(userPos);
          setUserLocationUser(userPos);
          setIsLoading(false);
        },
        (error) => {
          setLocationError("Unable to retrieve your location");
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser");
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
      console.log("User Location2: ", userLocation);
      // const locations = getAmbulanceLocations(userLocation, 10);
      // setLocations(locations);
    }
  }, [userLocation]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      </div>
    );
  }

  return (
    <MapLocation
      myLocation={userLocation}
      setMyLocation={setUserLocation}
      locationError={locationError}
      myIcon={userIcon}
      otherIcon={customIcon}
      otherLocations={ambulanceLocation}
      bookedLocation={selectedAmbulance}
      isRoutingEnable={false}
    />
  );
};

export default MapUser;
