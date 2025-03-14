import { fetchArtistById } from "@/app/actions/artistActions";



export default async function ArtistPage(props: { params: Promise<{id: string}> }) {
  const params = await props.params;
  const artistId = params.id

  const artistData = fetchArtistById(artistId)

  return (
    <div className="flex flex-row justify-between gap-3 min-h-screen p-8">
      {/* <ArtistList/>
      <CreateArtistForm/> */}
      <div>ARTIST PAGE</div>
    </div>
  );
}
