interface FolderProps {
  width: number
  height: number
  color: string
}

function Folder({ width, height, color }: FolderProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.8492 13.11C17.8492 16.0917 16.0917 17.8492 13.11 17.8492H6.625C3.63583 17.8492 1.875 16.0917 1.875 13.11V6.61C1.875 3.6325 2.97 1.875 5.9525 1.875H7.61917C8.2175 1.87583 8.78083 2.15667 9.13917 2.63583L9.9 3.6475C10.26 4.12583 10.8233 4.4075 11.4217 4.40833H13.78C16.7692 4.40833 17.8725 5.93 17.8725 8.9725L17.8492 13.11Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.23438 12.0524H13.5135"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Folder
