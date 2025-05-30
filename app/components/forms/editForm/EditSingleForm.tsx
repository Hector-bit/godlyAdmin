'use client'
import { useActionState } from 'react';
import { updateSingle, SingleFormState } from '@/app/actions/singleActions';
import { SongType } from '@/app/lib/types/songTypes';

export default function EditSingleForm(props: {artistId: string, singleId: string, singleData: SongType}) {
  const initialState: SingleFormState = { message: null, errors: {} };
  const [state, formAction] = useActionState(updateSingle, initialState);

  const artistId = props.artistId
  const singleId = props.singleId 
  const singleData = props.singleData

  return (
    <form action={formAction}>
      <div className="rounded-md p-4  rounded-xl md:p-6">
      <div className="mb-4">
        <label htmlFor="amount" className="mb-2 block text-sm font-medium">
          ArtistId: {artistId}
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="artistId"
              name="artistId"
              type='hidden'
              defaultValue={artistId}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 "
              aria-describedby='artist-error'
            />
          </div>
        </div>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="singleId"
              name="singleId"
              type='hidden'
              defaultValue={singleId}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 "
              aria-describedby='artist-error'
            />
          </div>
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
        {/* Song Name */}
        <div className="mb-4">
          <label htmlFor="artist" className="mb-2 block text-sm font-medium">
            Song name
          </label>
          <div className="relative">
            <input               
              id="songName"
              name="songName"
              className="peer block w-full cursor-pointer rounded-md py-2 pl-10 border border-gray-200"
              defaultValue={singleData.songName}
              placeholder="Song Name"
              aria-describedby='artist-error'>
            </input>
          </div>
          <div id="artist-error" aria-live="polite" aria-atomic="true">
            {state && state.errors?.songName &&
              state.errors.songName.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* YOUTUBE LINK */}
        <div className="mb-4">
          <label htmlFor="album" className="mb-2 block text-sm font-medium">
            Youtube Link
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="youtubeLink"
                name="youtubeLink"
                defaultValue={singleData.youtubeLink}
                placeholder='youtube link'
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 "
                aria-describedby='artist-error'
              />
            </div>
          </div>
          <div id="artist-error" aria-live="polite" aria-atomic="true">
            {state && state.errors?.youtubeLink &&
              state.errors?.youtubeLink.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* SPOTIFY LINK */}
        <div className="mb-4">
          <label htmlFor="album" className="mb-2 block text-sm font-medium">
            Spotify Link
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="spotifyLink"
                name="spotifyLink"
                placeholder='spotify link'
                defaultValue={singleData.spotifyLink}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 "
                aria-describedby='artist-error'
              />
            </div>
          </div>
          <div id="artist-error" aria-live="polite" aria-atomic="true">
            {state && state.errors?.spotifyLink &&
              state.errors?.spotifyLink.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* SOUNDCLOUD LINK */}
        <div className="mb-4">
          <label htmlFor="album" className="mb-2 block text-sm font-medium">
            SoundCloud Link
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="soundCloudLink"
                name="soundCloudLink"
                placeholder='soundcloud link'
                defaultValue={singleData.soundCloudLink}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 "
                aria-describedby='artist-error'
              />
            </div>
          </div>
          <div id="artist-error" aria-live="polite" aria-atomic="true">
            {state && state.errors?.soundCloudLink &&
              state.errors?.soundCloudLink.map((error: string) => (
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
        <button className='border border-2 rounded-md p-4' type="submit">Update Song</button>
      </div>
    </form>
  );
}
