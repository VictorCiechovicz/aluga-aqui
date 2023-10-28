'use client'
import { getHouseById } from '@/app/(site)/services/callApi'
import { AnnounceForm } from '@/components/page'

interface EditAnnounceProps {
  params: {
    id: string
  }
}

export default async function EditAnnounce({ params }: EditAnnounceProps) {
  const houseId = params.id

  const houses = await getHouseById(houseId)

  return (
    <div>
      <AnnounceForm house={houses.data} />
    </div>
  )
}
