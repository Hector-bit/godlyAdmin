import { fetchSongBySongId } from "@/app/actions/songActions";
import LinkBtn from "@/app/components/buttons/LinkBtn";
import { PencilSquareIcon } from "@heroicons/react/16/solid";


export default async function SongIdPage(props: { params: Promise<{ id: string, albumId: string, songId: string }> }) {
  const params = await props.params;
  const songId = params.songId
  const artistId = params.id
  const albumId = params.albumId

  const songInfo = await fetchSongBySongId(songId)

  // const albumSongs = await fetchSongs(albumId)

  // const artistData = await fetchArtistById(artistId)
  // const artistAlbums = await fetchAlbumsByArtistId(artistId)
  console.log('songs info', songId)

  return (
    <div className="flex flex-col gap-3 min-h-screen">
      <div className="flex flex-row justify-between items-center">
        <LinkBtn href={`/artists/${artistId}/album-manager/${albumId}`}>Back</LinkBtn>
        <div className="font-bold text-xl">{songInfo?.songName}</div>
        <LinkBtn href={`/artists/${artistId}/album-manager/${albumId}/song-manager/${songId}/edit`}>
          <div className="flex flex-row p-2 gap-2">
            EDIT <PencilSquareIcon className="w-[20px]"/>
          </div>
        </LinkBtn>
      </div>
      song page {songId}

      {/* ALBUM SONGS */}
      {/* <div className="flex flex-col rounded-xl">
        {albumSongs.map((song:any) => {
          return (
            <div className="border border-black rounded-xl p-4" key={song._id}>
              <div>Song Name: {song.songName}</div>
            </div>
          )

        })}
      </div> */}
    </div>
  );
}
