import { fetchSongBySongId } from "@/app/actions/songActions";
// import CreateSongForm from "@/app/components/forms/CreateSongForm";
import UpdateSinlgeForm from "@/app/components/forms/updateForms/UpdateSingleForm";

export default async function EditSinglePage(props: { params: Promise<{id: string, singleId: string}> }) {
  const params = await props.params;
  const artistId = params.id
  const singleId = params.singleId

  const singleData = await fetchSongBySongId(singleId)

  // console.log('artist info', singleData)

  return (
    <div className="flex flex-col gap-3 min-h-screen">
      {/* ARTIST INFORMATION  */}
      <div className="border-2 border-black rounded-xl p-2">
        <div className="title">Current Song Information</div>
        <div>Name: {singleData?.songName}</div>
        <div>Youtbe Link: {singleData?.youtubeLink}</div>
        <div>Spotify Link: {singleData?.spotifyLink}</div>
        <div>SoundCloud Link: {singleData?.soundCloudLink}</div>
        {/* <Link className="" href={}>
          <PencilSquareIcon/>
        </Link> */}
      </div>
      {/* <CreateSongForm artistId={artistId}/> */}
      <UpdateSinlgeForm artistId={artistId} singleId={singleId}/>
    </div>
  );
}
