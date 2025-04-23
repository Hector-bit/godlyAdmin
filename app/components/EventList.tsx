import { getEvents } from "../actions/eventsActions"
import Image from "next/image"
import Link from "next/link"

export default async function EventList () {
  const events = await getEvents()
  // console.log('events: ', events)

  return (
    <div className="flex flex-col gap-4 mt-4">
      {events && events.map((event) => {
        const eventImg = event.imgLink ? event.imgLink : 'globe.svg'
        const eventLink = event.link ? event.link : 'https://godlyproductions.com/'

        return (
          <div key={event._id} className="flex flex-row justify-between border-2 border-black p-4 rounded-xl gap-3">
            <div className="flex flex-col gap-3">
              <div className="font-bold text-xl">{event.title}</div>
              <div>{event.description}</div>
              <Link className="text-cyan-600 " href={eventLink}>Event Link</Link>
            </div>
            <Image className="max-h-[200px] max-w-[200px]" src={eventImg} alt={"event"} width={200} height={200}/>
          </div>
        )
      })}
    </div>
  )
}


