import { useMutation } from '@apollo/client'
import { useState } from 'react'

import Input from '../../components/ui/Input'
import Toggle from '../../components/ui/Toggle'
import DatePicker from '../../components/ui/DatePicker'
import { CREATE_PRODUCT } from '../../graphql/mutations/product'
import { useInventoryItemForm } from '../../hooks/useInventoryItemForm'
import { MutationCreateProductArgs, Product } from '../../__generated__/graphql'

function InventoryNew() {
  const [dateAddredChecked, setDateAddredChecked] = useState(true)
  const [dateExpiredChecked, setDateExpiredChecked] = useState(false)

  const { state, dispatch } = useInventoryItemForm()
  const [createProduct] = useMutation<Product, MutationCreateProductArgs>(
    CREATE_PRODUCT
  )

  const saveProduct = async (status: string) => {
    await createProduct({
      variables: {
        createProductInput: {
          name: state.name,
          listPrice: state.listPrice,
          sellingPrice: state.sellingPrice,
          quantity: state.quantity,
          categoryId: state.category?.id,
          validIn: dateAddredChecked ? state.dateAddred : undefined,
          expiresIn: dateExpiredChecked ? state.dateExpired : undefined,
          status: status,
        },
      },
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

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-paragraph-1 font-medium text-black-60">
          New Inventory Item
        </h1>

        <div className="flex">
          <button
            className="flex items-center bg-black-90 rounded-xl py-[6px] px-5 hover:bg-black-60 active:bg-black-100"
            onClick={handleSaveProductAsDraft}
          >
            <span className="text-white text-sm">Save as draft</span>
          </button>

          <button
            className="flex items-center bg-primary-100 rounded-xl py-[6px] px-5 ml-6 hover:bg-primary-80 active:bg-primary-pressed"
            onClick={handleCreateProduct}
          >
            <span className="text-white text-sm">Save & Publish</span>
          </button>
        </div>
      </div>

      <div className="flex flex-1">
        <div className="flex w-2/3 bg-white rounded-lg px-8 py-4 mr-5">
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

            <Input
              type="text"
              placeholder="Select Product Category"
              label="Select Product Category *"
              required
              value={state.category?.name}
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE_CATEGORY',
                  payload: { id: e.target.value, name: e.target.value },
                })
              }
            />

            <div className="flex">
              <Input
                type="text"
                placeholder="Selling Price"
                label="Selling Price *"
                required
                value={state.sellingPrice}
                wrapperClassName="mr-3"
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE_SELLING_PRICE',
                    payload: Number(e.target.value),
                  })
                }
              />

              <Input
                type="text"
                placeholder="List Price"
                label="List Price"
                required
                value={state.listPrice}
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE_LIST_PRICE',
                    payload: Number(e.target.value),
                  })
                }
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

        <div className="w-1/3 bg-white rounded-lg"></div>
      </div>
    </div>
  )
}

export default InventoryNew
