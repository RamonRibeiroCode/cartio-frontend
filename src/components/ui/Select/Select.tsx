import { useState } from 'react'

import Icon from '../Icon'

interface Option<ValueType> {
  label: string
  value: ValueType
}

interface SelectProps<ValueType> {
  label: string
  placeholder: string
  selected?: string
  options: Option<ValueType>[]
  onSelect: (option: ValueType) => void
}

function Select<ValueType>({
  label,
  placeholder,
  selected,
  options,
  onSelect,
}: SelectProps<ValueType>) {
  const [opened, setOpened] = useState(false)

  return (
    <div
      className={`relative flex items-center w-full mt-10 z-20 ${
        opened
          ? 'bg-[#e9ecf8] rounded-t-lg border-b-0'
          : 'bg-[#F4F5FA] rounded-lg'
      }`}
    >
      <label
        className={`text-label-1 absolute -top-6 transition-all ${
          opened || selected ? 'opacity-100' : 'opacity-0'
        } ${opened ? 'text-primary-100' : 'text-[#5E6366]'}`}
        htmlFor={label}
      >
        {label}
      </label>

      <button
        className={`flex justify-between items-center px-4 w-full h-[52px] cursor-pointer ${
          opened ? 'border border-b-0 border-primary-10 rounded-t-lg' : ''
        }`}
        onClick={() => setOpened(!opened)}
      >
        <span className={selected ? '' : 'text-[#ABAFB1]'}>
          {selected ?? placeholder}
        </span>

        <Icon
          className={opened ? 'rotate-180' : ''}
          name="ArrowDown"
          width={24}
          height={24}
        />
      </button>

      <div
        className={`flex flex-col items-start w-full bg-[#e9ecf8] border border-t-0 border-primary-10 rounded-b-lg absolute top-full z-20 ${
          opened ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {options.map((option) => {
          if (option.label === selected) {
            return <></>
          }

          return (
            <button
              key={option.label}
              className="flex justify-start items-center w-full px-4 h-[52px] text-[#ABAFB1]  hover:bg-white hover:text-primary-100 last:rounded-b-lg"
              onClick={() => {
                setOpened(false)
                onSelect(option.value)
              }}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Select
