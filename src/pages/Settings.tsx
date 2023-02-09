import { FormEvent, useEffect, useReducer, useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import * as Tabs from '@radix-ui/react-tabs'

import Layout from '../components/common/Layout'
import Input from '../components/ui/Input'
import {
  UserWithoutPassword,
  MutationUpdateUserArgs,
} from '../__generated__/graphql'
import { useAuth } from '../contexts/auth'
import Icon from '../components/ui/Icon'

export const PROFILE = gql`
  query PROFILE {
    profile {
      email
      name
      phone
      address
      state
      city
      imageUrl
    }
  }
`

const UPDATE_USER = gql`
  mutation UPDATE_USER($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      email
      name
      address
      phone
      state
      city
    }
  }
`

export interface ProfileQuery {
  profile: UserWithoutPassword
}

interface UpdateUserQuery {
  updateuser: UserWithoutPassword
}

interface Action {
  type:
    | 'SET_INITIAL_PROFILE'
    | 'UPDATE_NAME'
    | 'UPDATE_EMAIL'
    | 'UPDATE_PHONE'
    | 'UPDATE_ADDRESS'
    | 'UPDATE_STATE'
    | 'UPDATE_CITY'
  payload: ProfileType | string
}

interface ProfileType {
  name: string
  email: string
  phone: string
  address: string
  state: string
  city: string
  imageUrl?: string
}

const reducer = (state: ProfileType, action: Action) => {
  switch (action.type) {
    case 'SET_INITIAL_PROFILE':
      return { ...(action.payload as ProfileType) }

    case 'UPDATE_NAME':
      return { ...state, name: action.payload as string }

    case 'UPDATE_EMAIL':
      return { ...state, email: action.payload as string }

    case 'UPDATE_PHONE':
      return { ...state, phone: action.payload as string }

    case 'UPDATE_ADDRESS':
      return { ...state, address: action.payload as string }

    case 'UPDATE_STATE':
      return { ...state, state: action.payload as string }

    case 'UPDATE_CITY':
      return { ...state, city: action.payload as string }

    default:
      return state
  }
}

const initialState = {
  name: '',
  email: '',
  phone: '',
  address: '',
  state: '',
  city: '',
}

function Settings() {
  const { data } = useQuery<ProfileQuery>(PROFILE)
  const [updateUser] = useMutation<UpdateUserQuery, MutationUpdateUserArgs>(
    UPDATE_USER
  )
  const { handleUpdateUserAuthenticated } = useAuth()

  const [editing, setEditing] = useState(false)
  const [storagedProfile, setStoredProfile] = useState({} as ProfileType)
  const [state, dispatch] = useReducer(reducer, { ...initialState })

  const handleCancelUpdate = () => {
    dispatch({ type: 'SET_INITIAL_PROFILE', payload: storagedProfile })
  }

  const handleUpdateProfile = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setEditing(false)
    setStoredProfile(state)

    const userToUpdate = {
      ...state,
      email: undefined,
      imageUrl: undefined,
    }

    updateUser({ variables: { updateUserInput: userToUpdate } })

    if (state.name !== storagedProfile.name) {
      handleUpdateUserAuthenticated(state.email, state.name)
    }
  }

  const verifyIfStoredProfileIsEqualToEditedProfile = () => {
    return JSON.stringify(storagedProfile) === JSON.stringify(state)
  }

  useEffect(() => {
    if (data) {
      const { name, email, address, phone, state, city, imageUrl } =
        data.profile

      const profile: ProfileType = {
        name,
        email,
        phone: phone ?? '',
        address: address ?? '',
        state: state ?? '',
        city: city ?? '',
        imageUrl: imageUrl ?? undefined,
      }

      setStoredProfile(profile)
      dispatch({ type: 'SET_INITIAL_PROFILE', payload: profile })
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
                onClick={() => {
                  editing && handleCancelUpdate()

                  setEditing(!editing)
                }}
              >
                {editing ? 'Cancel' : 'Edit'}
              </button>
            </div>

            <div className="flex">
              <form
                className="flex flex-col w-full max-w-md"
                onSubmit={handleUpdateProfile}
              >
                <Input
                  type="text"
                  placeholder="Email"
                  icon="Mail"
                  inputClassName="disabled:opacity-60"
                  label="Email *"
                  wrapperClassName="mb-4"
                  disabled
                  value={state.email}
                  onChange={(e) =>
                    dispatch({ type: 'UPDATE_EMAIL', payload: e.target.value })
                  }
                />

                <Input
                  type="text"
                  placeholder="Full Name"
                  icon="Profile"
                  inputClassName="disabled:opacity-60"
                  label="Full Name *"
                  wrapperClassName="mb-4"
                  disabled={!editing}
                  value={state.name}
                  onChange={(e) =>
                    dispatch({ type: 'UPDATE_NAME', payload: e.target.value })
                  }
                />

                <Input
                  type="text"
                  inputClassName="disabled:opacity-60"
                  placeholder="Phone Number"
                  icon="Phone"
                  label="Phone Number"
                  wrapperClassName="mb-4"
                  disabled={!editing}
                  value={state.phone}
                  onChange={(e) =>
                    dispatch({ type: 'UPDATE_PHONE', payload: e.target.value })
                  }
                />

                <Input
                  type="text"
                  placeholder="Address"
                  icon="Location"
                  inputClassName="disabled:opacity-60"
                  label="Address"
                  wrapperClassName="mb-4"
                  disabled={!editing}
                  value={state.address}
                  onChange={(e) =>
                    dispatch({
                      type: 'UPDATE_ADDRESS',
                      payload: e.target.value,
                    })
                  }
                />

                <Input
                  type="text"
                  placeholder="State"
                  label="State"
                  inputClassName="disabled:opacity-60"
                  wrapperClassName="mb-4"
                  disabled={!editing}
                  value={state.state}
                  onChange={(e) =>
                    dispatch({
                      type: 'UPDATE_STATE',
                      payload: e.target.value,
                    })
                  }
                />

                <Input
                  type="text"
                  placeholder="City"
                  label="City"
                  inputClassName="disabled:opacity-60"
                  wrapperClassName="mb-4"
                  disabled={!editing}
                  value={state.city}
                  onChange={(e) =>
                    dispatch({
                      type: 'UPDATE_CITY',
                      payload: e.target.value,
                    })
                  }
                />

                <button
                  className={`flex justify-center items-center w-full h-14 rounded-xl outline-primary-10 text-lg text-white bg-action-green ${
                    editing && !verifyIfStoredProfileIsEqualToEditedProfile()
                      ? 'cursor-pointer'
                      : 'opacity-30 cursor-not-allowed'
                  }`}
                  disabled={
                    !editing || verifyIfStoredProfileIsEqualToEditedProfile()
                  }
                  type="submit"
                >
                  Update Changes
                </button>
              </form>

              <div className="ml-20">
                {storagedProfile.imageUrl ? (
                  <div className="relative">
                    <img
                      className="w-[172px] rounded-xl overflow-hidden"
                      src={storagedProfile.imageUrl}
                      alt="Profile"
                    />
                  </div>
                ) : (
                  <div className="flex justify-center items-center w-[172px] h-[172px] rounded-xl bg-[#eff1f999]">
                    <Icon name="Image" width={64} height={64} />
                  </div>
                )}
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
