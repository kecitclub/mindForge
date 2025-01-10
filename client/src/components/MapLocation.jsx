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

        if (position) return;
        map.locate({ setView: true, maxZoom: 16 }).on("locationfound", function (e) {
            const { lat, lng } = e.latlng; // Use the location found by Leaflet
            setPosition({ latitude: lat, longitude: lng }); // Update the position state with the found location
            map.flyTo([lat, lng], 10); // Automatically zoom in to the found location
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
    const newLocation = {
        lat: myLocation.latitude,
        lng: myLocation.longitude
    }
    return (
        <div className="flex flex-col items-center space-y-4">
            {locationError && (
                <p className="text-red-500">{locationError}</p>
            )}
            <div className="w-[70vw] h-[250px]">
                <MapContainer center={newLocation || [0, 0]} zoom={newLocation ? 10 : 2} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <LocationMarker position={newLocation} setPosition={setMyLocation} myIcon={myIcon} />
                    {myLocation && otherLocations.map((location, index) => (
                        <Marker key={index} position={[location.latitude, location.longitude]} icon={otherIcon}>
                            <Popup>
                                Ambulance {index + 1}<br />
                                Lat: {location.latitude.toFixed(6)}<br />
                                Lng: {location.longitute.toFixed(6)}
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