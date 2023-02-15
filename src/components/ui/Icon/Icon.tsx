import type { SVGProps } from 'react'

interface IconProps extends SVGProps<SVGSVGElement> {
  name: string
}

function Icon({ name, ...otherProps }: IconProps) {
  return (
    <svg {...otherProps}>
      <use href={`/icons.svg#${name}`} />
    </svg>
  )
}

export default Icon
