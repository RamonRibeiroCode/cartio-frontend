import { useState } from 'react'
import { NumericFormat, NumericFormatProps } from 'react-number-format'

import Icon from '../Icon'

interface InputProps extends NumericFormatProps {
  label?: string
  icon?: string
  wrapperClassName?: string
}

function CurrencyInput({
  label,
  icon,
  wrapperClassName,
  value,
  ...otherProps
}: InputProps) {
  const [inFocus, setInFocus] = useState(false)

  return (
    <div
      className={`relative flex items-center w-full rounded-lg mt-10 h-[52px] ${
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

      <NumericFormat
        className="w-full h-full bg-transparent outline-0 text-base text-[#5E6366] placeholder:text-[#ABAFB1] focus:border-2 focus:border-primary-10 rounded-lg px-4 disabled:opacity-60"
        onFocus={() => setInFocus(true)}
        onBlur={() => setInFocus(false)}
        decimalSeparator=","
        decimalScale={2}
        value={value}
        {...otherProps}
      />
    </div>
  )
}

export default CurrencyInput
