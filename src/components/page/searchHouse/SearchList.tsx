'use client'

import { Map } from './Map'
import Image from 'next/image'
import ImageCasa from '../../../../public/images/casa.jpg'
import { House } from '@prisma/client'
import CardHouse from './components/CardHouse'

export interface SearchListProps {
  houses: House[]
}



export function SearchList({ houses }: SearchListProps) {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col w-full   h-full bg-gray-100">
        <div className="h-40 bg-white shadow-md flex items-center justify-start p-4">
          <p>Filtros</p>
        </div>

        <div className="flex flex-col gap-4 p-4  max-h-[730px] overflow-y-auto bg-gray-100">
          {houses.map(house => (
            <CardHouse house={house} />
          ))}
        </div>
      </div>
      <div>
        <Map houses={houses} />
      </div>
    </div>
  )
}
