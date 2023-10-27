'use client'
import { House } from '@prisma/client'
import { Icons } from '@/components/ui/icons'
import ImageCarousel from './ImageCarrousel'
import clsx from 'clsx'
import axios from 'axios'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { Tooltip } from 'react-tooltip'
import { useEffect, useState } from 'react'

interface CardHouseProps {
  house: House
  isProfile?: boolean
  isFavorite?: boolean
}

export default function CardHouse({
  house,
  isProfile,
  isFavorite
}: CardHouseProps) {
  const [isFavorited, setIsFavorited] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleDetailsHouse = (houseId: string) => {
    router.push(`/announce/${houseId}/details`)
  }

  function handleEditHouse(houseId: string) {
    router.push(`/announce/${houseId}/edit`)
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
          variant: 'destructive'
        })
      )
      .finally(() => {
        router.refresh()
      })
  }

  const handleFavoriteHouse = () => {
    if (typeof window === 'undefined' || !window.localStorage) {
      console.warn('localStorage is not available')
      return
    }

    const favoritedHouses = JSON.parse(
      localStorage.getItem('favoritedHouses') || '[]'
    )

    if (favoritedHouses.includes(house.id)) {
      const updatedFavoritedHouses =
        favoritedHouses.filter((id: any) => id !== house.id) ?? []
      localStorage.setItem(
        'favoritedHouses',
        JSON.stringify(updatedFavoritedHouses)
      )
    } else {
      favoritedHouses.push(house.id)
      localStorage.setItem('favoritedHouses', JSON.stringify(favoritedHouses))
    }

    setIsFavorited(prev => !prev)
  }

  useEffect(() => {
    if (typeof window === 'undefined' || !window.localStorage) {
      console.warn('localStorage is not available')
      return
    }

    const favoritedHouses = JSON.parse(
      localStorage.getItem('favoritedHouses') || '[]'
    )
    setIsFavorited(favoritedHouses.includes(house.id))
  }, [house.id])

  return (
    <div
      key={house.id}
      className={clsx(
        'border p-4 gap-4 bg-white rounded-lg flex  ',
        isProfile || isFavorite ? 'justify-between' : 'justify-start'
      )}
    >
      <div className="flex gap-6">
        <div className="  rounded-lg">
          <ImageCarousel
            images={house.images}
            height="h-[150px]"
            width="w-[256px]"
          />
        </div>
        <div
          className="flex flex-col justify-between cursor-pointer"
          onClick={() => handleDetailsHouse(house.id)}
        >
          <div>
            <p className="text-3xl font-semibold capitalize">{house.name}</p>
            <p className="text-sm text-gray-500 font-normal">{house.adress}</p>
            <p className="text-lg text-blue-500 font-semibold mt-3">
              R$ {(parseFloat(house.price) || 0).toLocaleString('pt-BR')} /mês
            </p>
          </div>

          <div className="flex gap-4 mt-4">
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

      {isFavorite && (
        <div>
          <div className="flex gap-4">
            <div
              className="cursor-pointer hover:text-gray-400"
              onClick={() => handleFavoriteHouse()}
              data-tooltip-id="tooltip-favorite"
              data-tooltip-content={
                !isFavorited
                  ? 'Adicionar aos favoritos'
                  : 'Remover dos favoritos'
              }
              data-tooltip-place="left-start"
            >
              <Tooltip id="tooltip-favorite" />
              <Icons.bookFavorite
                className={isFavorited ? 'stroke-red-600' : 'stroke-gray-400'}
              />
            </div>
          </div>
        </div>
      )}

      {isProfile && (
        <div>
          <div className="flex  gap-4">
            <div
              className="cursor-pointer hover:text-gray-400"
              onClick={() => handleEditHouse(house.id)}
              data-tooltip-id="tooltip-edit"
              data-tooltip-content="Editar Anúncio"
              data-tooltip-place="top"
            >
              <Icons.pencil />
              <Tooltip id="tooltip-edit" />
            </div>

            <div
              className="cursor-pointer hover:text-gray-400"
              onClick={() => handleDeleteHouse(house.id)}
              data-tooltip-id="tooltip-edit"
              data-tooltip-content="Excluir Anúncio"
              data-tooltip-place="top"
            >
              <Icons.trash />
              <Tooltip id="tooltip-delete" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
