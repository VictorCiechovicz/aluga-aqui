'use client'
import { getHouseDetails } from '@/app/(site)/services/callApi'
import { AnnounceDetails } from '@/components/page/announce/Details'

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
