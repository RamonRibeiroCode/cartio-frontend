import { useMutation } from '@apollo/client'
import { useParams } from 'react-router-dom'

import { UPDATE_PRODUCT } from '../../graphql/mutations/inventory'
import ProductForm from '../../components/inventory/ProductForm/ProductForm'
import {
  CreateProductInput,
  MutationUpdateProductArgs,
  Product,
} from '../../__generated__/graphql'
import { useInventoryForm } from '../../hooks/useInventoryForm'

function InventoryEdit() {
  const params = useParams()
  const { state, dispatch, categories, editFormIsLoading } = useInventoryForm(
    params.id
  )
  const [updateProduct] = useMutation<Product, MutationUpdateProductArgs>(
    UPDATE_PRODUCT
  )

  const onSubmitProductForm = async (
    updateProductInput: CreateProductInput
  ) => {
    const { additionalImages, mainImage, ...nonImageValues } =
      updateProductInput

    // TODO: Update images
    additionalImages
    mainImage

    await updateProduct({
      variables: {
        id: params.id as string,
        updateProductInput: {
          ...nonImageValues,
        },
      },
    })
  }

  if (editFormIsLoading || !params.id) {
    return null
  }

  return (
    <ProductForm
      variant="Edit"
      onSubmitProductForm={onSubmitProductForm}
      state={state}
      dispatch={dispatch}
      categories={categories}
    />
  )
}

export default InventoryEdit
