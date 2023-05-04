interface ProductStatusProps {
  status: string
}

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

function ProductStatus({ status }: ProductStatusProps) {
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

export default ProductStatus
