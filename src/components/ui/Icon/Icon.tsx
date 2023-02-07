import type { SVGProps } from 'react'

interface Props extends SVGProps<SVGSVGElement> {
  name: string
}

function Icon({ name, ...otherProps }: Props) {
  return (
    <svg {...otherProps}>
      <use href={`/icons.svg#${name}`} />
    </svg>
  )
}

export default Icon
