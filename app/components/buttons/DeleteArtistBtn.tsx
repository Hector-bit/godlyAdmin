'use client'
import { deleteArtist } from "@/app/actions/artistActions"

type DeleteBtnType = {
  artistId: string
}

const DeleteArtistBtn = ({ artistId }: DeleteBtnType) => {
  // const [deleteModal, setDeleteModal] = useState<boolean>(false)


  return (
    <button 
      className="bg-red-500 border-2 border-black p-2 rounded-xl font-bold text-white" 
      onClick={() => deleteArtist(artistId)}
    >
      Delete Artist
    </button>
  )
}

export default DeleteArtistBtn