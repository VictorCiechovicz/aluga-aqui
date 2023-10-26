import { AnnounceDetails } from '@/components/page/announce/Details'
import axios from 'axios'
import { getHouseDetails } from '../../../services/callApi'

interface DetailsAnnounceProps {
  params: {
    id: string
  }
}

export default async function DetailsAnnounce({
  params
}: DetailsAnnounceProps) {
  const houseId = params.id

  const houses = await getHouseDetails(houseId)

  return (
    <div>
      <AnnounceDetails house={houses.data} user={houses.data.user} />
    </div>
  )
}
