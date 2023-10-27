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

  const houses = []

  return (
    <div>
      <AnnounceDetails house={[] as any} user={[] as any} />
    </div>
  )
}
