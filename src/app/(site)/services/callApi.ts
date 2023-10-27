
import axios from "axios";


export async function getHouses() {
  const houses = await axios.get('/api/house')
  return houses;
}


export async function getHouseById(houseId: string) {
  const house = await axios.get(`/api/house/${houseId}`)
  return house;
}


export async function getHousesUser(userId?: string) {
  const houses = await axios.get(`/api/house/user/${userId}`)
  return houses;
}


export async function getHouseDetails(houseId: string) {
  const houses = await axios.get(`/api/house/${houseId}`)
  return houses;
}

