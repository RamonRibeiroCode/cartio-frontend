import Input from '../../../components/ui/Input'
import Icon from '../../../components/ui/Icon'
import { useProfile } from '../../../hooks/useProfile'

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
    previewSrc,
    updating,
    deleteProfilePicture,
    deleting,
  } = useProfile()

  return (
    <>
      <div className="flex justify-between items-center">
        <p className="text-sub-heading-3 text-black-60">Profile Settings</p>

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
            required
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
            required
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
            disabled={!editing || verifyIfStoredProfileIsEqualToEditedProfile()}
            type="submit"
          >
            Update Changes
          </button>
        </form>

        <div className="ml-20 relative">
          {storagedProfile.imageUrl || previewSrc ? (
            <img
              className="w-[172px] rounded-xl overflow-hidden"
              src={previewSrc || storagedProfile.imageUrl}
              alt="Profile"
            />
          ) : (
            <div className="flex justify-center items-center w-[172px] h-[172px] rounded-xl bg-[#eff1f999]">
              <Icon name="Image" width={64} height={64} />
            </div>
          )}

          <div className="absolute top-0 right-0 flex pt-3 pr-4">
            <button
              className="w-8 h-8 flex justify-center items-center bg-secondary-30 rounded-lg disabled:bg-black-10 disabled:opacity-60 disabled:cursor-not-allowed"
              onClick={handleSelectImageAndUpload}
              disabled={updating || deleting}
            >
              <Icon name="Upload" width={20} height={20} />
            </button>

            <button
              className="w-8 h-8 flex justify-center items-center bg-secondary-30 rounded-lg ml-1 disabled:bg-black-10 disabled:opacity-60 disabled:cursor-not-allowed"
              onClick={deleteProfilePicture}
              disabled={updating || deleting}
            >
              <Icon name="Trash" width={20} height={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileForm
