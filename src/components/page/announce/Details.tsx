'use client'

import { useToast } from '@/components/ui/use-toast'

import { useRouter } from 'next/navigation'

import { House } from '@prisma/client'
import ImageCarousel from '../searchHouse/components/ImageCarrousel'
import { Icons } from '@/components/ui/icons'
import { formatDistanceToNow } from 'date-fns'
import { pt } from 'date-fns/locale'

interface AnnounceDetailsProps {
  house?: House
}

export function AnnounceDetails({ house }: AnnounceDetailsProps) {
  const { toast } = useToast()
  const router = useRouter()

  function pluralize(count: number, singular: string, plural: string) {
    return count === 1 ? singular : plural
  }

  const bedroomText = pluralize(
    Number(house?.numberBedrooms),
    'Dormitório',
    'Dormitórios'
  )
  const bathroomText = pluralize(
    Number(house?.numberBathrooms),
    'Banheiro',
    'Banheiros'
  )

  return (
    <div className="p-4 bg-gray-100 flex justify-center">
      <div className="bg-white p-4 w-[956px] rounded-lg">
        <div className="mb-4">
          <p className="font-semibold text-2xl">Detalhes Imóvel</p>
        </div>
        <div className="border rounded-lg">
          <div className="border bg-gray-100 p-2">
            <p className="font-semibold text-lg">Imóvel</p>
          </div>
          <div className="flex">
            <div>
              <div className="p-4  ">
                <ImageCarousel
                  images={house ? house?.images : []}
                  height="h-[420px]"
                  width="w-[700px]"
                />
              </div>
              <div className="p-2">
                <p className="text-3xl font-semibold capitalize py-4">
                  {house?.name}
                </p>
                <div className="flex items-center gap-2">
                  <Icons.mapPin />
                  <p className="text-sm text-gray-500 font-normal">
                    {house?.adress}
                  </p>
                </div>
              </div>

              <div className="px-2 py-10">
                <p className="text-2xl font-semibold capitalize ">
                  Casa para alugar
                </p>
                <p className="text-sm text-gray-500 font-normal">
                  Atualizado{' '}
                  {house?.updateAt
                    ? formatDistanceToNow(new Date(house.updateAt), {
                        addSuffix: true,
                        locale: pt
                      })
                    : 'um tempo indeterminado'}{' '}
                </p>
              </div>
              <div className="p-2 flex gap-4">
                <div className="flex gap-1">
                  <Icons.bed />
                  <p className="text-lg text-gray-500 font-normal">
                    {house?.numberBedrooms} {bedroomText}
                  </p>
                </div>
                <div className="flex gap-1">
                  <Icons.bath />
                  <p className="text-lg text-gray-500 font-normal">
                    {house?.numberBathrooms} {bathroomText}
                  </p>
                </div>
              </div>

              <div className=" pl-2 pt-10">
                <p className="text-2xl font-semibold capitalize ">Descrição</p>
                <p className="text-lg text-gray-500 font-normal">
                  {house?.description}
                </p>
              </div>
            </div>

            <div className="p-4">
              <div className="bg-gray-100 w-56 h-24 rounded-2xl border border-gray-900 p-2 shadow-md">
                <p className="text-xl font-semibold">Preço</p>
                <p className="text-2xl font-semibold">R$ {house?.price}/Mês</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
