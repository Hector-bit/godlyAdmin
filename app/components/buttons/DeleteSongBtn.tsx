'use client'
import { deleteSong } from "@/app/actions/songActions"

type DeleteBtnType = {
  songId: string,
  artistId: string,
  albumId: string
}

const DeleteSongBtn = ({ songId, artistId, albumId }: DeleteBtnType) => {
  // const [deleteModal, setDeleteModal] = useState<boolean>(false)


  return (
    <button 
      className="bg-red-500 border-2 border-black p-2 rounded-xl font-bold text-white" 
      onClick={() => deleteSong(songId, artistId, albumId)}
    >
      Delete Song
    </button>
  )
}

export default DeleteSongBtn;