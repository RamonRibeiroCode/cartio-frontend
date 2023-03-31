import { ButtonHTMLAttributes, ReactNode } from 'react'

import {
  ActionButtonIcons,
  getActionButtonIconByName,
} from '../../../helpers/icons'

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  iconName: ActionButtonIcons
}

function ActionButton({ children, iconName, ...props }: ActionButtonProps) {
  return (
    <button
      className="flex items-center rounded-[4px] border border-black-50 px-2"
      {...props}
    >
      {getActionButtonIconByName(iconName)}
      <span className="text-label-2 ml-2">{children}</span>
    </button>
  )
}

export default ActionButton
