'use client'
import { House } from '@prisma/client'
import Image from 'next/image'
import ImageCasa from '../../../../../public/images/casa.jpg'
import { Icons } from '@/components/ui/icons'
import ImageCarousel from './ImageCarrousel'

interface CardHouseProps {
  house: House
}


const imageUrls = [
  "https://s01.jetimgs.com/trtuAxMvbtluIHQ1JHO1-v9MhK-Bz4LEOpKrJg45x6-JBfkWzVCqyNYYxy2NtVIz3ghxa-ii4A3k96GSot4FHeE2-YnxFR8wpBQOevkStcy58uiqtVkBFlCA3zpLdBS7tq5hhi3pxbiLqvYLR4x9zX-OTpqMOhmjOxwhki3h2g/horgitljkope.jpg",
  "https://s01.jetimgs.com/trtuA48vbsly56ThRbJxoe5hA-OXrZjL4ISF8D9N_JajFKDHKQLWF4kmDO316grzPQAjB-ryyV5h2pjTYXQIHeEu-YnxxZHPAbSPR-Ji3yL0fljcT9SKM9cl2yzIrfP8gKmn0M1infG-JavDpzWvfTRg3yp5nz00n1SYp1uP/retyudtsra.jpg",
  "https://via.placeholder.com/640x480?text=Image3",
  "https://via.placeholder.com/640x480?text=Image4",
  "https://via.placeholder.com/640x480?text=Image5"
];

export default function CardHouse({ house }: CardHouseProps) {
  return (
    <div
      key={house.id}
      className="border p-4 gap-4 bg-white rounded-lg flex justify-start"
    >
     <ImageCarousel images={imageUrls} />
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
