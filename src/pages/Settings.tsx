import { useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import * as Tabs from '@radix-ui/react-tabs'

import Layout from '../components/common/Layout'
import { UserWithoutPassword } from '../__generated__/graphql'
import Input from '../components/ui/Input'
import Profile from '../assets/settings-profile.png'

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
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    if (data) {
      setName(data.profile.name)
    }
  }, [data])

  const activeStyles =
    "data-[state=active]:text-black-100 after:transition-all after:content-[''] after:left-0 after:bottom-0 after:h-1 after:w-0 after:absolute after:bg-primary-100 data-[state=active]:after:w-full"

  return (
    <Layout label="Settings">
      <div className="flex-1 h-full bg-white rounded-xl py-4 px-9">
        <Tabs.Root defaultValue="Profile">
          <Tabs.List className="flex mb-5" aria-label="Manage your account">
            <Tabs.Trigger
              className={`relative flex justify-center items-center w-36 h-10 text-base text-[#ABAFB1] ${activeStyles}`}
              value="Profile"
            >
              Profile
            </Tabs.Trigger>

            <Tabs.Trigger
              className={`relative flex justify-center items-center w-36 h-10 text-base text-[#ABAFB1] ${activeStyles}`}
              value="Permissions"
            >
              Permissions
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="Profile">
            <div className="flex justify-between items-center">
              <p className="text-sub-heading-3 text-black-60">
                Profile Settings
              </p>

              <button
                className={`flex justify-center items-center w-full max-w-[180px] h-14 rounded-xl outline-primary-10 mt-12 text-lg text-white ${
                  editing
                    ? 'bg-action-red hover:opacity-90'
                    : 'bg-primary-100 hover:bg-primary-80'
                }`}
                type="submit"
                onClick={() => setEditing(!editing)}
              >
                {editing ? 'Cancel' : 'Edit'}
              </button>
            </div>

            <div className="flex">
              <form className="flex flex-col w-full max-w-md" action="">
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  icon="Profile"
                  inputClassName="disabled:opacity-60"
                  label="Full Name *"
                  wrapperClassName="mb-4"
                  disabled={!editing}
                />

                <Input
                  type="text"
                  placeholder="Email"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  icon="Mail"
                  inputClassName="disabled:opacity-60"
                  label="Email *"
                  wrapperClassName="mb-4"
                  disabled={!editing}
                />

                <Input
                  type="text"
                  inputClassName="disabled:opacity-60"
                  placeholder="Phone Number"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  icon="Phone"
                  label="Phone Number"
                  wrapperClassName="mb-4"
                  disabled={!editing}
                />

                <Input
                  type="text"
                  placeholder="Address"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  icon="Location"
                  inputClassName="disabled:opacity-60"
                  label="Address"
                  wrapperClassName="mb-4"
                  disabled={!editing}
                />

                <Input
                  type="text"
                  placeholder="State"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  label="State"
                  inputClassName="disabled:opacity-60"
                  wrapperClassName="mb-4"
                  disabled={!editing}
                />

                <Input
                  type="text"
                  placeholder="City"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  label="City"
                  inputClassName="disabled:opacity-60"
                  wrapperClassName="mb-4"
                  disabled={!editing}
                />

                <button
                  className={`flex justify-center items-center w-full h-14 rounded-xl outline-primary-10 text-lg text-white bg-action-green ${
                    editing ? 'cursor-pointer' : 'opacity-30 cursor-not-allowed'
                  }`}
                  type="submit"
                >
                  Update Changes
                </button>
              </form>

              <div className="relative ml-20">
                <img
                  className='rounded-xl overflow-hidden"'
                  src={Profile}
                  alt="Profile"
                />
              </div>
            </div>
          </Tabs.Content>

          <Tabs.Content className="TabsContent" value="Permissions">
            <p className="Text">Permissions</p>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </Layout>
  )
}

export default Settings
