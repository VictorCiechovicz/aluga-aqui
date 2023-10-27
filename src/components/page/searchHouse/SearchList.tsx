'use client'

import { House } from '@prisma/client'
import CardHouse from './components/CardHouse'
import { useState } from 'react'
import { Input } from '@/components/ui/input'

import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import { Popup } from 'react-leaflet'

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import Image from 'next/image'

const customIcon = new L.Icon({
  iconUrl: '/images/point.png',
  iconSize: [68, 68],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76]
})
export interface SearchListProps {
  houses: House[]
}

export function SearchList({ houses }: SearchListProps) {
  const [locationFilter, setLocationFilter] = useState('')

  const filteredHouses = houses.filter(house =>
    house.adress.toLowerCase().includes(locationFilter.toLowerCase())
  )

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
    <div className="flex justify-between">
      <div className="flex flex-col w-full h-full bg-gray-100 ">
        <div className="h-32 bg-white shadow-md flex  flex-col">
          <div className="border bg-gray-100 p-1">
            <p className="font-semibold text-lg pb-1 ">Buscar</p>
          </div>
          <div className="w-full p-2">
            <p className="font-semibold text-sm pb-1">Localização</p>
            <Input
              value={locationFilter}
              onChange={e => setLocationFilter(e.target.value)}
              placeholder="Cidade, bairro, rua ou condomínio"
              className=""
            />
          </div>
        </div>
        {houses ? (
          <div className="flex flex-col gap-4 p-4 max-h-[730px] overflow-y-auto bg-gray-100">
            {filteredHouses.map(house => (
              <CardHouse house={house} isFavorite />
            ))}
          </div>
        ) : (
          <div className="flex  p-8 max-h-[730px] justify-center overflow-y-auto bg-gray-100">
            <p>Sem nenhuma casa cadastrada</p>
          </div>
        )}
      </div>
      <div>
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
                  <div>
                    <div className="flex gap-4 items-center">
                      <Image
                        src={house.images[0]}
                        alt="image house"
                        width={120}
                        height={10}
                        className="rounded-2xl  h-28"
                      />
                      <div>
                        <p className="capitalize text-sm font-bold">
                          {house.name}
                        </p>

                        <p className=" text-xs text-gray-500 font-normal">
                          {house.adress}
                        </p>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  )
}
