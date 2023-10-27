import { AnnounceForm } from '@/components/page'

interface EditAnnounceProps {
  params: {
    id: string
  }
}

export default async function EditAnnounce({ params }: EditAnnounceProps) {
  const houseId = params.id

  const houses = []

  return (
    <div>
      <AnnounceForm house={[] as any} />
    </div>
  )
}
