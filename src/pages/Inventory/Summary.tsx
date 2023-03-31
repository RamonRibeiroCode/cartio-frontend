import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'

import Icon from '../../components/ui/Icon'
import { PRODUCTS, ProductsQuery } from '../../graphql/queries/inventory'
import { formatPrice, padWithZeroOnStart } from '../../helpers/format'
import TableHead from '../../components/Inventory/Table/TableHead'
import TableData from '../../components/Inventory/Table/TableData'
import ActionButton from '../../components/Inventory/Table/ActionButton'
import { ArrowDown, Folder } from '../../assets/icons/General'
import { Plus, Search } from '../../assets/icons/Actions'

export const getColorsForStatus = (status: string) => {
  switch (status) {
    case 'Expired':
      return 'bg-action-red-transparent text-action-red'

    case 'Unpublished':
      return 'bg-secondary-30 text-black-100'

    case 'Published':
      return 'bg-primary-transparent text-primary-100'

    default:
      return 'bg-primary-transparent text-primary-100'
  }
}

function InventorySummary() {
  const { data } = useQuery<ProductsQuery>(PRODUCTS)

  if (!data) {
    return null
  }

  const { products } = data

  const productsLength = products.length

  const activeProductsLength = products.filter(
    (product) => product.status === 'Published'
  ).length

  const activePercentage = (activeProductsLength / productsLength) * 100

  const productsWithLowStock = products.filter(
    (product) => Number(product.quantity) <= 5
  ).length

  const expiredProductsLength = products.filter(
    (product) => product.status === 'Expired'
  ).length

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-paragraph-1 font-medium text-black-60">
          Inventory Summary
        </h1>

        <Link
          className="flex items-center bg-primary-100 rounded-xl py-[6px] px-5 hover:bg-primary-80 active:bg-primary-pressed"
          to="/inventory/new"
        >
          <Plus width={24} height={24} color="#FFFFFF" />

          <span className="ml-2 text-white text-sm">Add a New Product</span>
        </Link>
      </div>

      <div className="flex mb-5">
        <div className="flex-1 bg-primary-100 rounded-xl py-3 px-4 mr-5">
          <div className="flex justify-center items-center w-9 h-9 bg-primary-80 rounded-lg mb-8">
            <Folder width={20} height={20} color="#FFFFFF" />
          </div>

          <div className="flex">
            <div className="flex-1 flex flex-col gap-2">
              <span className="text-paragraph-2 text-white">All Products</span>

              <span className="text-sub-heading-3 font-medium text-white">
                {padWithZeroOnStart(productsLength)}
              </span>
            </div>

            <div className="flex-1 flex flex-col gap-2">
              <span className="text-paragraph-2 text-white">Active</span>

              <div className="flex items-center">
                <span className="text-sub-heading-3 font-medium text-white">
                  {padWithZeroOnStart(activeProductsLength)}
                </span>

                <span className="text-label-1 text-primary-10 ml-2">
                  {Number.isNaN(activePercentage)
                    ? '0'
                    : activePercentage.toFixed(2)}
                  %
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-xl py-3 px-4">
          <div className="flex justify-center items-center w-9 h-9 bg-secondary-30 rounded-lg mb-8">
            <Icon name="Customers" width={20} height={20} />
          </div>

          <div className="flex">
            <div className="flex-1 flex flex-col gap-2">
              <span className="text-paragraph-2 text-action-red">
                Low Stock Alert
              </span>

              <span className="text-sub-heading-3 font-medium text-black-60">
                {padWithZeroOnStart(productsWithLowStock)}
              </span>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <span className="text-paragraph-2 text-black-30">Expired</span>

              <span className="text-sub-heading-3 font-medium text-black-60">
                {padWithZeroOnStart(expiredProductsLength)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-xl p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-black-60">Inventory Items</h2>

          <div className="flex h-8">
            <div className="flex items-center w-56 h-full rounded-[4px] border border-black-10 p-2 mr-2">
              <button>
                <Search width={20} height={20} />
              </button>
              <input
                className="pl-4 flex w-full border-none outline-0 bg-transparent text-xs text-black-60 placeholder:text-[#ABAFB1]"
                type="text"
                placeholder="Search"
              />
            </div>

            <div className="flex gap-x-3">
              <ActionButton iconName="Filter">Filter</ActionButton>

              <ActionButton iconName="Date">Filter</ActionButton>

              <ActionButton iconName="Share">Share</ActionButton>

              <button className="flex items-center rounded-[4px] border border-black-50 px-2">
                <span className="text-label-2 mr-2">Bulk Action</span>
                <ArrowDown width={16} height={16} color="#5E6366" />
              </button>
            </div>
          </div>
        </div>

        <table className="w-full mt-5">
          <thead className="border-[#E1E2E9] border-t border-b">
            <th>
              <div
                className="w-6 h-6 rounded-lg border border-[#CFD3D4] cursor-pointer"
                onClick={() => console.log('SELECT ALL TODO')}
              />
            </th>

            <th>
              <div className="opacity-0 cursor-default">Img</div>
            </th>
            <TableHead>Product Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Unit Price</TableHead>
            <TableHead>In-Stock</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Total Value</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Status</TableHead>
          </thead>
          <tbody>
            {products.map((product) => {
              const {
                id,
                name,
                category,
                sellingPrice,
                quantity,
                listPrice,
                status,
                mainImageUrl,
              } = product

              return (
                <tr key={id}>
                  <TableData>
                    <div
                      className="w-6 h-6 rounded-lg border border-[#CFD3D4] cursor-pointer"
                      onClick={() => console.log('SELECT ALL TODO')}
                    />
                  </TableData>

                  <TableData>
                    <Link to={`/inventory/${id}`}>
                      {mainImageUrl ? (
                        <img
                          src={mainImageUrl}
                          alt=""
                          className="w-9 h-9 rounded-lg border border-[#F1F3F9]"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-lg border border-[#F1F3F9]" />
                      )}
                    </Link>
                  </TableData>

                  <TableData>
                    <Link to={`/inventory/${id}`}>{name}</Link>
                  </TableData>

                  <TableData>{category.name}</TableData>

                  <TableData>{formatPrice(sellingPrice)}</TableData>

                  <TableData light={!quantity}>
                    {quantity || 'Out of Stock'}
                  </TableData>

                  <TableData>
                    {formatPrice(Number(listPrice) - Number(sellingPrice))}
                  </TableData>

                  <TableData>
                    {formatPrice(Number(sellingPrice) * Number(quantity))}
                  </TableData>

                  <TableData>
                    {status !== 'Expired' && (
                      <div className="flex w-fit bg-[#5e636614] py-1 px-3 rounded-md text-paragraph-2 text-black-30 cursor-pointer">
                        <span className="mr-1">
                          {status.substring(0, status.length - 2)}
                        </span>

                        <ArrowDown width={16} height={16} color="#5E6366" />
                      </div>
                    )}
                  </TableData>

                  <TableData>
                    <span
                      className={`text-paragraph-2 py-1 px-3 rounded-md ${getColorsForStatus(
                        status
                      )}`}
                    >
                      {status}
                    </span>
                  </TableData>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default InventorySummary
