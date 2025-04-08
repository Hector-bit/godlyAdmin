// import { fetchSongs } from "@/app/actions/songActions";
import { fetchAlbumByAlbumId } from "@/app/actions/albumsActions";
import Link from "next/link";
import { PencilSquareIcon } from "@heroicons/react/16/solid";
import LinkBtn from "@/app/components/buttons/LinkBtn";

export default async function AlbumPage(props: { params: Promise<{id:string, albumId: string}> }) {
  const params = await props.params;
  const albumId = params.albumId
  const artistId = params.id

  const albumInfo = await fetchAlbumByAlbumId(albumId)

  // const artistData = await fetchArtistById(artistId)
  // const artistAlbums = await fetchAlbumsByArtistId(artistId)
  // console.log('songs info', albumInfo, albumId)

  return (
    <div className="flex flex-col gap-3 min-h-screen">
      <div className="flex flex-row justify-between items-center">
        <LinkBtn href={`/artists/${artistId}`}>Back</LinkBtn>
        <div className="font-bold">Album</div>
        <Link 
          href={`/artists/${artistId}/album-manager/${albumId}/edit`}
          className="p-2 border border-black bg-cyan-500 text-white font-bold rounded-xl"
        >
            Edit Album
        </Link>
      </div>
      {/* ALBUM INFORMATION */}
      <div className="flex flex-col border-2 border-black p-2 rounded-xl">
        <div className="font-bold">Album Information</div>
        <div>Album id: {albumId}</div>
        <div>Album name: {albumInfo?.albumName}</div>

      </div>

      {/* ALBUM SONGS */}
      <div className="flex flex-col rounded-xl">
        <div className="flex flex-row justify-between items-center my-3">
          <div>Songs:</div>
          <LinkBtn href={`/artists/${artistId}/album-manager/${albumId}/song-manager`} >Create Song</LinkBtn>
        </div>
        <div className="flex flex-col gap-4">
          {albumInfo?.albumSongs && albumInfo?.albumSongs.map((song) => {
            return (
              <div className="flex flex-row justify-between border border-black rounded-xl p-4" key={song._id}>
                <div>Song Name: {song.songName}</div>
                <Link href={`/artists/${artistId}/album-manager/${albumId}/song-manager/${song._id}`}>
                  <PencilSquareIcon className="w-[20px]"/>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
