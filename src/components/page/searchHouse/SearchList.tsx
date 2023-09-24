'use client'

import { Map } from './Map'
import Image from 'next/image'
import ImageCasa from '../../../../public/images/casa.jpg'
import { House } from '@prisma/client'
import CardHouse from './components/CardHouse'

export interface SearchListProps {
  houses: House[]
}

const dataTeste = [
  { id: '1', name: 'casa 1', price: '1500', coords: [-28.289365, -53.498574] },
  { id: '2', name: 'casa 2', price: '1500', coords: [-28.263159, -53.497021] },
  { id: '3', name: 'casa 3', price: '1500', coords: [-28.263431, -53.496296] },
  { id: '4', name: 'casa 4', price: '1500', coords: [-28.263778, -53.496569] },
  { id: '5', name: 'casa 1', price: '1500', coords: [-28.263011, -53.495534] },
  { id: '6', name: 'casa 2', price: '1500', coords: [-28.263159, -53.497021] },
  { id: '7', name: 'casa 3', price: '1500', coords: [-28.263431, -53.496296] },
  { id: '8', name: 'casa 4', price: '1500', coords: [-28.263778, -53.496569] }
]

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
