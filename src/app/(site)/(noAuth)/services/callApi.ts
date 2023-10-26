
import axios from "axios";


export async function getHouseDetails(houseId: string) {
  const houses = await axios.get(`http://localhost:3000/api/house/${houseId}`)
  return houses;
}

