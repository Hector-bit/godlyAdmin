import CreateSingleForm from "@/app/components/forms/CreateSingleForm";


export default async function SingleManagerPage(props: { params: Promise<{id: string}> }) {
  const params = await props.params;
  const artistId = params.id

  // const artistData = await fetchArtistById(artistId)
  // const artistAlbums = await fetchAlbumsByArtistId(artistId)
  // console.log('artist info', artistData, artistAlbums)

  return (
    <div className="flex flex-col gap-3 min-h-screen p-8">
      Single Manager
      {/* <ArtistList/>
      <CreateArtistForm/> */}

      {/* CREATE SINGLE FORM */}
      <CreateSingleForm artistId={artistId}/>
    </div>
  );
}
