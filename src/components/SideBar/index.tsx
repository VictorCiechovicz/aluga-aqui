'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const columnAuth = [
  {
    fild: 'Minha Conta',
    path: '/profile'
  },
  {
    fild: 'Buscar',
    path: '/searchHouse'
  },
  {
    fild: 'Favoritos',
    path: '/favorite'
  },
  {
    fild: ' Anunciar',
    path: '/announce'
  }
]

const columnNoAuth = [
  {
    fild: 'Cadastro',
    path: '/signup'
  },
  {
    fild: 'Buscar',
    path: '/searchHouse'
  }
]

export function SideBar() {
  const [isAuth, setIsAuth] = useState(false)
  const router = useRouter()
  const session = useSession()

  const columns = isAuth ? columnAuth : columnNoAuth

  useEffect(() => {
    if (session?.status === 'authenticated') {
      setIsAuth(true)
    }
  }, [session?.status, router])

  return (
    <aside className="flex justify-between  h-16 w-full bg-blue-600 p-4">
      <div className="flex justify-center items-center bg-white rounded-lg p-4">
        <p className="text-blue-600 text-xl font-bold">Logo do site</p>
      </div>

      <ul className="flex gap-4  text-gray-300">
        {columns.map(column => (
          <li
            key={column.path}
            onClick={() => router.push(column.path)}
            className="hover:text-white  rounded-lg cursor-pointer"
          >
            {column.fild}
          </li>
        ))}
      </ul>
    </aside>
  )
}
