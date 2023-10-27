import getCurrentUser from '@/actions/getCurrentUser'
import { ProfileList } from '@/components/page/profile/ProfileList'


export default async function Profile() {
  const currentUser = await getCurrentUser()

  const userId = currentUser?.id
  const houses = []

  return (
    <div>
      <ProfileList houses={[]} />
    </div>
  )
}
