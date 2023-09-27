
import { AnnounceDetails } from '@/components/page/announce/Details'
import axios from 'axios'

interface DetailsAnnounceProps {
  params: {
    id: string
  }
}

export default async function DetailsAnnounce({ params }: DetailsAnnounceProps) {
  const houseId = params.id

  const houses = await axios.get(`http://localhost:3000/api/house/${houseId}`)

  return (
    <div>
      <AnnounceDetails house={houses.data} />
    </div>
  )
}
