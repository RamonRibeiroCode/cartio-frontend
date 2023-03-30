import { FormEvent, useEffect, useReducer, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'

import {
  UPDATE_USER,
  UpdateUserResponse,
  UPDATE_PROFILE_PICTURE,
  DELETE_PROFILE_PICTURE,
} from '../graphql/mutations/user'
import { PROFILE, ProfileQuery } from '../graphql/queries/user'
import { useAuth } from '../contexts/auth'
import {
  MutationUpdateProfilePictureArgs,
  MutationUpdateUserArgs,
} from '../__generated__/graphql'

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

const useProfile = () => {
  const { data } = useQuery<ProfileQuery>(PROFILE)

  const [updateUser] = useMutation<UpdateUserResponse, MutationUpdateUserArgs>(
    UPDATE_USER
  )

  const [mutateUpdateProfilePicture, { loading: updating }] = useMutation<
    { imageUrl: string },
    MutationUpdateProfilePictureArgs
  >(UPDATE_PROFILE_PICTURE)

  const [mutateDeleteProfilePicture, { loading: deleting }] = useMutation(
    DELETE_PROFILE_PICTURE
  )

  const { handleUpdateUserAuthenticated } = useAuth()
  const [editing, setEditing] = useState(false)
  const [storagedProfile, setStoragedProfile] = useState({} as ProfileType)
  const [state, dispatch] = useReducer(reducer, { ...initialState })

  const handleCancelUpdate = () => {
    dispatch({ type: 'SET_INITIAL_PROFILE', payload: storagedProfile })
  }

  const handleUpdateProfile = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setEditing(false)
    setStoragedProfile(state)

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

  const handleSelectImageAndUpload = async (file: File) => {
    await mutateUpdateProfilePicture({
      variables: {
        file: file,
      },
    })
  }

  const handleDeleteProfilePicture = async () => {
    setStoragedProfile((prevUser) => ({ ...prevUser, imageUrl: undefined }))

    await mutateDeleteProfilePicture()
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

      setStoragedProfile(profile)

      dispatch({ type: 'SET_INITIAL_PROFILE', payload: profile })
    }
  }, [data])

  return {
    editing,
    setEditing,
    handleCancelUpdate,
    handleUpdateProfile,
    state,
    dispatch,
    verifyIfStoredProfileIsEqualToEditedProfile,
    storagedProfile,
    handleSelectImageAndUpload,
    updating,
    handleDeleteProfilePicture,
    deleting,
  }
}

export { useProfile }
