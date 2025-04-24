import LinkBtn from "@/app/components/buttons/LinkBtn"
import UpdateEventForm from "@/app/components/forms/editForm/EditEventForm"
import DeleteModel from "@/app/components/DeleteModel"
import DeleteEventBtn from "@/app/components/buttons/DeleteEventBtn"

export default async function EditEventPage (props: { params: Promise<{eventId: string}>}) {
  const params = await props.params 
  const eventId = params.eventId

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <LinkBtn href={`/events/${eventId}`}>Back</LinkBtn>
        <div className="font-bold text-xl">Edit Event</div>
        <DeleteModel 
          deleteBtn={<DeleteEventBtn eventId={eventId}/>}
        >
          Delete Event
        </DeleteModel>
      </div>

      <UpdateEventForm/>
    </div>
  )
}

