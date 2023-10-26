import { AnnounceForm } from '@/components/page'
import { getHouseById } from '../../../services/callApi'

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
