import CreateEventForm from "@/app/components/forms/createForms/CreateEventForms"

export default async function EventMangerPage () {
  return (
    <div className='flex flex-col'>
      <div className="title">EVENT MANAGER</div>
      <CreateEventForm/>
    </div>
  )
}