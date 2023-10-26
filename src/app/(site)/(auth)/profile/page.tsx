import getCurrentUser from '@/actions/getCurrentUser'
import { ProfileList } from '@/components/page/profile/ProfileList'
import { getHousesUser } from '../services/callApi'

export default async function Profile() {
  const currentUser = await getCurrentUser()

  const userId = currentUser?.id
  const houses = await getHousesUser(userId)

  return (
    <div>
      <ProfileList houses={houses.data} />
    </div>
  )
}
