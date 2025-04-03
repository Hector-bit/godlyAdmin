import { fetchSongsByAlbumId } from "@/app/actions/songActions";


export default async function AlbumPage(props: { params: Promise<{albumId: string}> }) {
  const params = await props.params;
  const albumId = params.albumId

  const albumSongs = await fetchSongsByAlbumId(albumId)

  // const artistData = await fetchArtistById(artistId)
  // const artistAlbums = await fetchAlbumsByArtistId(artistId)
  console.log('songs info', albumSongs, albumId)

  return (
    <div className="flex flex-col justify-between gap-3 min-h-screen p-8">
      album page {albumId}

      {/* ALBUM SONGS */}
      {/* <div className="border border-black rounded-xl">
        {albumSongs.map((song:any) => {
          return (
            <div key={song._id}>
              <div>{song.songName}</div>
            </div>
          )

        })}
      </div> */}
    </div>
  );
}
