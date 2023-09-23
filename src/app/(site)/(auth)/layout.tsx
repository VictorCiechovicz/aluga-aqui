
import { redirect, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function AuthLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
 if (!session) redirect('/')

  return <div>{children}</div>
}
