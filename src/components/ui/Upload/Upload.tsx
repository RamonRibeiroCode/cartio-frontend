import { useState } from 'react'

import Icon from '../Icon'

interface UploadProps {
  variant?: 'normal' | 'large'
  imageUrl?: string
  disabled?: boolean
  handleSelectImage: (file: File) => void
  handleDeleteImage: () => void
}

interface Target extends EventTarget {
  files: FileList
}

function Upload({
  variant = 'normal',
  imageUrl,
  disabled = false,
  handleSelectImage,
  handleDeleteImage,
}: UploadProps) {
  const [previewSrc, setPreviewSrc] = useState('')

  const handleImage = () => {
    const input = document.createElement('input')

    input.type = 'file'
    input.accept = 'image/*'

    input.onchange = async (event) => {
      const [file] = (event.target as Target).files

      const reader = new FileReader()

      reader.onload = () => setPreviewSrc(reader.result as string)
      reader.readAsDataURL(file)

      handleSelectImage(file)
    }

    input.click()
  }

  return (
    <div className="relative">
      {imageUrl || previewSrc ? (
        <>
          <img
            className={`border border-[#E1E2E9] rounded-xl overflow-hidden ${
              variant === 'large' ? 'w-[372px]' : 'w-[172px]'
            }`}
            src={previewSrc || imageUrl}
            alt="Profile"
          />
          <div className="absolute top-0 right-0 flex pt-3 pr-4">
            <button
              className="w-8 h-8 flex justify-center items-center bg-secondary-30 rounded-lg disabled:bg-black-10 disabled:opacity-60 disabled:cursor-not-allowed"
              onClick={handleImage}
              disabled={disabled}
            >
              <Icon name="Upload" width={20} height={20} />
            </button>

            <button
              className="w-8 h-8 flex justify-center items-center bg-secondary-30 rounded-lg ml-1 disabled:bg-black-10 disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={disabled}
              onClick={() => {
                setPreviewSrc('')
                handleDeleteImage()
              }}
            >
              <Icon name="Trash" width={20} height={20} />
            </button>
          </div>
        </>
      ) : (
        <button
          onClick={handleImage}
          className={`flex flex-col justify-center items-center rounded-xl bg-[#F4F5FA] cursor-pointer ${
            variant === 'large' ? 'w-[372px] h-[372px]' : 'w-[172px] h-[172px]'
          }`}
        >
          <Icon name="ImagePrimary" width={56} height={56} />

          <div className="flex items-center mt-3">
            <Icon
              name="UploadPrimary"
              width={variant === 'large' ? 20 : 17}
              height={variant === 'large' ? 20 : 17}
            />

            <span
              className={`font-medium text-primary-100 ml-2 ${
                variant === 'large' ? 'text-base' : 'text-paragraph-2'
              }`}
            >
              Upload Image
            </span>
          </div>

          {variant === 'large' && (
            <>
              <span className="text-paragraph-2 text-black-30 mt-3">
                Upload a cover image for your product.
              </span>

              <span className="text-label-1 text-black-30 mt-1">
                File Format <strong className="text-black-90">jpeg, png</strong>{' '}
                Recommened Size{' '}
                <strong className="text-black-90">600x600 (1:1)</strong>
              </span>
            </>
          )}
        </button>
      )}
    </div>
  )
}

export default Upload
