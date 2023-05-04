import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: keyof Variants
  extraClasses?: string
}

interface Variants {
  black: string
  primary: string
  danger: string
}

const variants: Variants = {
  black: 'bg-black-80 hover:bg-black-100 text-sm text-white',
  primary: 'bg-primary-100 hover:bg-primary-80 text-sm text-white',
  danger: 'bg-action-red text-sm text-white',
}

function Button({ color, extraClasses, ...buttonProps }: ButtonProps) {
  return (
    <button
      className={`flex justify-center items-center h-9 rounded-xl px-5 active:shadow-pressed ${variants[color]} ${extraClasses}`}
      {...buttonProps}
    >
      {buttonProps.children}
    </button>
  )
}

export default Button
