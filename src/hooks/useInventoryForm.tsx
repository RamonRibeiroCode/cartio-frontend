import { useLazyQuery, useQuery } from '@apollo/client'
import { useCallback, useEffect, useReducer, useState } from 'react'

import {
  CATEGORIES,
  CategoriesQuery,
  PRODUCT,
  ProductQuery,
} from '../graphql/queries/inventory'
import { Category } from '../__generated__/graphql'

export interface Action {
  type:
    | 'SET_PRODUCT'
    | 'UPDATE_NAME'
    | 'UPDATE_CATEGORY'
    | 'UPDATE_SELLING_PRICE'
    | 'UPDATE_LIST_PRICE'
    | 'UPDATE_QUANTITY'
    | 'UPDATE_DESCRIPTION'
    | 'UPDATE_DATETIME_ADDRED'
    | 'UPDATE_DATETIME_EXPIRED'
    | 'UPDATE_MAIN_IMAGE'
    | 'UPDATE_ADDITIONAL_IMAGES'
  payload:
    | ProductType
    | string
    | Category
    | number
    | Date
    | Image
    | Image[]
    | undefined
}

export interface ProductType {
  name: string
  category?: Category
  sellingPrice?: number
  listPrice?: number
  quantity?: number
  description: string
  dateAddred?: Date
  dateExpired?: Date
  mainImage?: Image
  additionalImages: Image[]
}

const reducer = (state: ProductType, action: Action) => {
  switch (action.type) {
    case 'SET_PRODUCT':
      return { ...(action.payload as ProductType) }

    case 'UPDATE_NAME':
      return { ...state, name: action.payload as string }

    case 'UPDATE_CATEGORY':
      return { ...state, category: action.payload as Category }

    case 'UPDATE_SELLING_PRICE':
      return { ...state, sellingPrice: action.payload as number }

    case 'UPDATE_LIST_PRICE':
      return { ...state, listPrice: action.payload as number }

    case 'UPDATE_QUANTITY':
      return { ...state, quantity: action.payload as number }

    case 'UPDATE_DESCRIPTION':
      return { ...state, description: action.payload as string }

    case 'UPDATE_DATETIME_ADDRED':
      return { ...state, dateAddred: action.payload as Date }

    case 'UPDATE_DATETIME_EXPIRED':
      return { ...state, dateExpired: action.payload as Date }

    case 'UPDATE_MAIN_IMAGE':
      return { ...state, mainImage: action.payload as Image }

    case 'UPDATE_ADDITIONAL_IMAGES':
      return { ...state, additionalImages: action.payload as Image[] }

    default:
      return state
  }
}

interface Image {
  file?: File
  previewSrc?: string
  imageUrl?: string
}

const initialState = {
  name: '',
  category: undefined,
  description: '',
  listPrice: undefined,
  sellingPrice: undefined,
  quantity: undefined,
  dateAddred: new Date(),
  additionalImages: [],
}

const useInventoryForm = (productId?: string) => {
  const [state, dispatch] = useReducer(reducer, { ...initialState })
  const { data } = useQuery<CategoriesQuery>(CATEGORIES)
  const [getProduct] = useLazyQuery<ProductQuery>(PRODUCT)
  const [editFormIsLoading, setEditFormIsLoading] = useState(true)

  const getInitialProduct = useCallback(async () => {
    const productQuery = await getProduct({
      variables: {
        id: productId,
      },
    })

    if (productQuery.data?.product) {
      const {
        name,
        description,
        category,
        validIn,
        expiresIn,
        listPrice,
        sellingPrice,
        quantity,
        additionalImageUrls,
        mainImageUrl,
      } = productQuery.data.product

      dispatch({
        type: 'SET_PRODUCT',
        payload: {
          name,
          description,
          category,
          dateAddred: validIn ? new Date(validIn) : undefined,
          dateExpired: expiresIn ? new Date(expiresIn) : undefined,
          listPrice,
          sellingPrice,
          quantity,
          mainImage: {
            previewSrc: mainImageUrl,
          },
          additionalImages: additionalImageUrls.map((imageUrl) => ({
            previewSrc: imageUrl,
          })),
        } as ProductType,
      })

      setEditFormIsLoading(false)
    }
  }, [getProduct, productId])

  useEffect(() => {
    getInitialProduct()
  }, [getInitialProduct])

  return {
    state,
    dispatch,
    categories: data?.categories ?? [],
    editFormIsLoading,
  }
}

export { useInventoryForm }
