import React, { useState, useEffect } from 'react'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useSocket } from '@/store/useSocket'
import MapLocation from '../MapLocation'
import { useUserStore } from '@/store/useUserStore'

// Custom icon definitions
const customIcon = new L.Icon({
    iconUrl: 'https://cdn.discordapp.com/attachments/1326815889643016196/1326925082114920520/ambulance.png?ex=678132c8&is=677fe148&hm=7bebce3c15cf812fed64cde46b07255eb0f6dddf39797082603370d8024da838&',
    shadowUrl: 'https://img.freepik.com/premium-photo/abstract-background-design-hd-light-alphabet-red-color_851755-118955.jpg?semt=ais_hybrid',
    iconSize: [24, 24],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [24, 24],
})

const userIcon = new L.Icon({
    iconUrl: 'https://media.discordapp.net/attachments/1326815889643016196/1327258729212678215/police.png?ex=67826984&is=67811804&hm=92f168fadb8c6c437efc9efa200276a0492d48b94aba73de3ff82f07632cbf1f&=&format=webp&quality=lossless&width=443&height=443',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [24, 34],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [24, 24]
})


export default function MapFire() {
    const [locations, setLocations] = useState([])
    const [userLocation, setUserLocation] = useState(null)
    const [locationError, setLocationError] = useState(null)
    const { user, } = useUserStore();
    const { ambulanceLocation, selectedAmbulance, setRandomAmbulance, socket , userDetail,fireDecision} = useSocket();

    useEffect(() => {
        const sendLocation = () => {

            if (user && socket) {
                setUserLocation(user.liveLocation);
                socket.emit('fireLocation', { user, location: user.liveLocation });
            }
        }

        sendLocation();
        setInterval(sendLocation, 2000);
    }, [user, socket])


    useEffect(() => {
        if (userDetail) {
            const data = [
                userDetail.location
            ]
            setLocations(data)
        }
    }, [userDetail])

    return (
        <MapLocation
            myLocation={user.liveLocation}
            setMyLocation={setUserLocation}
            locationError={locationError}
            myIcon={userIcon}
            otherIcon={customIcon}
            otherLocations={locations}
            bookedLocation={locations[0]}
            isRoutingEnable={fireDecision=== "Accepted" ? true : false}
        />
    )
}

