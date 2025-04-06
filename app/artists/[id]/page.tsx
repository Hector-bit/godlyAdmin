import { fetchAlbumsByArtistId } from "@/app/actions/albumsActions";
import { fetchArtistById } from "@/app/actions/artistActions";
import { fetchSinglesByArtistId } from "@/app/actions/songActions";
import Link from "next/link";
import { PencilSquareIcon } from "@heroicons/react/16/solid";


export default async function ArtistPage(props: { params: Promise<{id: string}> }) {
  const params = await props.params;
  const artistId = params.id

  const artistData = await fetchArtistById(artistId)
  const artistAlbums = await fetchAlbumsByArtistId(artistId)
  const artistSingles = await fetchSinglesByArtistId(artistId)
  console.log('artist info', artistData, artistAlbums, artistSingles)

  return (
    <div className="flex flex-col gap-3 min-h-screen p-8">
      {/* ARTIST INFORMATION  */}
      <div>Name: {artistData?.name}</div>
      {/* ARTIST SONGS & ALBUMS */}
      <div className="grid grid-cols-2 gap-4 sm:gap-8">
        {/* ARTIST ALBUMS LIST */}
        <div>
          <div className="flex flex-row items-center mb-4 gap-5">
            <div>Albums:</div>
            <Link 
              href={`/artists/${artistId}/album-manager`}
              className="p-2 border border-black bg-cyan-500 text-white font-bold rounded-xl"
            >
                Create Album
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            {/* ALBUMS LIST */}
            {artistAlbums && artistAlbums.map((album) => {
              return (
                <div key={album._id} className="flex flex-row justify-between border border-black p-4 rounded-xl">
                  <div>Album: {album.albumName}</div>
                  <Link href={`/artists/${artistId}/album-manager/${album._id}`}>
                    <PencilSquareIcon className="w-[20px]"/>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
        {/* END OF ARTIST ALBUM LIST */}

        {/* ARTIST SINGLES */}
        <div className="flex flex-col">
          <div className="flex flex-row items-center mb-4 gap-5">
            <div>Songs:</div>
            <Link 
              href={`/artists/${artistId}/single-manager`}
              className="p-2 border border-black bg-cyan-500 text-white font-bold rounded-xl"
            >
              Create Single
            </Link>
          </div>
          {/* SINGLES LIST */}
          <div className="flex flex-col gap-4">
            {artistSingles && artistSingles.map((song) => {
              return (
                <div key={song._id} className="flex flex-row justify-between border border-black p-4 rounded-xl">
                  <div>Single: {song.songName}</div>
                  <Link href={`/artists/${artistId}/single-manager/${song._id}`}>
                    <PencilSquareIcon className="w-[20px]"/>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
        {/* END OF ARTIST SINGLES  */}
      </div>
    </div>
  );
}
