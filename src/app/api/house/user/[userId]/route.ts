
import { NextResponse } from 'next/server'
import prisma from '@/lib/prismadb'

interface IParams {
  userId?: string
}

export async function GET(request: Request, { params }: { params: IParams }) {

  try {

    const { userId } = params

    const houses = await prisma.house.findMany({
      where: {
        userId: userId
      }
   });

    return NextResponse.json(houses);
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}