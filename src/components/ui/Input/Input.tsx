import { InputHTMLAttributes } from 'react'

import Icon from '../Icon'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  icon?: string
  wrapperClassName?: string
  inputClassName?: string
}

function Input({
  label,
  icon,
  wrapperClassName,
  inputClassName,
  ...otherProps
}: InputProps) {
  return (
    <>
      {label && (
        <label className="text-[#5E6366] text-label-1 mb-2" htmlFor={label}>
          {label}
        </label>
      )}

      <div
        className={`relative flex items-center w-full h-[52px] bg-[#eff1f999] rounded-lg ${
          wrapperClassName ?? ''
        }`}
      >
        {icon && (
          <Icon
            name={icon}
            className="absolute left-4"
            width={24}
            height={24}
          />
        )}

        <input
          id={label}
          className={`w-full h-full bg-transparent outline-primary-10 text-base text-[#5E6366] placeholder:text-[#ABAFB1] pr-4
          ${inputClassName ?? ''} ${icon ? 'pl-14' : 'pl-4'}`}
          {...otherProps}
        />
      </div>
    </>
  )
}

export default Input
