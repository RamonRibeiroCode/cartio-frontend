interface FilterProps {
  width: number
  height: number
}

function Filter({ width, height }: FilterProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.6663 2.5H1.33301L6.66634 8.80667V13.1667L9.33301 14.5V8.80667L14.6663 2.5Z"
        stroke="#53545C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Filter
