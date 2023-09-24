

import { NextResponse } from 'next/server'
import prisma from '@/lib/prismadb'

export const POST = async (request: Request) => {
  try {
    const body = await request.json()
    const {
      name,
      price,
      adress,
      coords,
      images,
      userId,
      description,
      numberBedrooms,
      numberBathrooms,
    } = body;

    if (
      !name ||
      !adress ||
      !price ||
      !userId ||
      !coords ||
      !description ||
      !numberBedrooms ||
      !numberBathrooms
    ) {
      return new NextResponse('Bad Request', { status: 400 });
    }


    if (images && !Array.isArray(images)) {
      return new NextResponse('Bad Request', { status: 400 });
    }



    const newHouse = await prisma.house.create({
      data: {
        name: name,
        price: price,
        adress: adress,
        coords: coords,
        images: images,
        userId: userId,
        description:description,
        numberBedrooms:numberBedrooms,
        numberBathrooms:numberBathrooms,
      }
    });

    return NextResponse.json(newHouse)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export const GET = async () => {
  try {
    const houses = await prisma.house.findMany({
      include: {
        user: true
      }
    });

    return NextResponse.json(houses);
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}