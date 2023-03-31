interface DoubleArrowLeftProps {
  width: number
  height: number
  className: string
}

function DoubleArrowLeft({ width, height, className }: DoubleArrowLeftProps) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 17L6 12L11 7"
        stroke="#53545C"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 17L13 12L18 7"
        stroke="#53545C"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default DoubleArrowLeft
