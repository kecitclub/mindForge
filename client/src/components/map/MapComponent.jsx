import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icon
delete (L.Icon.Default.prototype)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
})

export default function MapComponent({ position, setPosition }) {
  const mapContainerRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markerRef = useRef(null)

  useEffect(() => {
    // Only initialize the map if it hasn't been initialized and the container exists
    if (!mapInstanceRef.current && mapContainerRef.current) {
      mapInstanceRef.current = L.map(mapContainerRef.current).setView(
        [position.latitude || 0, position.longitude || 0],
        25
      )

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstanceRef.current)

      markerRef.current = L.marker(
        [position.latitude || 0, position.longitude || 0],
        { draggable: true }
      ).addTo(mapInstanceRef.current)

      // Add dragend event listener
      markerRef.current.on('dragend', () => {
        const newPos = markerRef.current?.getLatLng()
        if (newPos) {
          setPosition({ latitude: newPos.lat, longitude: newPos.lng })
        }
      })
    }

    // Update marker and view position when position prop changes
    if (mapInstanceRef.current && markerRef.current) {
      const newLatLng = [position.latitude || 0, position.longitude || 0]
      markerRef.current.setLatLng(newLatLng)
      mapInstanceRef.current.setView(newLatLng)
    }

    // Cleanup function to properly dispose of the map instance
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
        markerRef.current = null
      }
    }
  }, [position, setPosition])

  return <div ref={mapContainerRef} className="h-full w-full z-0" />
}