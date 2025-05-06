import { getAlbumByAlbumId } from "@/app/actions/albumsActions";
import DeleteModel from "@/app/components/DeleteModel";
import DeleteAlbumBtn from "@/app/components/buttons/DeleteAlbumBtn";
import EditAlbumForm from "@/app/components/forms/editForm/EditAlbumForm";

export default async function EditAlbumPage(props: { params: Promise<{id:string, albumId: string}> }) {
  const params = await props.params;
  const albumId = params.albumId
  const artistId = params.id

  const albumInfo = await getAlbumByAlbumId(albumId)
  // const albumSongs = await fetchSongs(albumId)

  // const artistData = await fetchArtistById(artistId)
  // const artistAlbums = await fetchAlbumsByArtistId(artistId)
  // console.log('songs info', albumSongs, albumId)

  return (
    albumInfo?
    <div className="flex flex-col gap-3 min-h-screen">
      <div>Edit Album</div>
      <EditAlbumForm albumInfo={albumInfo}/>
      <div className="my-8"/>
      <DeleteModel
        deleteBtn={<DeleteAlbumBtn artistId={artistId} albumId={albumId}/>}
      >
        Delete Album
      </DeleteModel>
    </div>
    :<div>error getting album info</div>
  );
}
