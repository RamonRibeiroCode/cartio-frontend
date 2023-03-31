interface TrashProps {
  width: number
  height: number
}

function Trash({ width, height }: TrashProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.1042 7.88965C16.1042 7.88965 15.6517 13.5021 15.3892 15.8663C15.2642 16.9955 14.5667 17.6571 13.4242 17.678C11.25 17.7171 9.07332 17.7196 6.89999 17.6738C5.80082 17.6513 5.11499 16.9813 4.99249 15.8721C4.72832 13.4871 4.27832 7.88965 4.27832 7.88965"
        stroke="#130F26"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.2567 5.19987H3.125"
        stroke="#130F26"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5335 5.19949C13.8793 5.19949 13.316 4.73699 13.1877 4.09616L12.9852 3.08283C12.8602 2.61533 12.4368 2.29199 11.9543 2.29199H8.42682C7.94432 2.29199 7.52099 2.61533 7.39599 3.08283L7.19349 4.09616C7.06516 4.73699 6.50182 5.19949 5.84766 5.19949"
        stroke="#130F26"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Trash
