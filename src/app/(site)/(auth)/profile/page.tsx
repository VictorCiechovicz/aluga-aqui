import getCurrentUser from '@/actions/getCurrentUser'
import { ProfileList } from '@/components/page/profile/ProfileList'
import axios from 'axios'

export default async function Profile() {
  const currentUser = await getCurrentUser()

  const userId = currentUser?.id
  const houses = await axios.get(`http://localhost:3000/api/house/user/${userId}`)

  return (
    <div>
      <ProfileList houses={houses.data} />
    </div>
  )
}
