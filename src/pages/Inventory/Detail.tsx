import { useParams } from 'react-router-dom'

function InventoryDetail() {
  const params = useParams()

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-paragraph-1 font-medium text-black-60">
          Inventory Detail
        </h1>
      </div>

      <div>{params.id}</div>
    </div>
  )
}

export default InventoryDetail
