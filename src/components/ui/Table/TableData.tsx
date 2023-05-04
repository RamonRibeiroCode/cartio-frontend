import { ReactNode } from 'react'

interface TableDataProps {
  children?: ReactNode
  light?: boolean
  larger?: boolean
}

function TableData({ children, light, larger }: TableDataProps) {
  return (
    <td
      className={`text-paragraph-2 px-5 ${
        light ? 'text-black-20' : 'text-black-40'
      } ${larger ? 'py-4' : 'py-2'}`}
    >
      {children}
    </td>
  )
}

export default TableData
