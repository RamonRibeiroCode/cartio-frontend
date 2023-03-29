import { useState } from 'react'
import DatePicker, {
  ReactDatePickerProps,
  registerLocale,
} from 'react-datepicker'
import { globalCss } from '@stitches/react'
import ptBR from 'date-fns/locale/pt-BR'

import Icon from '../Icon'

import 'react-datepicker/dist/react-datepicker.css'

registerLocale('pt-BR', ptBR)

interface DatePickerProps extends ReactDatePickerProps {
  type: 'time' | 'date'
}

const globalStyles = globalCss({
  '.ui-date-picker *': {
    fontFamily: 'Poppins',
  },
  '.ui-date-picker input': {
    width: '100%',
    backgroundColor: 'transparent',
    outline: 0,
    marginTop: '1px',
  },
  '.ui-date-picker .react-datepicker__current-month': {
    textTransform: 'capitalize',
  },
  '.ui-date-picker .react-datepicker.react-datepicker--time-only .react-datepicker__time-container':
    {
      width: '105px',
    },

  '.ui-date-picker .react-datepicker.react-datepicker--time-only .react-datepicker__time-box':
    {
      width: '105px',
    },
})

function UIDatePicker({ type, ...otherProps }: DatePickerProps) {
  const [inFocus, setInFocus] = useState(false)

  return (
    <div
      className={`flex justify-center items-center w-full h-[52px] rounded-lg py-2 px-4 ui-date-picker ${
        inFocus ? 'bg-[#e9ecf8e6] border-2 border-primary-10' : 'bg-[#eff1f999]'
      } ${globalStyles()}`}
    >
      <Icon
        className="mr-4"
        name={type === 'date' ? 'DateLight' : 'Clock'}
        width={24}
        height={24}
      />
      <DatePicker
        {...otherProps}
        locale="pt-BR"
        onFocus={() => setInFocus(true)}
        onBlur={() => setInFocus(false)}
      />
    </div>
  )
}

export default UIDatePicker
