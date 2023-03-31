import { Filter, Date, Share } from '../assets/icons/Actions'
import {
  Mail,
  Password,
  Profile,
  Location,
  Phone,
} from '../assets/icons/Profile'

export type ActionButtonIcons = 'Filter' | 'Date' | 'Share'

export const getActionButtonIconByName = (icon: ActionButtonIcons) => {
  switch (icon) {
    case 'Filter':
      return <Filter width={16} height={17} />

    case 'Date':
      return <Date width={16} height={17} />

    case 'Share':
      return <Share width={16} height={17} />

    default:
      return null
  }
}

export type InputIcons = 'Mail' | 'Password' | 'Profile' | 'Phone' | 'Location'

export const getInputIconByName = (icon: InputIcons) => {
  switch (icon) {
    case 'Mail':
      return <Mail width={24} height={24} />

    case 'Password':
      return <Password width={24} height={24} />

    case 'Profile':
      return <Profile width={24} height={24} />

    case 'Location':
      return <Location width={24} height={24} />

    case 'Phone':
      return <Phone width={24} height={24} />

    default:
      return null
  }
}
