'use client'

import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import { Popup } from 'react-leaflet'


import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { HousesProps } from './SearchList'

const customIcon = new L.Icon({
  iconUrl: '/images/house.svg', // URL do seu ícone personalizado
  iconSize: [28, 95], // Tamanho do ícone. Isso depende das dimensões do seu ícone.
  iconAnchor: [22, 94], // Ponto do ícone que corresponderá à localização exata do marcador
  popupAnchor: [-3, -76] // Ponto a partir do qual o popup será aberto
})

interface MapProps {
  houses: HousesProps[]
}

export function Map({ houses }: MapProps) {
  function computeAverageCoords(houses: HousesProps[]): [number, number] {
    if (houses.length === 0) return [0, 0] // Default value

    const total = houses.reduce(
      (acc, house) => {
        acc.lat += house.coords[0]
        acc.lng += house.coords[1]
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
        style={{ width: '500px', height: '700px' }}
        center={centerCoords}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {houses.map((house: any) => (
          <Marker key={house.id} position={house.coords} icon={customIcon}>
            <Popup>
              {house.name} <br /> {house.price}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
