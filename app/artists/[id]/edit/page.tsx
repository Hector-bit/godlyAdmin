import DeleteBtn from "@/app/components/buttons/DeleteBtn";
// import LinkBtn from "@/app/components/buttons/LinkBtn";


export default async function ArtistEditPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const artistId = params.id

  return (
    <div className="flex flex-col">
      <div>Edit Artist</div>

      <DeleteBtn btnDeleteType="artist" deleteId={artistId}>
        Delete Artist
      </DeleteBtn>
    </div>
  )
}


