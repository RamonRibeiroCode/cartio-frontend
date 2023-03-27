import { ReactNode } from 'react'

interface TableHeadProps {
  children?: ReactNode
}

function TableHead({ children }: TableHeadProps) {
  return (
    <th className="text-left py-4 text-sm font-semibold text-black-90">
      {children}
    </th>
  )
}

export default TableHead
