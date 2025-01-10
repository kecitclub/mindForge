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
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [24, 34],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [24, 24]
})


export default function MapPolice() {
    const [locations, setLocations] = useState([])
    const [userLocation, setUserLocation] = useState(null)
    const [locationError, setLocationError] = useState(null)
    const { user } = useUserStore();
    const { ambulanceLocation, selectedAmbulance, setRandomAmbulance } = useSocket();



    useEffect(() => {
        console.log("dsalkjqwsj: ",user.policeStationLocation)
        setUserLocation(user.policeStationLocation);
    }, [user])


    return (
        <MapLocation
            myLocation={user.policeStationLocation}
            setMyLocation={setUserLocation}
            locationError={locationError}
            myIcon={userIcon}
            otherIcon={customIcon}
            otherLocations={locations}
            bookedLocation={selectedAmbulance}
            isRoutingEnable={true}
        />
    )
}

