import { ButtonHTMLAttributes, ReactNode } from 'react'

import Icon from '../../ui/Icon'

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  iconName: string
}

function ActionButton({ children, iconName, ...props }: ActionButtonProps) {
  return (
    <button
      className="flex items-center rounded-[4px] border border-black-50 px-2"
      {...props}
    >
      <Icon name={iconName} width={16} height={17} />
      <span className="text-label-2 ml-2">{children}</span>
    </button>
  )
}

export default ActionButton
