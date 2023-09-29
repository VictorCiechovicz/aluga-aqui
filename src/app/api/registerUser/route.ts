import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prismadb'

export async function POST(
  request: Request
) {
  try {
    const body = await request.json()
    const {
      email,
      name,
      password
    } = body

    if (!email || !name || !password) {
      return new NextResponse('Informe Email, Nome e Senha para Cadastro!', { status: 400 })
    }


    const existingUser = await prisma.user.findUnique({
      where: {
        email: email
      }
    })

    if (existingUser) {
      return new NextResponse('E-mail já Cadastrado!', { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword
      }
    })

    return NextResponse.json(user)
  } catch (error: any) {
    console.log(error, "REGISTRATION_ERROR")
    return new NextResponse('Internal Error', { status: 500 })
  }
}
