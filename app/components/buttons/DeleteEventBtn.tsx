'use client'
// import { deleteArtist } from "@/app/actions/artistActions"
import { deleteEvent } from "@/app/actions/eventsActions"


type DeleteBtnType = {
  eventId: string
}

const DeleteEventBtn = ({ eventId }: DeleteBtnType) => {
  // const [deleteModal, setDeleteModal] = useState<boolean>(false)


  return (
    <button 
      className="bg-red-500 border-2 border-black p-2 rounded-xl font-bold text-white" 
      onClick={() => deleteEvent(eventId)}
    >
      Delete Event
    </button>
  )
}

export default DeleteEventBtn