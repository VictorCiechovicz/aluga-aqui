'use client'
import { House } from '@prisma/client'
import { Icons } from '@/components/ui/icons'
import ImageCarousel from './ImageCarrousel'
import clsx from 'clsx'
import axios from 'axios'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { ToastAction } from '@/components/ui/toast'

interface CardHouseProps {
  house: House
  isProfile?: boolean
}

export default function CardHouse({ house, isProfile }: CardHouseProps) {
  const { toast } = useToast()
  const router = useRouter()

  function truncateText(text: any, maxLength: any) {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + '...'
  }

  function handleEditHouse(houseId: string) {
    router.push(`/announce/edit/${houseId}`)
  }

  const handleDeleteHouse = async (houseId: string) => {
    axios
      .delete(`/api/house/${houseId}`)
      .then(() => {
        toast({
          title: 'Casa Deletada',
          description: 'Anuncio deletado com sucesso!',
          variant: 'default'
        })
      })
      .catch(() =>
        toast({
          title: 'Casa Deletada',
          description: 'Não foi possível deletar o anuncio!',
          variant: 'destructive',
          action: (
            <ToastAction altText="Tente Novamente">Tente Novamente</ToastAction>
          )
        })
      )
      .finally(() => {
        router.refresh()
      })
  }

  return (
    <div
      key={house.id}
      className={clsx(
        'border p-4 gap-4 bg-white rounded-lg flex ',
        isProfile ? 'justify-between' : 'justify-start'
      )}
    >
      <div className="w-64  rounded-lg">
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
      {isProfile && (
        <div>
          <div className="flex  gap-4">
            <div
              className="cursor-pointer hover:text-gray-400"
              onClick={() => handleEditHouse(house.id)}
            >
              <Icons.pencil />
            </div>

            <div
              className="cursor-pointer hover:text-gray-400"
              onClick={() => handleDeleteHouse(house.id)}
            >
              <Icons.trash />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
