import { fetchSongBySongId } from "@/app/actions/songActions";
// import CreateSongForm from "@/app/components/forms/CreateSongForm";

export default async function EditSinglePage(props: { params: Promise<{id: string, singleId: string}> }) {
  const params = await props.params;
  // const artistId = params.id
  const singleId = params.singleId

  const singleData = await fetchSongBySongId(singleId)

  // console.log('artist info', singleData)

  return (
    <div className="flex flex-col gap-3 min-h-screen p-8">
      {/* ARTIST INFORMATION  */}
      <div className="">
        <div>Name: {singleData?.songName}</div>
        {/* <Link className="" href={}>
          <PencilSquareIcon/>
        </Link> */}
      </div>
      <div>Youtbe Link: {singleData?.youtubeLink}</div>
      <div>Spotify Link: {singleData?.spotifyLink}</div>
      <div>SoundCloud Link: {singleData?.soundCloundLink}</div>
      {/* <CreateSongForm artistId={artistId}/> */}
    </div>
  );
}
