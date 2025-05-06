'use client'
import { useActionState } from 'react';
import { AlbumType } from '@/app/lib/types/albumTypes';
import { AlbumState, patchAlbum } from '@/app/actions/albumsActions';

export default function EditAlbumForm(props: {albumInfo: AlbumType}) {
  const initialState: AlbumState = { message: null, errors: {} };
  const [state, formAction] = useActionState(patchAlbum, initialState);

  const albumInfo = props.albumInfo

  return (
    <form action={formAction}>
      {/* */}
      <div className="mb-4">
        <div className="relative mt-2 rounded-md">
          {/* PART OF FORM THAT THEY DONT NEED TO SEE */}
          <input
            id="_id"
            name="_id"
            type='hidden'
            defaultValue={albumInfo._id}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 "
            aria-describedby='artist-error'
          />
          <input
            id="artistId"
            name="artistId"
            type='hidden'
            defaultValue={albumInfo.artistId}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 "
            aria-describedby='artist-error'
          />
        </div>
        <div id="artist-error" aria-live="polite" aria-atomic="true">
          {state && state.errors?._id &&
            state.errors?._id.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
      <div className="rounded-md p-4  rounded-xl md:p-6">
        {/* ALBUM NAME */}
        <div className="mb-4">
          <label htmlFor="albumName" className="mb-2 block text-sm font-medium">
            Album Name
          </label>
          <div className="relative">
            <input               
              id="albumName"
              name="albumName"
              className="peer block w-full cursor-pointer rounded-md py-2 pl-10 border border-gray-200"
              defaultValue={albumInfo.albumName}
              placeholder="albumName"
              aria-describedby='artist-error'>
            </input>
          </div>
          <div id="artist-error" aria-live="polite" aria-atomic="true">
            {state && state.errors?.albumName &&
              state.errors.albumName.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* ALBUM IMG */}
        <div className="mb-4">
          <label htmlFor="album" className="mb-2 block text-sm font-medium">
            Album Image Link
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="img"
                name="img"
                defaultValue={albumInfo.img}
                placeholder='image link'
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
        <button className='border border-2 rounded-md p-4' type="submit">Update Album</button>
      </div>
    </form>
  );
}
