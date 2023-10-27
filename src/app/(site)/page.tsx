import { SearchList } from '@/components/page'
import { getHouses } from './services/callApi'

export default async function SearchHouse() {
  const houses = await getHouses()

  return (
    <div>
      <SearchList houses={houses.data} />
    </div>
  )
}
