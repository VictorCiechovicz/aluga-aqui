import { SearchList } from '@/components/page'
import axios from 'axios'

export default async function SearchHouse() {
  const houses = await axios.get('http://localhost:3000/api/house')

  return (
    <div>
      <SearchList houses={houses.data} />
    </div>
  )
}
