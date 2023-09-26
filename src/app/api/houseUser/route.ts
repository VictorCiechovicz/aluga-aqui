
import { NextResponse } from 'next/server'
import prisma from '@/lib/prismadb'
import getCurrentUser from '@/actions/getCurrentUser';


export async function GET(request: Request) {
  const currentUser = await getCurrentUser()
  
  try {

    if (!currentUser?.id || !currentUser.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }


    const houses = await prisma.house.findUnique({
      where: {
        id: currentUser.id
      }
    });

    return NextResponse.json(houses);
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}