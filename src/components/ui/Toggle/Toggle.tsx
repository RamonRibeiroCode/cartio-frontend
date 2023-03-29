interface ToggleProps {
  checked: boolean
  onClick: () => void
}

function Toggle({ checked, onClick }: ToggleProps) {
  return (
    <button
      className={`relative flex items-center w-10 h-5 rounded-full p-[2px] ${
        checked ? 'bg-[#5570f166]' : 'bg-primary-transparent'
      }`}
      onClick={onClick}
    >
      <div
        className={`absolute w-4 h-4 rounded-full transition-all ${
          checked ? 'bg-primary-100 left-[22px]' : 'bg-[#BBC5CB] left-[2px]'
        }`}
      />
    </button>
  )
}

export default Toggle
