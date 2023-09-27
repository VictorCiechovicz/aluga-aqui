'use client'

import { House } from '@prisma/client'
import ImageCarousel from '../searchHouse/components/ImageCarrousel'
import { Icons } from '@/components/ui/icons'
import { formatDistanceToNow } from 'date-fns'
import { pt } from 'date-fns/locale'
import Image from 'next/image'
import UserImage from '../../../../public/images/user.png'

interface AnnounceDetailsProps {
  house?: House
}

export function AnnounceDetails({ house }: AnnounceDetailsProps) {
  function pluralize(count: number, singular: string, plural: string) {
    return count === 1 ? singular : plural
  }
  const phone = '55991528230'
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

  function handleOpenWhatsapp() {
    window.open(
      `https://api.whatsapp.com/send?phone=${phone.replace('+', '')}`,
      '_blank'
    )
  }

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
            <div>
              <div className="p-4">
                <div className=" w-56 h-24 rounded-2xl border border-gray-900 p-2 shadow-md">
                  <p className="text-sm font-semibold">PREÇO</p>
                  <p className="text-2xl text-blue-500 font-semibold pt-1">
                    R$ {house?.price}/Mês
                  </p>
                </div>
              </div>
              <div className="p-4">
                <div className=" w-56  rounded-2xl border border-gray-900 p-2 shadow-md">
                  <p className="text-sm font-semibold">ANUNCIANTE</p>
                  <div className='flex items-center pt-2 gap-2'>
                    <Image
                      src={UserImage}
                      alt="image user"
                      width={35}
                      height={35}
                    />
                    <p className="text-sm text-gray-500 font-normal">
                      Conecta Imóvel
                    </p>
                  </div>

                  <div className="flex items-end justify-between gap-4  pt-6 px-1">
                    <div>
                      <p className="text-sm text-gray-500 font-normal">
                        Telefone de contato
                      </p>
                      <p className="text-sm text-gray-500 font-normal">
                        55 991528230
                      </p>
                    </div>

                    <div
                      className="hover:text-gray-400 cursor-pointer"
                      onClick={handleOpenWhatsapp}
                    >
                      <Icons.whatsapp />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
