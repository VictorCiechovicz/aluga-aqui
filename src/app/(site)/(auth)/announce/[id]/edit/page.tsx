import { AnnounceForm } from '@/components/page'
import axios from 'axios'

interface EditAnnounceProps {
  params: {
    id: string
  }
}

export default async function EditAnnounce({ params }: EditAnnounceProps) {
  const houseId = params.id

  const houses = await axios.get(`http://localhost:3000/api/house/${houseId}`)

  return (
    <div>
      <AnnounceForm house={houses.data} />
    </div>
  )
}
