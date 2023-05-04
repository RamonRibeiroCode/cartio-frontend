import { useMutation } from '@apollo/client'

import { CREATE_PRODUCT } from '../../graphql/mutations/inventory'
import ProductForm from '../../components/inventory/ProductForm/ProductForm'
import {
  CreateProductInput,
  MutationCreateProductArgs,
  Product,
} from '../../__generated__/graphql'
import { useInventoryForm } from '../../hooks/useInventoryForm'

function InventoryNew() {
  const { state, dispatch, categories } = useInventoryForm()

  const [createProduct] = useMutation<Product, MutationCreateProductArgs>(
    CREATE_PRODUCT
  )

  const onSubmitProductForm = async (
    createProductInput: CreateProductInput
  ) => {
    await createProduct({
      variables: {
        createProductInput,
      },
    })
  }

  return (
    <ProductForm
      variant="New"
      onSubmitProductForm={onSubmitProductForm}
      state={state}
      dispatch={dispatch}
      categories={categories}
    />
  )
}

export default InventoryNew
