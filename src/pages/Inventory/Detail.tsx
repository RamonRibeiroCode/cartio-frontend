import { useQuery } from '@apollo/client'
import { useParams, useNavigate } from 'react-router-dom'

import { PRODUCT, ProductQuery } from '../../graphql/queries/inventory'
import Button from '../../components/ui/Button'
import { OrderStatus, ProductStatus } from '../../components/ui/Status'
import LogoSolid from '../../assets/icons/General/LogoSolid'
import Icon from '../../components/ui/Icon/Icon'
import TableData from '../../components/ui/Table/TableData'
import TableHead from '../../components/ui/Table/TableHead'
import { Search } from '../../assets/icons/Actions'
import ActionButton from '../../components/ui/Table/ActionButton'

const orders = [
  {
    id: 'uuid()',
    createdAt: '12 Aug 2022 - 12:25 am',
    type: 'delivery',
    price: 2500.0,
    quantity: 2,
    status: 'Completed',
  },
]

function InventoryDetail() {
  const navigate = useNavigate()
  const params = useParams()
  const { data } = useQuery<ProductQuery>(PRODUCT, {
    variables: { id: params.id },
  })

  if (!data) {
    return null
  }

  const { product } = data

  const { mainImageUrl, status, sellingPrice, quantity } = product

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center">
          <h1 className="text-paragraph-1 font-medium text-black-60">
            {product.name}
          </h1>

          <div className="mx-6">
            <span className="text-paragraph-1 font-medium text-black-60">
              Date Added{' '}
            </span>
            <span className="text-paragraph-1 font-medium text-black-30">
              {product.createdAt}
            </span>
          </div>

          <div>
            <span className="text-paragraph-1 font-medium text-black-60">
              Product URL{' '}
            </span>
            <span className="text-paragraph-1 font-medium text-black-30">
              {import.meta.env.VITE_STORE_DOMAIN}/{product.slug}
            </span>
          </div>
        </div>

        <div className="flex items-center">
          <Button
            color="black"
            extraClasses="mr-6"
            onClick={() => navigate(`/inventory/${params.id}/edit`)}
          >
            Edit Product
          </Button>

          <Button color="danger">Unpublish Product</Button>
        </div>
      </div>

      <div className="flex h-36">
        <div className="flex w-1/2 mr-5">
          <div className="w-36 h-full bg-white rounded-xl overflow-hidden mr-5">
            <img src={mainImageUrl ?? undefined} alt="" />
          </div>

          <div className="flex flex-col justify-between flex-1 h-full bg-white rounded-xl py-3 px-4">
            <div className="flex justify-between items-center">
              <span className="text-label-1 text-black-30">
                Last Order{' '}
                <span className="text-label-1 text-black-90">12 Sept 2022</span>
              </span>

              <ProductStatus status={status} />
            </div>

            <div className="flex">
              <div className="flex-1">
                <p className="text-label-1 text-black-30 mb-2">Price</p>
                <p className="text-paragraph-2 text-black-60">
                  R$ {sellingPrice}
                </p>
              </div>

              <div className="flex-1">
                <p className="text-label-1 text-black-30 mb-2">In-Stock</p>
                <p className="text-paragraph-2 text-black-60">{quantity}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-1/2 h-full bg-white rounded-xl py-3 px-4">
          <div className="flex flex-col justify-between">
            <div className="flex justify-center items-center w-9 h-9 bg-primary-transparent rounded-lg">
              <LogoSolid />
            </div>

            <div>
              <p className="text-paragraph-2 text-black-30 mb-2">
                Total Orders
              </p>
              <p className="text-sub-heading-3 font-medium text-black-60">
                R$ 50.000,00
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-36 mt-5">
        <div className="flex w-1/2 bg-white rounded-xl py-3 px-4 mr-5">
          <div className="flex flex-col justify-between flex-1">
            <div className="flex justify-center items-center w-9 h-9 bg-secondary-30 rounded-lg">
              <Icon name="Orders" width={20} height={20} />
            </div>

            <div className="flex">
              <div className="flex-1">
                <p className="text-paragraph-2 text-black-30 mb-2">
                  All Orders
                </p>
                <p className="text-sub-heading-3 font-medium text-black-60">
                  1
                </p>
              </div>

              <div className="flex-1">
                <p className="text-paragraph-2 text-black-30 mb-2">Pending</p>
                <p className="text-sub-heading-3 font-medium text-black-60">
                  0
                </p>
              </div>

              <div className="flex-1">
                <p className="text-paragraph-2 text-black-30 mb-2">Completed</p>
                <p className="text-sub-heading-3 font-medium text-black-60">
                  1
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-1/2 bg-white rounded-xl py-3 px-4">
          <div className="flex flex-col justify-between flex-1">
            <div className="flex justify-center items-center w-9 h-9 bg-secondary-30 rounded-lg">
              <Icon name="Orders" width={20} height={20} />
            </div>

            <div className="flex">
              <div className="flex-1">
                <p className="text-paragraph-2 text-black-30 mb-2">Canceled</p>
                <p className="text-sub-heading-3 font-medium text-black-60">
                  0
                </p>
              </div>

              <div className="flex-1">
                <p className="text-paragraph-2 text-black-30 mb-2">Returned</p>
                <p className="text-sub-heading-3 font-medium text-black-60">
                  0
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-xl py-5 mt-5">
        <div className="flex items-center justify-between px-5">
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
            </div>
          </div>
        </div>

        <table className="w-full mt-5">
          <thead className="px-5">
            <TableHead>Order Date</TableHead>
            <TableHead>Order Type</TableHead>
            <TableHead>Unit Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Order Total</TableHead>
            <TableHead>Status</TableHead>
          </thead>
          <tbody>
            {orders.map((order) => {
              const { id, createdAt, type, price, quantity, status } = order

              return (
                <tr key={id} className="hover:bg-neutral-50">
                  <TableData larger>{createdAt}</TableData>

                  <TableData larger>
                    {type === 'delivery' ? 'Home Delivery' : 'Pickup in Point'}
                  </TableData>

                  <TableData larger>R${price}</TableData>

                  <TableData larger>{quantity}</TableData>

                  <TableData larger>R${quantity * price}</TableData>

                  <TableData larger>
                    <OrderStatus status={status} />
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

export default InventoryDetail
