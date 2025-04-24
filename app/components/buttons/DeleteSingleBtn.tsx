'use client'
// import { deleteArtist } from "@/app/actions/artistActions"
import { deleteSingle } from "@/app/actions/singleActions"

type DeleteBtnType = {
  singleId: string
  artistId: string
}

const DeleteSingleBtn = ({ singleId, artistId }: DeleteBtnType) => {
  // const [deleteModal, setDeleteModal] = useState<boolean>(false)


  return (
    <button 
      className="bg-red-500 border-2 border-black p-2 rounded-xl font-bold text-white" 
      onClick={() => deleteSingle(singleId, artistId)}
    >
      Delete Single
    </button>
  )
}

export default DeleteSingleBtn