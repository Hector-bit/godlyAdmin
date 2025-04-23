import LinkBtn from "../components/buttons/LinkBtn";
import EventList from "../components/EventList";

export default async function EventsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center">
        <LinkBtn href="/">Back</LinkBtn>
        <div className="font-bold text-xl">Events</div>
        <LinkBtn href={"events/events-manager"}>Create Event</LinkBtn>

      </div>
      <EventList/>
    </div>
  )
}