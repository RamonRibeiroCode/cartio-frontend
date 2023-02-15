import * as Tabs from '@radix-ui/react-tabs'

import Layout from '../components/common/Layout'
import Profile from '../components/settings/Profile'

function Settings() {
  const activeTabStyles =
    "data-[state=active]:text-black-100 after:transition-all after:content-[''] after:left-0 after:bottom-0 after:h-1 after:w-0 after:absolute after:bg-primary-100 data-[state=active]:after:w-full"

  return (
    <Layout label="Settings">
      <div className="flex-1 h-full bg-white rounded-xl py-4 px-9">
        <Tabs.Root defaultValue="Profile">
          <Tabs.List className="flex mb-5" aria-label="Manage your account">
            <Tabs.Trigger
              className={`relative flex justify-center items-center w-36 h-10 text-base text-[#ABAFB1] ${activeTabStyles}`}
              value="Profile"
            >
              Profile
            </Tabs.Trigger>

            <Tabs.Trigger
              className={`relative flex justify-center items-center w-36 h-10 text-base text-[#ABAFB1] ${activeTabStyles}`}
              value="Permissions"
            >
              Permissions
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="Profile">
            <Profile />
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
