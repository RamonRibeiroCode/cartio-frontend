import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'

import Icon from '../../components/ui/Icon'
import { PRODUCTS, ProductsQuery } from '../../graphql/queries/inventory'
import { formatPrice, padWithZeroOnStart } from '../../helpers/format'
import productImg from '../../assets/product-1.jpg'

const getColorsForStatus = (status: string) => {
  switch (status) {
    case 'Expired':
      return 'bg-[#cc5f5f33] text-action-red'

    case 'Unpublished':
      return 'bg-secondary-30 text-black-100'

    case 'Published':
      return 'bg-[#5570f129] text-primary-100'

    default:
      return 'bg-[#5570f129] text-primary-100'
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
    (product) => product.quantity <= 3
  ).length

  const expiredProductsLength = products.filter(
    (product) => product.status === 'Expired'
  ).length

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-black-60 font-medium text-paragraph-1">
          Inventory Summary
        </h1>

        <Link
          className="flex items-center bg-primary-100 rounded-xl py-[6px] px-5"
          to="/inventory/new"
        >
          <Icon name="Plus" width={24} height={24} />

          <span className="ml-2 text-white text-sm">Add a New Product</span>
        </Link>
      </div>

      <div className="flex mb-5">
        <div className="flex-1 bg-primary-100 rounded-xl py-3 px-4 mr-5">
          <div className="flex justify-center items-center w-9 h-9 bg-primary-80 rounded-lg mb-8">
            <Icon name="Folder" width={20} height={20} />
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
                <Icon name="Search" width={20} height={20} />
              </button>
              <input
                className="pl-4 flex w-full border-none outline-0 bg-transparent text-xs text-black-60 placeholder:text-[#ABAFB1]"
                type="text"
                placeholder="Search"
              />
            </div>

            <div className="flex gap-x-3">
              <button className="flex items-center rounded-[4px] border border-black-50 px-2">
                <Icon name="Filter" width={16} height={17} />
                <span className="text-label-2 ml-2">Filter</span>
              </button>

              <button className="flex items-center rounded-[4px] border border-black-50 px-2">
                <Icon name="Date" width={16} height={17} />
                <span className="text-label-2 ml-2">Filter</span>
              </button>

              <button className="flex items-center rounded-[4px] border border-black-50 px-2">
                <Icon name="Share" width={16} height={17} />
                <span className="text-label-2 ml-2">Share</span>
              </button>

              <div className="flex items-center rounded-[4px] border border-black-50 px-2 cursor-pointer">
                <span className="text-label-2 mr-2">Bulk Action</span>
                <Icon name="ArrowDown" width={16} height={16} />
              </div>
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
            <th className="text-left py-4 text-sm text-black-90">
              Product Name
            </th>
            <th className="text-left py-4 text-sm text-black-90">Category</th>
            <th className="text-left py-4 text-sm text-black-90">Unit Price</th>
            <th className="text-left py-4 text-sm text-black-90">In-Stock</th>
            <th className="text-left py-4 text-sm text-black-90">Discount</th>
            <th className="text-left py-4 text-sm text-black-90">
              Total Value
            </th>
            <th className="text-left py-4 text-sm text-black-90">Action</th>
            <th className="text-left py-4 text-sm text-black-90">Status</th>
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
              } = product

              return (
                <tr key={id}>
                  <td className="py-2">
                    <div
                      className="w-6 h-6 rounded-lg border border-[#CFD3D4] cursor-pointer"
                      onClick={() => console.log('SELECT ALL TODO')}
                    />
                  </td>

                  <td className="py-2">
                    <img src={productImg} alt="" />
                  </td>

                  <td className="py-2">
                    <span className="text-paragraph-2 text-black-40">
                      {name}
                    </span>
                  </td>

                  <td className="py-2">
                    <span className="text-paragraph-2 text-black-40">
                      {category.name}
                    </span>
                  </td>

                  <td className="py-2">
                    <span className="text-paragraph-2 text-black-40 text-right">
                      {formatPrice(sellingPrice)}
                    </span>
                  </td>

                  <td className="py-2">
                    <span
                      className={`text-paragraph-2  ${
                        quantity ? 'text-black-40' : 'text-black-20'
                      }`}
                    >
                      {quantity || 'Out of Stock'}
                    </span>
                  </td>

                  <td className="py-2">
                    <span className="text-paragraph-2 text-black-40">
                      {formatPrice(listPrice - sellingPrice)}
                    </span>
                  </td>

                  <td className="py-2">
                    <span className="text-paragraph-2 text-black-40">
                      {formatPrice(sellingPrice * quantity)}
                    </span>
                  </td>

                  <td className="py-2">
                    {status !== 'Expired' && (
                      <div className="flex w-fit bg-[#5e636614] py-1 px-3 rounded-md text-paragraph-2 text-black-30 cursor-pointer">
                        <span className="mr-1">
                          {status.substring(0, status.length - 2)}
                        </span>

                        <Icon name="ArrowDown" width={16} height={16} />
                      </div>
                    )}
                  </td>

                  <td className="py-2">
                    <span
                      className={`text-paragraph-2 py-1 px-3 rounded-md ${getColorsForStatus(
                        status
                      )}`}
                    >
                      {status}
                    </span>
                  </td>
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
