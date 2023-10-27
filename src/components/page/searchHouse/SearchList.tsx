'use client'

import { House } from '@prisma/client'
import CardHouse from './components/CardHouse'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import dynamic from 'next/dynamic'

export interface SearchListProps {
  houses: House[]
}

export function SearchList({ houses }: SearchListProps) {
  const [locationFilter, setLocationFilter] = useState('')

  const filteredHouses = houses.filter(house =>
    house.adress.toLowerCase().includes(locationFilter.toLowerCase())??[]
  )

  const Map = dynamic(() => import('./Map'), { ssr: false })
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
        <Map houses={filteredHouses} />
      </div>
    </div>
  )
}
