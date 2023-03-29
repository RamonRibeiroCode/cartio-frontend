import React, { InputHTMLAttributes, useState } from 'react'

import Icon from '../Icon'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  icon?: string
  wrapperClassName?: string
  tag?: 'input' | 'textarea'
}

function Input({
  label,
  icon,
  wrapperClassName,
  value,
  tag = 'input',
  ...otherProps
}: InputProps) {
  const [inFocus, setInFocus] = useState(false)

  const input = React.createElement(tag, {
    id: label,
    className: `w-full h-full bg-transparent outline-0 text-base text-[#5E6366] placeholder:text-[#ABAFB1] focus:border-2 focus:border-primary-10 rounded-lg pr-4 disabled:opacity-60
      ${icon ? 'pl-14' : 'pl-4'} ${
      tag === 'textarea' ? 'py-4 min-h-[152px]' : ''
    }`,
    value,
    onFocus: () => setInFocus(true),
    onBlur: () => setInFocus(false),
    ...otherProps,
  })

  return (
    <div
      className={`relative flex items-center w-full rounded-lg mt-10 ${
        wrapperClassName ?? ''
      }  ${inFocus ? 'bg-[#e9ecf8e6]' : 'bg-[#eff1f999]'} ${
        tag === 'textarea' ? 'min-h-[152px]' : 'h-[52px]'
      }`}
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

      {input}
    </div>
  )
}

export default Input
