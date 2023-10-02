'use client'

import { House } from '@prisma/client'
import CardHouse from '../searchHouse/components/CardHouse'

export interface ProfileListProps {
  houses: House[]
}

export function ProfileList({ houses }: ProfileListProps) {
  return (
    <div className="p-4 bg-gray-100 flex justify-center">
      <div className="bg-white p-4 w-[1100px] rounded-lg">
        <div className="mb-4">
          <p className="font-semibold text-2xl">Minhas Casas</p>
        </div>

        <div className="flex flex-col gap-4 p-4  bg-gray-100">
          {houses.map(house => (
            <CardHouse house={house} isProfile/>
          ))}
        </div>
      </div>
      <div></div>
    </div>
  )
}
