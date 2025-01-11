import React from 'react'
import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import RoutingMachine from './RouteBetn.jsx';


function LocationMarker({ position, setPosition, myIcon }) {
    const [error, setError] = useState(null);
    const map = useMap();

    console.log("Pos: ", position)

    useEffect(() => {

        if (position ) return;
        map.locate({ setView: true, maxZoom: 17 }).on("locationfound", function (e) {
            const { lat, lng } = e.latlng; // Use the location found by Leaflet
            setPosition({  lat,  lng }); // Update the position state with the found location
            map.flyTo([lat, lng], 17); // Automatically zoom in to the found location
        }).on("locationerror", function (e) {
            setError(e.message);
        });
    }, [map, setPosition]);

    return position === null ? null : (
        <Marker position={position} icon={myIcon}>
            <Popup>You are here
            </Popup>
        </Marker>
    );
}


const MapLocation = ({ myLocation, setMyLocation, locationError, myIcon, otherIcon, otherLocations, bookedLocation, isRoutingEnable }) => {
    console.log("My Location: ", myLocation)
    return (
        <div className="flex flex-col items-center space-y-4">
            {locationError && (
                <p className="text-red-500">{locationError}</p>
            )}
            <div className="w-full h-[450px]">
                <MapContainer center={myLocation || [0, 0]} zoom={myLocation ? 10 : 2} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <LocationMarker position={myLocation} setPosition={setMyLocation} myIcon={myIcon} />
                    {myLocation && otherLocations.length > 0 && otherLocations.map((location, index) => (
                        <Marker key={index} position={[location?.lat, location?.lng]} icon={otherIcon}>
                            <Popup>
                                Ambulance {index + 1}<br />
                                Lat: {location.lat.toFixed(6)}<br />
                                Lng: {location.lng.toFixed(6)}
                            </Popup>
                        </Marker>
                    ))}
                    {isRoutingEnable && myLocation && bookedLocation && (
                        <RoutingMachine my={myLocation} other={bookedLocation} />
                    )}
                </MapContainer>
            </div>
        </div>
    )
}

export default MapLocation