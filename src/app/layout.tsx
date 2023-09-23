import { cn } from '@/lib/utils'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import { SideBar } from '@/components/SideBar'
import AuthContext from '@/context/AuthContext'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Aluga Aqui',
  description: 'Aluga Aqui'
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en">
      <body className={cn(inter.className, ' min-h-screen')}>
        <AuthContext>
          <SideBar />
          <Toaster />
          {children}
        </AuthContext>
      </body>
    </html>
  )
}
