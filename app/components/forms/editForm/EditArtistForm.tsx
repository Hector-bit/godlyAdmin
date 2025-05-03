'use client'
import { useActionState } from 'react';
// import { postCreateSong, SongFormState } from '@/app/actions/songActions';
import { updateArtist, ArtistState } from '@/app/actions/artistActions';
import Link from 'next/link';
import { ArtistType } from '@/app/lib/types/artistTypes';

export default function UpdateArtistForm(props: {artistInfo: ArtistType}) {
  const initialState: ArtistState = { message: null, errors: {} };
  const [state, formAction] = useActionState(updateArtist, initialState);

  const artistInfo = props.artistInfo

  return (
    <form action={formAction}>
      {/* Artist Id */}
      <div className="mb-4">
        <div className="relative mt-2 rounded-md">
          {/* PART OF FORM THAT THEY DONT NEED TO SEE */}
          <input
            id="artistId"
            name="artistId"
            type='hidden'
            defaultValue={artistInfo._id}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 "
            aria-describedby='artist-error'
          />
        </div>
        <div id="artist-error" aria-live="polite" aria-atomic="true">
          {state && state.errors?.artistId &&
            state.errors?.artistId.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
      <div className="rounded-md p-4  rounded-xl md:p-6">
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="artist" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <div className="relative">
            <input               
              id="name"
              name="name"
              className="peer block w-full cursor-pointer rounded-md py-2 pl-10 border border-gray-200"
              defaultValue={artistInfo.name}
              placeholder="name"
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

        {/* ARTIS NAME */}
        <div className="mb-4">
          <label htmlFor="album" className="mb-2 block text-sm font-medium">
            Artist Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="artistName"
                name="artistName"
                defaultValue={artistInfo.artistName}
                placeholder='artist name'
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

        {/* ARTIST IMAGE */}
        <div className="mb-4">
          <Link className='mb-3 text-underline pointer-cursor text-cyan-600' href={'/help/uploadImage'}>How to upload an image with imgur</Link>
          <label htmlFor="album" className="mb-2 block text-sm font-medium">
            Artist Image Link
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="img"
                name="img"
                placeholder='artist image link'
                defaultValue={artistInfo.img}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 "
                aria-describedby='artist-error'
              />
            </div>
          </div>
          <div id="artist-error" aria-live="polite" aria-atomic="true">
            {state && state.errors?.img &&
              state.errors?.img.map((error: string) => (
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
        <button className='border border-2 rounded-md p-4' type="submit">Update Artist</button>
      </div>
    </form>
  );
}
