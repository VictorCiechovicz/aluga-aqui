'use client'

import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import { Popup } from 'react-leaflet'

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import { House } from '@prisma/client'

const customIcon = new L.Icon({
  iconUrl: '/images/point.png', 
  iconSize: [68, 68], 
  iconAnchor: [22, 94], 
  popupAnchor: [-3, -76] 
})

interface MapProps {
  houses: House[]
}

export function Map({ houses }: MapProps) {
  function computeAverageCoords(houses: House[]): [number, number] {
    if (houses.length === 0) return [0, 0] 

    const total = houses.reduce(
      (acc, house) => {
  
        if (!house.coords || house.coords.split(',').length !== 2) {
          return acc
        }

        const [latStr, lngStr] = house.coords
          .split(',')
          .map(coord => coord.trim())
        const lat = parseFloat(latStr)
        const lng = parseFloat(lngStr)

        if (isNaN(lat) || isNaN(lng)) {
          return acc
        }

        acc.lat += lat
        acc.lng += lng
        return acc 
      },
      { lat: 0, lng: 0 } as { lat: number; lng: number }
    )

    return [total.lat / houses.length, total.lng / houses.length]
  }

  const centerCoords = computeAverageCoords(houses)

  return (
    <div>
      <MapContainer
        style={{ width: '950px', height: '890px' }}
        center={centerCoords}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {houses.map((house: any) => (
          <Marker
            key={house.id}
            position={house.coords
              .split(',')
              .map((coord: any) => parseFloat(coord.trim()))}
            icon={customIcon}
          >
            <Popup>
              {house.name} <br /> {house.price}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
