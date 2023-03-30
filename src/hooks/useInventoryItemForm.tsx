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
  payload: ProductType | string | Category | number | Date | File | undefined
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
  mainImage?: File
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
      return { ...state, mainImage: action.payload as File }

    default:
      return state
  }
}

const initialState = {
  name: 'Iphone 14 Pro Max',
  category: {
    id: '9fe23c7f-862e-4e2c-8b5e-89c7d8d49e4d',
    name: 'Gadgets',
  },
  description: 'Descrição qualquer por aqui',
  listPrice: 10.99,
  sellingPrice: 10.99,
  quantity: 12,
  dateAddred: new Date(),
}

const useInventoryItemForm = (productId?: string) => {
  const [state, dispatch] = useReducer(reducer, { ...initialState })
  const { data } = useQuery<CategoriesQuery>(CATEGORIES)

  return { state, dispatch, categories: data?.categories ?? [] }
}

export { useInventoryItemForm }
