'use client'
import { useActionState } from 'react';
import { postCreateAlbum, AlbumFormState } from '@/app/actions/albumsActions';

export const CreateAlbumForm = ({ artistId }: { artistId: string}) => {

  const initialState: AlbumFormState = { message: null, errors: {} };
  const [state, albumFormAction] = useActionState(postCreateAlbum, initialState);

  return (
    <form action={albumFormAction}>
      <div className="rounded-md p-4 rounded-xl md:p-6">

        {/* Album Name */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Choose album name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="albumName"
                name="albumName"
                defaultValue=""
                placeholder="Album Name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 "
                aria-describedby='album-error'
              />
            </div>
          </div>
          <div id="album-error" aria-live="polite" aria-atomic="true">
            {state && state.errors?.albumName &&
              state.errors?.albumName.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* artist id */}
        <div className="mb-4">
          <label htmlFor="artistId" className="mb-2 block text-sm font-medium">
            Artits id:  {artistId}
          </label>
          <div className="relative">
            <input type="hidden" id='artistId' name="artistId" value={artistId} aria-describedby='album-error'/>
          </div>
          <div id="album-error" aria-live="polite" aria-atomic="true">
            {state && state.errors?.artistId &&
              state.errors.artistId.map((error: string) => (
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
        <button className='border border-2 rounded-md p-4' type="submit">Create Album</button>
      </div>
    </form>
  );
}
