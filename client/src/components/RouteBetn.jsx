import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutineMachineLayer = ({ my, other }) => {
    const instance = L.Routing.control({
        waypoints: [
            L.latLng(my.lat, my.lng),
            L.latLng(other.lat, other.lng)
        ],
        lineOptions: {
            styles: [{ color: "red", weight: 2 }]
        },
        show: true,
        addWaypoints: true,
        routeWhileDragging: true,
        draggableWaypoints: true,
        fitSelectedRoutes: true,
        showAlternatives: false,
        createMarker: function () {
            return null;
        },
    });

    return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
