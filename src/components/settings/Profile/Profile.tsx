import Input from '../../../components/ui/Input'
import { useProfile } from '../../../hooks/useProfile'
import Upload from '../../ui/Upload'

function ProfileForm() {
  const {
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
  } = useProfile()

  return (
    <>
      <div className="flex justify-between items-center">
        <p className="text-sub-heading-3 text-black-60">Profile Settings</p>

        <button
          className={`flex justify-center items-center w-full max-w-[180px] h-14 rounded-xl outline-primary-10 mt-11 text-lg text-white ${
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
            label="Email *"
            required
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
            label="Full Name *"
            required
            disabled={!editing}
            value={state.name}
            onChange={(e) =>
              dispatch({ type: 'UPDATE_NAME', payload: e.target.value })
            }
          />

          <Input
            type="text"
            placeholder="Phone Number"
            icon="Phone"
            label="Phone Number"
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
            label="Address"
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
            disabled={!editing || verifyIfStoredProfileIsEqualToEditedProfile()}
            type="submit"
          >
            Update Changes
          </button>
        </form>

        <div className="ml-20">
          <Upload
            imageUrl={storagedProfile.imageUrl}
            disabled={updating || deleting}
            previewSrc={state.imagePreview}
            handleSelectImage={handleSelectImageAndUpload}
            handleDeleteImage={handleDeleteProfilePicture}
          />
        </div>
      </div>
    </>
  )
}

export default ProfileForm
