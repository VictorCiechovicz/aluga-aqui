'use client'

import { Map } from './Map'
import Image from 'next/image'
import ImageCasa from '../../../../public/images/casa.jpg'
import { useState } from 'react'
import { useSession } from 'next-auth/react'

export interface HousesProps {
  id: string
  name: string
  price: string
  coords: number[]
}

const dataTeste = [
  { id: '1', name: 'casa 1', price: '1500', coords: [-28.263011, -53.495534] },
  { id: '2', name: 'casa 2', price: '1500', coords: [-28.263159, -53.497021] },
  { id: '3', name: 'casa 3', price: '1500', coords: [-28.263431, -53.496296] },
  { id: '4', name: 'casa 4', price: '1500', coords: [-28.263778, -53.496569] }
]

export function SearchList() {
  const [address, setAddress] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [houses, setHouses] = useState<HousesProps[]>(dataTeste)
  const session = useSession()
console.log(session)

  return (
    <div className="flex justify-between p-6 gap-12">
 
      <div className="flex gap-4 flex-wrap w-full h-[700px] overflow-y-auto  ">
        {houses.map(house => (
          <div key={house.id} className="border p-2 ">
            <Image alt={house.name} src={ImageCasa} className="w-64 " />
            <div>
              <p className="text-lg font-semibold">{house.name}</p>
              <p className="text-xs">R${house.price}</p>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Map houses={houses} />
      </div>
    </div>
  )
}
