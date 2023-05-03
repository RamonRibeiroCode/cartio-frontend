import { useQuery } from '@apollo/client'
import { useReducer } from 'react'

import { CATEGORIES, CategoriesQuery } from '../graphql/queries/inventory'
import { Category } from '../__generated__/graphql'

interface Action {
  type:
    | 'SET_INITIAL_PROFILE'
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

interface ProductType {
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
    case 'SET_INITIAL_PROFILE':
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
  name: 'Iphone 14 Pro Max',
  category: {
    id: 'af87eebc-f23c-4645-822d-07c733130e28',
    name: 'Gadgets',
  },
  description: 'Descrição qualquer por aqui',
  listPrice: 10.99,
  sellingPrice: 10.99,
  quantity: 12,
  dateAddred: new Date(),
  additionalImages: [],
}

const useInventoryItemForm = (productId?: string) => {
  const [state, dispatch] = useReducer(reducer, { ...initialState })
  const { data } = useQuery<CategoriesQuery>(CATEGORIES)

  return { state, dispatch, categories: data?.categories ?? [] }
}

export { useInventoryItemForm }
