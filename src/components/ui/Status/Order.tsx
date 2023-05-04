interface OrderStatusProps {
  status: string
}

export const getColorsForStatus = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'bg-action-green-transparent text-action-green'

    default:
      return 'bg-action-green-transparent text-action-green'
  }
}

function OrderStatus({ status }: OrderStatusProps) {
  return (
    <span
      className={`text-paragraph-2 py-1 px-3 rounded-md ${getColorsForStatus(
        status
      )}`}
    >
      {status}
    </span>
  )
}

export default OrderStatus
