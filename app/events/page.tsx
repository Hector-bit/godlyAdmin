import LinkBtn from "../components/buttons/LinkBtn";


export default async function EventsPage() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <div className="grow font-bold text-xl">Events</div>
        <LinkBtn href={"events/events-manager"}>Create Event</LinkBtn>

      </div>

    </div>
  )
}