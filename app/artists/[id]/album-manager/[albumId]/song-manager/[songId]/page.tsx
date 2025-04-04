
export default async function SongIdPage(props: { params: Promise<{songId: string}> }) {
  const params = await props.params;
  const songId = params.songId

  // const albumSongs = await fetchSongs(albumId)

  // const artistData = await fetchArtistById(artistId)
  // const artistAlbums = await fetchAlbumsByArtistId(artistId)
  console.log('songs info', songId)

  return (
    <div className="flex flex-col gap-3 min-h-screen p-8">
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
