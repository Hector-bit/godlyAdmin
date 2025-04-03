import { fetchAlbumsByArtistId } from "@/app/actions/albumsActions";
import { fetchArtistById } from "@/app/actions/artistActions";
import Link from "next/link";
import { PencilSquareIcon } from "@heroicons/react/16/solid";


export default async function ArtistPage(props: { params: Promise<{id: string}> }) {
  const params = await props.params;
  const artistId = params.id

  const artistData = await fetchArtistById(artistId)
  const artistAlbums = await fetchAlbumsByArtistId(artistId)
  console.log('artist info', artistData, artistAlbums)

  return (
    <div className="flex flex-col justify-between gap-3 min-h-screen p-8">
      {/* <ArtistList/>
      <CreateArtistForm/> */}

      {/* ARTIST INFORMATION  */}
      <div>Name: {artistData?.name}</div>
      <div className="grid grid-cols-2">
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

    </div>
  );
}
