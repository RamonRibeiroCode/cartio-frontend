import { useState } from 'react'
import DatePicker, {
  ReactDatePickerProps,
  registerLocale,
} from 'react-datepicker'
import { globalCss } from '@stitches/react'
import ptBR from 'date-fns/locale/pt-BR'

import { DateLight, Clock } from '../../../assets/icons/Actions'

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
    paddingLeft: '56px',
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
  '.ui-date-picker .react-datepicker.react-datepicker--time-only  .react-datepicker__triangle':
    {
      marginLeft: '-20px',
    },
})

function UIDatePicker({ type, ...otherProps }: DatePickerProps) {
  const [inFocus, setInFocus] = useState(false)

  return (
    <div
      className={`relative flex justify-center items-center w-full h-[52px] rounded-lg py-2 ui-date-picker ${
        inFocus ? 'bg-[#e9ecf8] border-2 border-primary-10' : 'bg-[#F4F5FA]'
      } ${globalStyles()}`}
    >
      <div className="mr-4 absolute left-4">
        {type === 'date' ? (
          <DateLight width={24} height={24} />
        ) : (
          <Clock width={24} height={24} />
        )}
      </div>

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
