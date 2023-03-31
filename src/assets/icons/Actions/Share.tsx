interface ShareProps {
  width: number
  height: number
}

function Share({ width, height }: ShareProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.555 5.94976L6.73936 9.80612L2.39962 7.09178C1.77783 6.70276 1.90718 5.75829 2.61048 5.55262L12.9142 2.53518C13.5582 2.34642 14.155 2.94855 13.9637 3.59466L10.9154 13.8912C10.7066 14.5955 9.76747 14.7213 9.38214 14.0968L6.73734 9.8068"
        stroke="#53545C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Share
