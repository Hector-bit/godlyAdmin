'use client'
import { deleteAlbum } from "@/app/actions/albumsActions"

type DeleteBtnType = {
  artistId: string
  albumId: string
}

const DeleteAlbumBtn = ({ artistId, albumId }: DeleteBtnType) => {
  // const [deleteModal, setDeleteModal] = useState<boolean>(false)


  return (
    <button 
      className="bg-red-500 border-2 border-black p-2 rounded-xl font-bold text-white" 
      onClick={() => deleteAlbum(artistId, albumId)}
    >
      Delete Album
    </button>
  )
}

export default DeleteAlbumBtn