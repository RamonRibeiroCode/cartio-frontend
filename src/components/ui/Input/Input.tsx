import { InputHTMLAttributes, useState } from 'react'

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
  value,
  ...otherProps
}: InputProps) {
  const [inFocus, setInFocus] = useState(false)

  return (
    <div
      className={`relative flex items-center w-full h-[52px] rounded-lg mt-5 ${
        wrapperClassName ?? ''
      }  ${inFocus ? 'bg-[#e9ecf8e6]' : 'bg-[#eff1f999]'}`}
    >
      <label
        className={`text-label-1 absolute -top-6 transition-all ${
          inFocus || value ? 'opacity-100' : 'opacity-0'
        } ${inFocus ? 'text-primary-100' : 'text-[#5E6366]'}`}
        htmlFor={label}
      >
        {label}
      </label>

      {icon && (
        <Icon name={icon} className="absolute left-4" width={24} height={24} />
      )}

      <input
        id={label}
        type="password"
        className={`w-full h-full bg-transparent outline-0 text-base text-[#5E6366] placeholder:text-[#ABAFB1] focus:border-2 focus:border-primary-10 rounded-lg pr-4
          ${inputClassName ?? ''} ${icon ? 'pl-14' : 'pl-4'}`}
        value={value}
        onFocus={() => setInFocus(true)}
        onBlur={() => setInFocus(false)}
        {...otherProps}
      />
    </div>
  )
}

export default Input
