
import { NextResponse } from 'next/server'
import prisma from '@/lib/prismadb'

interface IParams {
  houseId?: string
}


export async function GET(request: Request, { params }: { params: IParams }) {
  try {
    const { houseId } = params;

    const house = await prisma.house.findFirst({
      where: {
        id: houseId
      }
    });

    // If no house was found, you can return a 404 not found response
    if (!house) {
      return new NextResponse('Not Found', { status: 404 });
    }

    return NextResponse.json(house);
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}




export async function PUT(request: Request, { params }: { params: IParams }) {
  try {
    const { houseId } = params;

    const updateData = await request.json(); 

    const updatedHouse = await prisma.house.update({
      where: {
        id: houseId,
      },
      data: updateData, 
    });

    return NextResponse.json(updatedHouse);
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}








export async function DELETE(request: Request, { params }: { params: IParams }) {

  try {

    const { houseId } = params

    const houses = await prisma.house.delete({
      where: {
        id:houseId
      }
    })

    return NextResponse.json(houses);
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}