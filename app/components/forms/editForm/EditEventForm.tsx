'use client'
import { useActionState } from 'react';
import { updateEvent, EventState } from '@/app/actions/eventsActions';
import { EventType } from '@/app/lib/types/eventTypes';

export default function EditEventForm(props: {eventInfo: EventType}) {
  const initialState: EventState = { message: null, errors: {} };
  const [state, formAction] = useActionState(updateEvent, initialState);

  const eventInfo = props.eventInfo

  // console.log('event info: ', eventInfo)

  return (
    <form action={formAction}>
      {/* event Id */}
      <div className="mb-4">
        <div className="relative mt-2 rounded-md">
          <input
            id="eventId"
            name="eventId"
            type='hidden'
            defaultValue={eventInfo._id}
            className="peer block w-full rounded-md border border-gray-200 p-3"
            aria-describedby='artist-error'
          />
        </div>
        <div id="artist-error" aria-live="polite" aria-atomic="true">
          {state && state.errors?.eventId &&
            state.errors?.eventId.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
      <div className="rounded-md p-4  rounded-xl md:p-6">
        {/* EVENT TITLE */}
        <div className="mb-4">
          <label htmlFor="artist" className="mb-2 block text-sm font-medium">
            Title
          </label>
          <div className="relative">
            <input               
              id="title"
              name="title"
              className="peer block w-full cursor-pointer rounded-md p-3 border border-gray-200"
              defaultValue={eventInfo.title}
              placeholder="Title"
              aria-describedby='artist-error'>
            </input>
          </div>
          <div id="artist-error" aria-live="polite" aria-atomic="true">
            {state && state.errors?.title &&
              state.errors.title.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* EVENT DESCRIPTION */}
        <div className="mb-4">
          <label htmlFor="event" className="mb-2 block text-sm font-medium">
            Description
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                id="description"
                name="description"
                defaultValue={eventInfo.description}
                placeholder='youtube link'
                className="peer block w-full rounded-md border border-gray-200 p-3 min-h-[260px]"
                aria-describedby='artist-error'
              />
            </div>
          </div>
          <div id="artist-error" aria-live="polite" aria-atomic="true">
            {state && state.errors?.description &&
              state.errors?.description.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* EVENT LINK */}
        <div className="mb-4">
          <label htmlFor="event" className="mb-2 block text-sm font-medium">
            Event Link
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="link"
                name="link"
                defaultValue={eventInfo.link}
                placeholder='youtube link'
                className="peer block w-full rounded-md border border-gray-200 p-3"
                aria-describedby='artist-error'
              />
            </div>
          </div>
          <div id="artist-error" aria-live="polite" aria-atomic="true">
            {state && state.errors?.link &&
              state.errors?.link.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* EVENT IMAGE */}
        <div className="mb-4">
          <label htmlFor="event" className="mb-2 block text-sm font-medium">
            Event Image
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="imgLink"
                name="imgLink"
                defaultValue={eventInfo.imgLink}
                placeholder='youtube img'
                className="peer block w-full rounded-md border border-gray-200 p-3"
                aria-describedby='artist-error'
              />
            </div>
          </div>
          <div id="artist-error" aria-live="polite" aria-atomic="true">
            {state && state.errors?.imgLink &&
              state.errors?.imgLink.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

      </div>
      <div className="mt-6 flex justify-end gap-4">
        {/* <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link> */}
        <button className='border border-2 rounded-md p-4' type="submit">Update Event</button>
      </div>
    </form>
  );
}
