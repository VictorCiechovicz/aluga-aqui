
import { NextResponse } from 'next/server'
import prisma from '@/lib/prismadb'
import { getServerSession } from "next-auth";
import { authOptions } from '../auth/[...nextauth]/route';


export const GET = async (request: Request, response: Response) => {

  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse('Você precisa estar autenticado.', { status: 400 })
  }

  const email = session.user?.email

  if (!email) {
    return new NextResponse('E-mail não fornecido.', { status: 400 });
  }

  try {

    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    });
    if (!user) {
      return new NextResponse('Usuário não encontrado.', { status: 404 })

    }

    return NextResponse.json(user);



  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return new NextResponse('Erro interno do servidor', { status: 500 });
  }
}