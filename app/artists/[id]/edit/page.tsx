import { fetchArtistById } from "@/app/actions/artistActions";
import DeleteArtistBtn from "@/app/components/buttons/DeleteArtistBtn";
import LinkBtn from "@/app/components/buttons/LinkBtn";
import DeleteModel from "@/app/components/DeleteModel";
import UpdateArtistForm from "@/app/components/forms/updateForms/UpdateArtistForm";

export default async function ArtistEditPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const artistId = params.id

  const artistInfo = await fetchArtistById(artistId)

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <LinkBtn href={`/artists/${artistId}`}>Back</LinkBtn>
        <div className="font-bold text-xl">Edit {artistInfo?.name}</div>
        <div></div>
      </div>
      {artistInfo &&
        <UpdateArtistForm artistInfo={artistInfo}/>
      }
      <div className="my-8"/>
      <DeleteModel
        deleteBtn={<DeleteArtistBtn artistId={artistId}/>}
      >
        Delete Artist
      </DeleteModel>
    </div>
  )
}


