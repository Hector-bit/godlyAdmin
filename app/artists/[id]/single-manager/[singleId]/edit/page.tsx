import { fetchSongBySongId } from "@/app/actions/songActions";
// import EditSingleForm from "@/app/components/forms/editForm/EditSingleForm";
import LinkBtn from "@/app/components/buttons/LinkBtn";
import DeleteSingleBtn from "@/app/components/buttons/DeleteSingleBtn";
import DeleteModel from "@/app/components/DeleteModel";

export default async function EditSinglePage(props: { params: Promise<{id: string, singleId: string}> }) {
  const params = await props.params;
  const artistId = params.id
  const singleId = params.singleId

  const singleData = await fetchSongBySongId(singleId)

  // console.log('artist info', singleData)

  return (
    <div className="flex flex-col gap-3 min-h-screen">
      <div className="flex flex-row justify-between">
        <LinkBtn href={`/artists/${artistId}`}>Back</LinkBtn>
        <div className="text-xl font-bold">Single</div>
        <DeleteModel 
          deleteBtn={<DeleteSingleBtn singleId={singleId} artistId={artistId}/>}
        >
          Delete Single
        </DeleteModel>
        {/* <LinkBtn href={`/artist/${artistId}`}>
          <div className="flex flex-row gap-3">
            <div>Edit Single</div>
            <PencilSquareIcon className="w-[20px] h-[20px]"/>
          </div>
        </LinkBtn> */}
      </div>
      {/* SINGLE INFORMATION  */}
      <div className="border-2 border-black rounded-xl p-2">
        <div className="title">Single Information</div>
        <div>Name: {singleData?.songName}</div>
        <div>Youtbe Link: {singleData?.youtubeLink}</div>
        <div>Spotify Link: {singleData?.spotifyLink}</div>
        <div>SoundCloud Link: {singleData?.soundCloudLink}</div>
        {/* <Link className="" href={}>
          <PencilSquareIcon/>
        </Link> */}
      </div>
      {/* <CreateSongForm artistId={artistId}/> */}
      {/* <EditSingleForm artistId={artistId} singleId={singleId}/> */}
    </div>
  );
}
