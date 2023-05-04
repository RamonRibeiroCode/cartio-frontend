import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Input from '../../ui/Input'
import Toggle from '../../ui/Toggle'
import DatePicker from '../../ui/DatePicker'
import CurrencyInput from '../../ui/Input/CurrencyInput'
import Select from '../../ui/Select'
import Upload from '../../ui/Upload'
import { Category, CreateProductInput } from '../../../__generated__/graphql'
import { client } from '../../../lib/apollo'
import { PRODUCTS } from '../../../graphql/queries/inventory'
import { UploadPlaceholder } from '../../../assets/icons/Actions'
import Button from '../../ui/Button'
import { Action, ProductType } from '../../../hooks/useInventoryForm'

interface ProductFormProps {
  variant: 'New' | 'Edit'
  onSubmitProductForm: (createProductInput: CreateProductInput) => Promise<void>
  state: ProductType
  dispatch: React.Dispatch<Action>
  categories: Category[]
}

function ProductForm({
  variant,
  onSubmitProductForm,
  state,
  dispatch,
  categories,
}: ProductFormProps) {
  const [dateAddredChecked, setDateAddredChecked] = useState(!!state.dateAddred)
  const [dateExpiredChecked, setDateExpiredChecked] = useState(
    !!state.dateExpired
  )

  const navigate = useNavigate()

  const saveProduct = async (status: string) => {
    const additionalImagesFiles = state.additionalImages.map(
      (image) => image.file
    )

    const createProductInput = {
      name: state.name,
      listPrice: state.listPrice,
      sellingPrice: state.sellingPrice,
      quantity: state.quantity,
      description: state.description,
      categoryId: state.category?.id,
      validIn: dateAddredChecked ? state.dateAddred : undefined,
      expiresIn: dateExpiredChecked ? state.dateExpired : undefined,
      status: status,
      mainImage: state.mainImage?.file,
      additionalImages: additionalImagesFiles,
    }

    await onSubmitProductForm(createProductInput)

    navigate('/inventory')

    await client.refetchQueries({
      include: [PRODUCTS],
    })
  }

  const handleSaveProductAsDraft = async () => {
    if (!state.name) {
      return alert('Preencha o nome')
    }

    saveProduct('Unpublished')
  }

  const handleCreateProduct = async () => {
    if (
      !state.name ||
      !state.sellingPrice ||
      !state.quantity ||
      !state.category ||
      !state.description
    ) {
      return alert('Preencha todos os campos')
    }

    saveProduct('Published')
  }

  const handleAddAdditionalImage = (
    file: File,
    previewSrc: string,
    index: number
  ) => {
    const newAdditionalImages = [...state.additionalImages]

    newAdditionalImages[index] = {
      file,
      previewSrc,
      ...newAdditionalImages[index],
    }

    dispatch({ type: 'UPDATE_ADDITIONAL_IMAGES', payload: newAdditionalImages })
  }

  const handleDeleteAdditionalImage = (indexToDelete: number) => {
    const newAdditionalImages = state.additionalImages.filter(
      (_, currentIndex) => currentIndex !== indexToDelete
    )

    dispatch({ type: 'UPDATE_ADDITIONAL_IMAGES', payload: newAdditionalImages })
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-paragraph-1 font-medium text-black-60">
          {variant} Inventory Item
        </h1>

        <div className="flex">
          <Button color="black" onClick={handleSaveProductAsDraft}>
            Save as draft
          </Button>

          <Button
            color="primary"
            extraClasses="ml-6"
            onClick={handleCreateProduct}
          >
            Save & Publish
          </Button>
        </div>
      </div>

      <div className="flex flex-1">
        <div className="flex flex-1 bg-white rounded-lg px-8 py-4 mr-5">
          <div className="flex flex-col w-1/2 mr-8">
            <Input
              type="text"
              placeholder="Product Name"
              label="Product Name *"
              required
              value={state.name}
              onChange={(e) =>
                dispatch({ type: 'UPDATE_NAME', payload: e.target.value })
              }
            />

            <Select
              label="Category"
              placeholder="Select Product Category"
              selected={state.category?.name}
              options={categories.map((category) => ({
                label: category.name,
                value: category,
              }))}
              onSelect={(option) =>
                dispatch({ type: 'UPDATE_CATEGORY', payload: option })
              }
            />

            <div className="flex">
              <CurrencyInput
                prefix="R$ "
                placeholder="Selling Price"
                label="Selling Price *"
                required
                value={state.sellingPrice}
                wrapperClassName="mr-3"
                onValueChange={(values) => {
                  dispatch({
                    type: 'UPDATE_SELLING_PRICE',
                    payload: values.floatValue,
                  })
                }}
              />

              <CurrencyInput
                prefix="R$ "
                placeholder="List Price"
                label="List Price"
                required
                value={state.listPrice}
                onValueChange={(values) => {
                  dispatch({
                    type: 'UPDATE_LIST_PRICE',
                    payload: values.floatValue,
                  })
                }}
              />
            </div>

            <Input
              type="number"
              placeholder="Quantity in Stock"
              label="Quantity in Stock *"
              required
              value={state.quantity}
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE_QUANTITY',
                  payload: Number(e.target.value),
                })
              }
            />

            <div className="flex flex-col mt-6">
              <div className="flex justify-between items-center">
                <span className="text-paragraph-1 text-black-30">
                  Date Addred
                </span>

                <div className="flex items-center">
                  <span
                    className={`text-sm mr-5 ${
                      dateAddredChecked ? 'text-[#2B2F32]' : 'text-[#83898C]'
                    }`}
                  >
                    Add Date Addred
                  </span>

                  <Toggle
                    checked={dateAddredChecked}
                    onClick={() => {
                      setDateAddredChecked(!dateAddredChecked)
                    }}
                  />
                </div>
              </div>

              {dateAddredChecked && (
                <div className="flex mt-6">
                  <div className="flex flex-1 mr-2">
                    <DatePicker
                      type="date"
                      selected={state.dateAddred}
                      dateFormat="dd/MM/yyyy"
                      onChange={(date) => {
                        date &&
                          dispatch({
                            type: 'UPDATE_DATETIME_ADDRED',
                            payload: date,
                          })
                      }}
                    />
                  </div>

                  <div className="flex flex-1">
                    <DatePicker
                      type="time"
                      selected={state.dateAddred}
                      onChange={(date) => {
                        date &&
                          dispatch({
                            type: 'UPDATE_DATETIME_ADDRED',
                            payload: date,
                          })
                      }}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col mt-6">
              <div className="flex justify-between items-center">
                <span className="text-paragraph-1 text-black-30">
                  Date Expired
                </span>

                <div className="flex items-center">
                  <span
                    className={`text-sm mr-5 ${
                      dateAddredChecked ? 'text-[#2B2F32]' : 'text-[#83898C]'
                    }`}
                  >
                    Add Date Expired
                  </span>

                  <Toggle
                    checked={dateExpiredChecked}
                    onClick={() => {
                      setDateExpiredChecked(!dateExpiredChecked)
                    }}
                  />
                </div>
              </div>

              {dateExpiredChecked && (
                <div className="flex mt-6">
                  <div className="flex flex-1 mr-2">
                    <DatePicker
                      type="date"
                      selected={state.dateExpired}
                      dateFormat="dd/MM/yyyy"
                      onChange={(date) => {
                        date &&
                          dispatch({
                            type: 'UPDATE_DATETIME_EXPIRED',
                            payload: date,
                          })
                      }}
                    />
                  </div>

                  <div className="flex flex-1">
                    <DatePicker
                      type="time"
                      selected={state.dateExpired}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                      onChange={(date) => {
                        date &&
                          dispatch({
                            type: 'UPDATE_DATETIME_EXPIRED',
                            payload: date,
                          })
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col w-1/2">
            <Input
              type="text"
              tag="textarea"
              placeholder="Description"
              label="Description *"
              required
              value={state.description}
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE_DESCRIPTION',
                  payload: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="bg-white rounded-lg p-5">
          <Upload
            variant="large"
            previewSrc={state.mainImage?.previewSrc}
            handleSelectImage={(file, previewSrc) => {
              dispatch({
                type: 'UPDATE_MAIN_IMAGE',
                payload: { file, previewSrc },
              })
            }}
            handleDeleteImage={() => {
              dispatch({ type: 'UPDATE_MAIN_IMAGE', payload: undefined })
            }}
          />

          <div className="mt-3">
            <span className="text-paragraph-1 font-medium text-black-60">
              Additional Images
            </span>

            <div className="flex justify-between flex-wrap max-w-[372px] gap-y-7 mt-3">
              {[...state.additionalImages, {}]?.map((image, index) => {
                if (index >= 4) {
                  return <></>
                }

                return (
                  <Upload
                    key={index}
                    previewSrc={image.previewSrc}
                    imageUrl={image.imageUrl}
                    handleSelectImage={(file, previewSrc) =>
                      handleAddAdditionalImage(file, previewSrc, index)
                    }
                    handleDeleteImage={() => handleDeleteAdditionalImage(index)}
                  />
                )
              })}

              {state.additionalImages.length < 3 && (
                <UploadPlaceholder width={172} height={172} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductForm
