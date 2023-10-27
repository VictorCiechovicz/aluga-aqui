'use client'

import { House } from '@prisma/client'
import CardHouse from '../searchHouse/components/CardHouse'
import { useEffect, useState } from 'react'
import axios from 'axios'

export function FavoriteList() {
  const [favoritedHouses, setFavoritedHouses] = useState<House[]>([])

  useEffect(() => {
    const fetchFavoritedHouses = async () => {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          const favoritedHouseIds = JSON.parse(
            localStorage.getItem('favoritedHouses') || '[]'
          )

          if (favoritedHouseIds.length > 0) {
            const response = await axios.get(`/api/house`)
            const allHouses = response.data
            const filteredHouses = allHouses.filter((house: House) =>
              favoritedHouseIds.includes(house.id)??[]
            )
            setFavoritedHouses(filteredHouses)
          }
        }
      } catch (error) {
        console.error('Error fetching favorited houses:', error)
      }
    }

    fetchFavoritedHouses()
  }, [favoritedHouses])

  return (
    <div className="p-4 bg-gray-100 h-screen flex justify-center">
      <div className="bg-white p-4 w-[1100px] rounded-lg">
        <div className="mb-4">
          <p className="font-semibold text-2xl">Imóveis Favoritos</p>
        </div>
        {favoritedHouses.length>0 ? (
          <div className="flex flex-col gap-4 p-4    bg-gray-100">
            {favoritedHouses.map(house => (
              <CardHouse key={house.id} house={house} isFavorite />
            ))}
          </div>
        ) : (
          <div className="flex justify-center gap-4 p-4 h-screen  ">
            <p>Sem nenhuma casa favoritada</p>
          </div>
        )}
      </div>
    </div>
  )
}
