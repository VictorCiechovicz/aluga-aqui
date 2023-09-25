'use client'
import { House } from '@prisma/client'
import { Icons } from '@/components/ui/icons'
import ImageCarousel from './ImageCarrousel'

interface CardHouseProps {
  house: House
}

export default function CardHouse({ house }: CardHouseProps) {
  return (
    <div
      key={house.id}
      className="border p-4 gap-4 bg-white rounded-lg flex justify-start"
    >
      <div className="w-64 rounded-lg">
        <ImageCarousel images={house.images} />
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <p className="text-3xl font-semibold capitalize">{house.name}</p>
          <p className="text-sm text-gray-500 font-normal">{house.adress}</p>
          <p className="text-lg text-blue-500 font-semibold mt-3">
            R$ {(parseFloat(house.price) || 0).toLocaleString('pt-BR')} /mês
          </p>
        </div>

        <div className="flex gap-4">
          <div className="flex gap-2 items-center">
            <div className="bg-blue-100 w-7 h-6 rounded-sm justify-center items-center flex">
              <Icons.bed />
            </div>
            <p className="text-sm text-gray-500 font-semibold">
              {house.numberBedrooms}{' '}
              {parseInt(house.numberBedrooms || '0') === 1
                ? 'Quarto'
                : 'Quartos'}
            </p>
          </div>

          <div className="flex gap-2 items-center">
            <div className="bg-blue-100 w-7 h-6 rounded-sm justify-center items-center flex">
              <Icons.bath />
            </div>
            <p className="text-sm text-gray-500 font-semibold">
              {house.numberBathrooms}{' '}
              {parseInt(house.numberBathrooms || '0') === 1
                ? 'Banheiro'
                : 'Banheiros'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
