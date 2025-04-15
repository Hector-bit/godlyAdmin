// import { fetchSongs } from "@/app/actions/songActions";
// import { fetchAlbumByAlbumId } from "@/app/actions/albumsActions";
import LinkBtn from "@/app/components/buttons/LinkBtn";
import CreateArtistForm from "@/app/components/forms/CreateArtistForm";

export default async function AlbumPage(props: { params: Promise<{id:string, albumId: string}> }) {
  // const params = await props.params;
  // const albumId = params.albumId
  // const artistId = params.id

  // const albumInfo = await fetchAlbumByAlbumId(albumId)

  // const artistData = await fetchArtistById(artistId)
  // const artistAlbums = await fetchAlbumsByArtistId(artistId)
  // console.log('songs info', albumInfo, albumId)

  return (
    <div className="flex flex-col gap-3 ">
      <div className="flex flex-row">
        <LinkBtn href="/">Back</LinkBtn>
      </div>
      <CreateArtistForm/>
    </div>
  );
}
