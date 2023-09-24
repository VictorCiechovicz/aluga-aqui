'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Icons } from '../ui/icons'

const columnAuth = [
  {
    fild: 'Minha Conta',
    path: '/profile'
  },
  {
    fild: 'Buscar',
    path: '/'
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
    path: '/'
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
    <aside className="flex items-center h-16 w-full bg-blue-900 p-4">
      <div className="flex  w-52"></div>
      <div className="flex-1 flex justify-center items-center gap-2 p-4 ">
        <p className="text-white text-xl font-bold">
          <Icons.house />
        </p>
        <p className="text-white whitespace-nowrap text-xl font-bold">
          Aluga Aqui
        </p>
      </div>

      <ul className="flex gap-4 text-gray-300">
        {columns.map(column => (
          <li
            key={column.path}
            onClick={() => router.push(column.path)}
            className="hover:text-white rounded-lg cursor-pointer"
          >
            {column.fild}
          </li>
        ))}
      </ul>
    </aside>
  )
}
