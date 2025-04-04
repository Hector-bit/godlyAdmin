import { fetchSongs } from "@/app/actions/songActions";
import Link from "next/link";
import { PencilSquareIcon } from "@heroicons/react/16/solid";

export default async function AlbumPage(props: { params: Promise<{id:string, albumId: string}> }) {
  const params = await props.params;
  const albumId = params.albumId
  const artistId = params.id

  const albumSongs = await fetchSongs(albumId)

  // const artistData = await fetchArtistById(artistId)
  // const artistAlbums = await fetchAlbumsByArtistId(artistId)
  console.log('songs info', albumSongs, albumId)

  return (
    <div className="flex flex-col gap-3 min-h-screen p-8">
      <div className="flex flex-row justify-between items-center">
        <div>album page {albumId}</div>

        <Link 
          href={`/artists/${artistId}/album-manager/${albumId}/song-manager`}
          className="p-2 border border-black bg-cyan-500 text-white font-bold rounded-xl"
        >
            Create Song
        </Link>
      </div>

      {/* ALBUM SONGS */}
      <div className="flex flex-col rounded-xl">
        <div className="mb-4">Songs: </div>
        {albumSongs.map((song:any) => {
          return (
            <div className="flex flex-row justify-between border border-black rounded-xl p-4" key={song._id}>
              <div>Song Name: {song.songName}</div>
              <Link href={`/artists/${artistId}/song-manager/${song._id}`}>
                <PencilSquareIcon className="w-[20px]"/>
              </Link>
            </div>
          )

        })}
      </div>
    </div>
  );
}
