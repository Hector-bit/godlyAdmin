import { fetchAlbumsByArtistId } from "@/app/actions/albumsActions";
import { fetchArtistById } from "@/app/actions/artistActions";
import Link from "next/link";
import { PencilSquareIcon } from "@heroicons/react/16/solid";


export default async function TestPage(props: { params: Promise<{id: string}> }) {
  const params = await props.params;
  const artistId = params.id

  // const artistData = await fetchArtistById(artistId)
  // const artistAlbums = await fetchAlbumsByArtistId(artistId)
  // console.log('artist info', artistData, artistAlbums)

  return (
    <div className="flex flex-col gap-3 min-h-screen p-8">
      Test page

    </div>
  );
}
