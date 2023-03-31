interface UploadPlaceholderProps {
  width: number
  height: number
}

function UploadPlaceholder({ width, height }: UploadPlaceholderProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 172 172"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.5"
        y="0.5"
        width="171"
        height="171"
        rx="11.5"
        stroke="#A6A8B1"
        strokeDasharray="8 8"
      />
    </svg>
  )
}

export default UploadPlaceholder
