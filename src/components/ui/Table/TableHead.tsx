import { ReactNode } from 'react'

interface TableHeadProps {
  children?: ReactNode
}

function TableHead({ children }: TableHeadProps) {
  return (
    <th className="text-left py-4 px-5 text-sm font-semibold text-black-90 border-[#E1E2E9] border-t border-b">
      {children}
    </th>
  )
}

export default TableHead
