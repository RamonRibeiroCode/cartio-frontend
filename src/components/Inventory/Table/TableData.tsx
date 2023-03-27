import { ReactNode } from 'react'

interface TableDataProps {
  children?: ReactNode
  light?: boolean
}

function TableData({ children, light }: TableDataProps) {
  return (
    <td
      className={`py-2 text-paragraph-2  ${
        light ? 'text-black-20' : 'text-black-40'
      }`}
    >
      {children}
    </td>
  )
}

export default TableData
