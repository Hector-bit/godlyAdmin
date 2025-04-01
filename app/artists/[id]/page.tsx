import { fetchAlbumsByArtistId } from "@/app/actions/albumsActions";
import { fetchArtistById } from "@/app/actions/artistActions";
import Link from "next/link";



export default async function ArtistPage(props: { params: Promise<{id: string}> }) {
  const params = await props.params;
  const artistId = params.id

  const artistData = await fetchArtistById(artistId)
  const artistAlbums = await fetchAlbumsByArtistId(artistId)
  console.log('artist info', artistData, artistAlbums)

  return (
    <div className="flex flex-row justify-between gap-3 min-h-screen p-8">
      {/* <ArtistList/>
      <CreateArtistForm/> */}

      {/* ARTIST INFORMATION  */}
      <div>Name: {artistData?.name}</div>

      {/* ARTIST ALBUM */}
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

        {/* ALBUMS LIST */}
        {artistAlbums.map((album:any) => {
          return (
            <div className="border border-black p-4 rounded-xl">
              <div>Album: {album.albumName}</div>
            </div>
          )
        })}
      </div>
      <div>

      {/* ARTIST SINGLES */}
      <div className="flex flex-row items-center mb-4 gap-5">
          <div>Songs:</div>
          <Link 
            href={`/artist${artistId}/album-manage`}
            className="p-2 border border-black bg-cyan-500 text-white font-bold rounded-xl"
          >
              Create Song
          </Link>
        </div>
      </div>
    </div>
  );
}
