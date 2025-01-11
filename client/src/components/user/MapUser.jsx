import React, { useEffect, useState } from 'react'
import MapLocation from '../MapLocation'
import { useLocationStore } from '@/store/useLocationStore'
import { useSocket } from '@/store/useSocket';
import { Loader2 } from 'lucide-react';
import { useUserStore } from '@/store/useUserStore';

const customIcon = new L.Icon({
    iconUrl: 'https://cdn.discordapp.com/attachments/1326815889643016196/1326925082114920520/ambulance.png?ex=67828448&is=678132c8&hm=89394a55de349b89811de315efce6c9f5aa52010d55e12685c0ee17c7bf6d1a7&',
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

const otherIcon = new L.Icon({
    iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAwFBMVEX/////SwD8///8SgD5///9//3/RwD//f/8RgD7TAD8QgD8PwD9//v9/fr6RwD/+PX7NwD8z8P34db98ev3Swn96uL/MwD7dFf+o5L9f1/5cFH9mYP7xLL64M/6z738XTj7Uiz939X0++/9RxL91M76YT78jHb7vbD6lnb8UBn7aEj4im79UiX6oIH8rJjzeU/1sJv5aDv469j5gWX+d2L3vp/3WSj5spX2dEb+HAD+gGz8qI74bUP72Mj69uf8s6Zpee04AAAJrUlEQVR4nO1cW2OiuhaGlQRIAgEErbfROrZ1tG6nPe2xZ0/H9v//q5OoVeQme0I3fXC9WQU+Vla+dU0N4yIXuchFLnKREwFwm4aQFds1vKYxZIS4w29NY0iIR2wb/NH4+itpynYBT3q804WmkRwFXPg+mArKbr4QKAO+XQXIFLfRl9l+2IMwFqZpOlf+V7EpSU4zLpAEZd25X2b58IwJpDTFB18EE8i1Y5a5FT4w7KbxbMXGE4bQAdSXEIDvfUEPoEjTeLbiwY/A/BCr5zeNZyebOTqC6kdfwtL9Pj+CQvNJ03hUVIBHHB1BUT5qGpLaebBg1DwuH79vGpK0cmMzpQlNmXTevJtx3XvmmEdVIRGExG6YFrA/t8yEIMrvCDSsLBx2zBNBaNkiDWsKBvwEU2wi/lfTTOUvHDMlFm+aPydLlAZliqbD9NChaUxINM3qK5bVFHV+yhCrQVDdPFBWMDJwg6DueRYUojKnaRCT0c/RlPwL+wEGNEbsj1YWlNqAPAS3MQpd54OiznUEjSVbSycXFEK850JTec08y1N74Q+4qQQ+ztfU1qxGTS2fk3F9hxUU6/a/AADc1Hq4hh2gouWTvPAYfb5ZRRE+3eUeeJ0SUCa/+/wF9B/Dk4eAh6O/i0xKCeWfHy+4g2AGdmIJCdx0ykCZgo0MchIbeyrNrxMUPPDOKmlWBA87ZZgQQtMWPjEru27VQTgV/D3h/l1YBaWgYkf89hKvYZP0XtGX1hLRzsz4eFmZtDyxMlAmpWYgXfPhCgKT0KhZV20Z+6L5zUcGBZ63sEpBKW2x4dEOPTe6bdcPCpls7R9U1VqeBUWdoH3IAz0X+oua04r2Ur168HoAFZav3hYUcnoHswICvU63VkxGa1uIEtMN7JgaBudBSeGrxD3uWBC6pEZlhVvvS/k93lkJZJO+PHF4wo5eA2cR4RpBzbYYYtF520Ul/+nEVUBR9nQk0Fkg+KBO/uyqSrmkxGCFPVWoXgUlju8oyFTB8QEUQvNJfaDs533qYvV9iYn4/cJg6hSUxW4P4cIwkOt/V19ZJpqLPYipTIE9PGKimqaQ2QmNvarCAImYb2oDdcM/TIj/F4ii8/ysIUes3nfjA5RcTvZcD6+7Bh4EB1AD+XlT6oxToKYfupkpUOb0xq1jBYmNx4ckgfXk8l1V4oOdoEMj6T1QFVJpVXWoihitqfmxWmgM8BBUXTspMdrVZ8Ho8u2r8XYdmvLg/Ujf8dpoMfQPQFEUbBQ5YbjfXVdTTOr1j85XrKPfhx5RFUFq/TzlnZ53tWRxW4em4C1R3BSPPU6r8cEelLCuXBUZf5eeCanCDAvrAPWQDDKtsyFLWqzrCbgebl/vrkTsztXfgHBVKSIoQRViGaGHYveJCkEMVzcrnCyFHii+kpYO3b0RCNQJNU1dho4zVgkUpUWbkj/JsBjfHtZd7j9droIeq2RGMRIFnGqtpaLaiR7qwtOqqsm7eVxUYgCHj3/mo7ccAvCa2MJL3QCG3HQqMYBgXejx/O+CCPxFwgbYTJc/uwVPOoUUsxcM43xNoaCFZ8kAjOmROrHd8wmeFGf5TRrzuuCnwQ1xRMIIlFfXEWhdVwBlLUNVqC7IBVEwXAVxYvlErEeeMDzPnDHl32QkbntFoMT/pimUWmkpQAWTQmKGVczrFdiUiVIRPQr0pvfgTCFDSbACD9vSk/wu+C0Sp/RLO0MdTMRbl0eZiJpOf8eFNjyJIlJPa+pFa/tFOW2hk/sjKqlwZ7e4G9BqSU7wlw4mmJRXEeXK8Fe86w8RlURVA8XutEANz4CyxPhtH4iAKq1Vy1GT2fwfyOu5JIE9HH/s91i1mNTqaYEa8PLHOOMo4fHLq7MJUH2tWau7nFbjQdCWDhKgPFQtHnS0QHm94haMahkj66SQiVdVvLeJ9DQlQZXc3KLsl0cSpWgcVXLfmqD8ful6UP6QHI13Ddj8bZ7fgNqgysorSCwzwxGDChsQOb90dp8EVfYM5zbzxv7ivLOU5KkTpJ/RVM7EmxvNz5f99QZV/X5hp1gKDR6yl8BIOHG5XdFjQf5PRO6+ElCok52Ld9WI8xlbR3qhi/dUSp48226xVeHvXGjR0RseKtxM6rHOMjvYQqRzdp/KOZR29CZ6u7kvjcQ2cJKbL882sAwXRFkQ42gOX77nhy50a2pFHOjCiJUV1tiTXjI6yvX7VPxUbS2WH4GANKxemS0yzXZWOxcUmrdVEaUAlJKorCXBQtCqcPhBnkfm91hlOcUBJNglvTfrENX/oXjjXFDD7ehpWVQ7meZctwd1Zbxpacr9lXljy7Su2+DNBS1ePpl09VhBCYmqVpgOKDBeM5SDVOQBxjun1qKYb2DWyc+3kNlp6/ZHRxlNIZPdSUONfrOSqUAP2jw/taHOmBC9GQVoX2dvLZ28VP9EiHlUvAz+wskLEFHMV/JqLZsixnM6eEGIK54BmPGgZE7KK8g50FJ3uIp48N5JVwJ2TXRpF8OgrHmwyicF/Skm13D9tKPZgwLPg5uyObeCUjef1DH0kikGoeDFqHDuKuQZikMoZne1TAGEVKTuzF8rXZcTv1A6b9Vy5MBNDUZQh1U6NbfJm3hWRaA6pvXwTXpUyvrlVZjEzQGF9PL1hBC7l+qFWld+hUmMMBsfUhbWNBjukcn09PbWul0JVGb3Ba+1DasTY8Djk2SObSoERMPU8lGTPfs1TtD7V6cPkH7+PKj0eQPhKFdZ42mfljjV1KLCvk6HecLZQJ0zjCTdeBDnDw34V+JknMmZhtiu8wQSGPDKkxV6fibFJa4to/TEBTEKZjX/QwWV9ib7IY54Psc3Ml6miTTLYSNcD20eRKa94P44JjaITs8k3gCDZEfV4jMwsF37/CmBF37ImxD7CWVtfNd4myfIgF9P8GccspMY8PCDDiXB83bZBpS/Pe4MxB9b2PiMwxi2LTUzedy7QapGAMsWw/99sHKL3wO42uMR+ai2z+pxR9ovVdnDCLz8IWWihlO3nQr5S8SXw88+noU3twGK93UgsHNfX7KRP9626KVC+aD96YezCEQv822cG7N7z8h1gWDjLtuSlOCLEZDPP0Qj84W37jJADrWClfyQQUVkzrfh8nvT6fTfPQn73zivIom0/bAWMtdk73JLpfSghsraY4cKhy2G3/G/dSzLdsEGN/wx5gF/V032U8i2ES0CzteDDQEosLpPECKZGYD4N4Px8t1LmzFEV/z6PvQldLk59QpRfyJgtIffUr4D4GXWavI0sqREjFPHMYkkhHqPovxDISpmS59vIlja0df4zxcXuchFLnKRxuX/i3ySWnsP2d4AAAAASUVORK5CYII=',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [24, 34],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [24, 24]
})

const getAmbulanceLocations = (center, count, radius = 1000) => {
    const randomLocations = [];
    const earthRadius = 6371e3; // Earth's radius in meters (6,371 km)

    for (let i = 0; i < count; i++) {
        const randomDistance = Math.random() * radius; // Random distance up to 10 km
        const randomBearing = Math.random() * 2 * Math.PI; // Random bearing (angle) in radians

        // Convert distance to latitude and longitude offsets
        const latOffset = randomDistance / earthRadius; // Angular distance in radians
        const lngOffset = randomDistance / (earthRadius * Math.cos(Math.PI * center.lat / 180)); // Adjust for longitude scaling

        // New coordinates based on the random distance and bearing
        const newLat = center.lat + latOffset * (180 / Math.PI) * Math.cos(randomBearing);
        const newLng = center.lng + lngOffset * (180 / Math.PI) * Math.sin(randomBearing);

        randomLocations.push({ lat: newLat, lng: newLng });
    }

    return randomLocations;
};


const MapUser = ({ ambulanceLocation, fireBrigadeLocation }) => {
    const [locations, setLocations] = useState([])
    const [userLocation, setUserLocation] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [locationError, setLocationError] = useState(null)
    const { setUserLocationUser, userLocationUser } = useLocationStore();
    const { socket, ambulanceList, selectedAmbulance } = useSocket();


    useEffect(() => {
        setIsLoading(true)
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userPos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    console.log("User Position: ", userPos)
                    setUserLocation(userPos);
                    setUserLocationUser(userPos);
                    setIsLoading(false)
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
        } else {
            setLocationError("Geolocation is not supported by your browser")
        }
    }, [])

    useEffect(() => {
        if (userLocation) {
            console.log("User Location2: ", userLocation)
            // const locations = getAmbulanceLocations(userLocation, 10);
            // setLocations(locations);
        }
    }, [userLocation])

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
            otherIcon2={otherIcon}
            otherLocations={ambulanceLocation}
            otherLocations2={fireBrigadeLocation}
            bookedLocation={selectedAmbulance}
            isRoutingEnable={true}
        />
    )
}

export default MapUser