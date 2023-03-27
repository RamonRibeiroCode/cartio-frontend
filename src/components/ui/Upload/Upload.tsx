import Icon from '../Icon'

interface UploadProps {
  imageUrl?: string
  previewSrc: string
  updating: boolean
  deleting: boolean
  handleSelectImageAndUpload: () => void
  handleDeleteImage: () => void
}

function Upload({
  imageUrl,
  previewSrc,
  updating,
  deleting,
  handleSelectImageAndUpload,
  handleDeleteImage,
}: UploadProps) {
  return (
    <div className="relative">
      {imageUrl || previewSrc ? (
        <>
          <img
            className="w-[172px] rounded-xl overflow-hidden"
            src={previewSrc || imageUrl}
            alt="Profile"
          />
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
              onClick={handleDeleteImage}
              disabled={updating || deleting}
            >
              <Icon name="Trash" width={20} height={20} />
            </button>
          </div>
        </>
      ) : (
        <button
          onClick={handleSelectImageAndUpload}
          className="flex flex-col justify-center items-center w-[172px] h-[172px] rounded-xl bg-[#eff1f999] cursor-pointer"
        >
          <Icon name="ImagePrimary" width={56} height={56} />

          <div className="flex mt-3">
            <Icon name="UploadPrimary" width={17} height={16} />

            <span className="text-paragraph-2 font-medium text-primary-100 ml-2">
              Upload Image
            </span>
          </div>
        </button>
      )}
    </div>
  )
}

export default Upload
