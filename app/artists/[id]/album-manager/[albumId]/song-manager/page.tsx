import CreateSongForm from "@/app/components/forms/CreateSongForm";


export default async function SongPage(props: { params: Promise<{id: string, albumId: string}> }) {
  const params = await props.params;
  const artistId = params.id
  const albumId = params.albumId

  // const albumSongs = await fetchSongs(albumId)

  // const artistData = await fetchArtistById(artistId)
  // const artistAlbums = await fetchAlbumsByArtistId(artistId)
  console.log('songs info for ids: ', artistId, albumId)

  return (
    <div className="flex flex-col gap-3 min-h-screen p-8">
      Album id: {albumId}

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
      <CreateSongForm artistId={artistId} albumId={albumId}/>
    </div>
  );
}
