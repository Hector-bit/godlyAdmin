import DeleteBtn from "@/app/components/buttons/DeleteBtn";
import LinkBtn from "@/app/components/buttons/LinkBtn";


export default async function ArtistEditPage() {
  return (
    <div className="flex flex-col">
      <div>Edit Artist</div>

      <DeleteBtn btnDeleteType="artist">
        Delete Artist
      </DeleteBtn>
    </div>
  )
}


