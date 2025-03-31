'use client'
import { useActionState } from 'react';
// import { CustomerField } from '@/app/lib/definitions';
import { ArtistField } from '@/app/lib/definitions';

import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
// import { Button } from '@/app/ui/button';
// import { CreateInvoice } from './buttons';
// import { createInvoice, State } from '@/app/lib/actions'
import { createArtist, State } from '@/app/actions/artistActions'

export default function CreateAlbumForm() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createArtist, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md p-4  rounded-xl md:p-6">
        {/* Real Name */}
        <div className="mb-4">
          <label htmlFor="artist" className="mb-2 block text-sm font-medium">
            Artist real name
          </label>
          <div className="relative">
            <input               
              id="name"
              name="name"
              className="peer block w-full cursor-pointer rounded-md py-2 pl-10 border border-gray-200"
              defaultValue=""
              placeholder="Real Name"
              aria-describedby='artist-error'>
            </input>
          </div>
          <div id="artist-error" aria-live="polite" aria-atomic="true">
            {state && state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Artist Name */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Choose artist name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="artistName"
                name="artistName"
                defaultValue=""
                placeholder="Artist Name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 "
                aria-describedby='artist-error'
              />
            </div>
          </div>
          <div id="artist-error" aria-live="polite" aria-atomic="true">
            {state && state.errors?.artistName &&
              state.errors?.artistName.map((error: string) => (
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
        <button className='border border-2 rounded-md p-4' type="submit">Create Artist</button>
      </div>
    </form>
  );
}
