import DeleteArtistBtn from "@/app/components/buttons/DeleteArtistBtn";
import DeleteModel from "@/app/components/DeleteModel";


export default async function ArtistEditPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const artistId = params.id

  return (
    <div className="flex flex-col">
      <div>Edit Artist</div>

      <DeleteModel
        deleteBtn={<DeleteArtistBtn artistId={artistId}/>}
      >
        Delete Artist
      </DeleteModel>
    </div>
  )
}


