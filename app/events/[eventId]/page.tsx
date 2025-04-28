import { getEvent } from "@/app/actions/eventsActions"
import LinkBtn from "@/app/components/buttons/LinkBtn"
import { PencilSquareIcon } from "@heroicons/react/16/solid"
import Link from "next/link"
import Image from "next/image"

export default async function EventPage (props: {params: Promise<{eventId: string}> }) {
  const params = await props.params
  const eventId = params.eventId

  const eventDetails = await getEvent(eventId)

  const eventLink = eventDetails?.link ? eventDetails.link : `/events/${eventId}`
  const eventImg = eventDetails?.imgLink ? eventDetails.imgLink : 'globe.svg'

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <LinkBtn href="/events">Back</LinkBtn>
        <div className="text-xl font-bold">Event</div>
        <LinkBtn href={`/events/${eventId}/edit`}>
          <div className="flex flex-row gap-3">
            <div>Edit Event</div>
            <PencilSquareIcon className="w-[20px] h-[20px]"/>
          </div>
        </LinkBtn>
      </div>

      {/* EVENT DETAILS */}
      <div className="flex flex-row border-2 border-black p-3 rounded-xl gap-3">
        <div className="flex flex-col gap-3">
          <div className="font-bold text-xl">{eventDetails?.title}</div>
          <div>{eventDetails?.description}</div>
          <Link className="text-cyan-600 " href={eventLink}>eventDetails. Link</Link>
          <div>{eventDetails?.imgLink}</div>
        </div>
        <div className="flex flex-col gap-4 items-end">
          <Image className="max-h-[200px] max-w-[200px]" src={eventImg} alt={"event"} width={200} height={200}/>
        </div>
      </div>
    </div>
  )
}

