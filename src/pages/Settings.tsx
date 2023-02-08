import { gql, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'

import Layout from '../components/common/Layout'
import { UserWithoutPassword } from '../__generated__/graphql'

const PROFILE = gql`
  query PROFILE {
    profile {
      email
      name
    }
  }
`

interface ProfileQuery {
  profile: UserWithoutPassword
}

function Settings() {
  const { data } = useQuery<ProfileQuery>(PROFILE)
  const [name, setName] = useState(data?.profile.name ?? '')

  useEffect(() => {
    if (data) {
      setName(data.profile.name)
    }
  }, [data])

  return (
    <Layout label="Settings">
      <div className="flex-1 h-full bg-white rounded-xl">
        <input
          disabled
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
    </Layout>
  )
}

export default Settings
