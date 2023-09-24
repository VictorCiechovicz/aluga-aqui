'use client'

import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import { Popup } from 'react-leaflet'

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import { House } from '@prisma/client'

const customIcon = new L.Icon({
  iconUrl: '/images/house.svg', // URL do seu ícone personalizado
  iconSize: [28, 95], // Tamanho do ícone. Isso depende das dimensões do seu ícone.
  iconAnchor: [22, 94], // Ponto do ícone que corresponderá à localização exata do marcador
  popupAnchor: [-3, -76] // Ponto a partir do qual o popup será aberto
})

interface MapProps {
  houses: House[]
}

export function Map({ houses }: MapProps) {


  function computeAverageCoords(houses: House[]): [number, number] {
    if (houses.length === 0) return [0, 0] // Default value

    const total = houses.reduce(
      (acc, house) => {
        const lat = parseFloat(house.coords[0])
        const lng = parseFloat(house.coords[1])

        acc.lat += lat
        acc.lng += lng
        return acc
      },
      { lat: 0, lng: 0 } as { lat: number; lng: number }
    )
    return [total.lat / houses.length, total.lng / houses.length]
  }
  const centerCoords = computeAverageCoords(houses)
console.log(centerCoords)
  return (
    <div >
      <MapContainer
           style={{ width: '950px', height: '890px' }}
        center={[-28.263011, -53.495534]}
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
