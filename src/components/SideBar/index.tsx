'use client'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { Icons } from '../ui/icons'

import clsx from 'clsx'

interface RouteProps {
  fild: string
  path: string
}

const routeAuth = [
  {
    fild: 'Minha Casas',
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
  },
  {
    fild: ' Sair',
    path: '/announce'
  }
] as RouteProps[]

const routeNoAuth = [
  {
    fild: 'Cadastro',
    path: '/signup'
  },
  {
    fild: 'Buscar',
    path: '/'
  }
] as RouteProps[]

export function SideBar() {
  const [isAuth, setIsAuth] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const session = useSession()

  const routes = isAuth ? routeAuth : routeNoAuth

  const handleColumnClick = (column: RouteProps) => {
    if (column.fild === ' Sair') {
      signOut()
    } else {
      router.push(column.path)
    }
  }

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
          <Icons.house className="w-6 h-6" />
        </p>
        <p className="text-white whitespace-nowrap text-xl font-bold">
          Aluga Aqui
        </p>
      </div>

      <ul className="flex gap-4 text-gray-300">
        {routes.map(rout => (
          <li
            key={rout.path}
            onClick={() => handleColumnClick(rout)}
            className={clsx(
              'hover:text-white rounded-lg cursor-pointer uppercase ',
              pathname === rout.path ? 'font-bold text-white' : ''
            )}
          >
            {rout.fild}
          </li>
        ))}
      </ul>
    </aside>
  )
}
