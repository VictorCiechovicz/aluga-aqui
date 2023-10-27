'use client'
import axios from "axios";


export async function getHouseDetails(houseId: string) {
  const houses = await axios.get(`/api/house/${houseId}`)
  return houses;
}

