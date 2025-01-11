import React, { useEffect, useState } from 'react'
import MapLocation from '../MapLocation'
import { useLocationStore } from '@/store/useLocationStore'
import { useSocket } from '@/store/useSocket';
import { Loader2 } from 'lucide-react';
import { useUserStore } from '@/store/useUserStore';

const customIcon = new L.Icon({
    iconUrl: 'https://img.freepik.com/premium-vector/free-vector-user-icon-simple-line_901408-588.jpg',
    shadowUrl: 'https://img.freepik.com/premium-photo/abstract-background-design-hd-light-alphabet-red-color_851755-118955.jpg?semt=ais_hybrid',
    iconSize: [24, 24],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [24, 24],
})

const userIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [24, 34],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [24, 24]
})


const MapAmbulance = ({ userData }) => {
    const [locations, setLocations] = useState([])
    const [userLocation, setUserLocation] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [locationError, setLocationError] = useState(null)
    const { socket, selectedAmbulance, userDetail } = useSocket();
    const { user } = useUserStore();

    console.log("User Data: ", userData)

    useEffect(() => {
        setIsLoading(true)
        const sendLocation = () => {
            console.log("User Location1: ", user, socket)
            if ("geolocation" in navigator && user && socket) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const userPos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        setUserLocation(userPos);
                        socket.emit('ambulanceLocation', { user, location: userPos });
                    },
                    (error) => {
                        setLocationError("Unable to retrieve your location")
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 5000,
                        maximumAge: 0
                    }
                )
            }
        }

        sendLocation();
        setIsLoading(false)
        setInterval(sendLocation, 2000);
    }, [socket, user])

    useEffect(() => {
        if (userDetail) {
            const data = [
                userDetail.location
            ]
            setLocations(data)
        }
    }, [userDetail])

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen" >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </div >
        )
    }


    return (

        <MapLocation
            myLocation={userLocation}
            setMyLocation={setUserLocation}
            locationError={locationError}
            myIcon={userIcon}
            otherIcon={customIcon}
            otherLocations={locations}
            bookedLocation={locations[0]}
            isRoutingEnable={true}
        />
    )
}

export default MapAmbulance