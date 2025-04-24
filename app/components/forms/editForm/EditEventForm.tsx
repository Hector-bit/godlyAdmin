'use client'
import { useActionState } from 'react';
// import { createArtist, State } from '@/app/actions/artistActions'
import { updateEvent, EventState } from '@/app/actions/eventsActions';

export default function UpdateEventForm() {
  const initialState: EventState = { message: null, errors: {} };
  const [state, formAction] = useActionState(updateEvent, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md p-4 rounded-xl md:p-6">
        {/* Event Title */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Event Title
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="title"
                name="title"
                defaultValue=""
                placeholder="title"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 "
                aria-describedby='artist-error'
              />
            </div>
          </div>
          <div id="event-error" aria-live="polite" aria-atomic="true">
            {state && state.errors?.title &&
              state.errors?.title.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Event Description */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
              Description
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                id="description"
                name="description"
                defaultValue=""
                placeholder="description"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 "
                aria-describedby='event-error'
              />
            </div>
          </div>
          <div id="event-error" aria-live="polite" aria-atomic="true">
            {state && state.errors?.description &&
              state.errors?.description.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Event Link */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Link
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="link"
                name="link"
                defaultValue=""
                placeholder="link"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 "
                aria-describedby='event-error'
              />
            </div>
          </div>
          <div id="event-error" aria-live="polite" aria-atomic="true">
            {state && state.errors?.link &&
              state.errors?.link.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Event image Link */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Image Link
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="imgLink"
                name="imgLink"
                defaultValue=""
                placeholder="imgLink"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 "
                aria-describedby='event-error'
              />
            </div>
          </div>
          <div id="event-error" aria-live="polite" aria-atomic="true">
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
        <button className='border border-2 rounded-md p-4' type="submit">Create Event</button>
      </div>
    </form>
  );
}
