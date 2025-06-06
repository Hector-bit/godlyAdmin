// import { fetchAlbumsByArtistId } from "@/app/actions/albumsActions";
import { fetchArtistById } from "@/app/actions/artistActions";
import { fetchSinglesByArtistId } from "@/app/actions/songActions";
import LinkBtn from "@/app/components/buttons/LinkBtn";
import AlbumCard from "@/app/components/Cards/AlbumCard";
import SingleCard from "@/app/components/Cards/SingleCard";

export default async function ArtistPage(props: { params: Promise<{id: string}> }) {
  const params = await props.params;
  const artistId = params.id

  const artistData = await fetchArtistById(artistId)
  // const artistAlbums = await fetchAlbumsByArtistId(artistId)
  const artistSingles = await fetchSinglesByArtistId(artistId)
  // console.log('artist info', artistData, artistSingles)

  return (
    <div className="flex flex-col gap-3 min-h-screen">
      {/* <InstagramImage postUrl={"https://www.instagram.com/p/C3qq7cLvHTS/media?size=l"}/> */}
      <div className="flex flex-row justify-between items-center">
        <LinkBtn href="/">Back</LinkBtn>
        <div className="font-bold">ARTIST</div>
        <LinkBtn href={`/artists/${artistId}/edit`}>Edit Artist</LinkBtn>
      </div>
      {/* ARTIST INFORMATION  */}
      <div className="flex flex-col border-2 border-black p-2 rounded-xl my-4">
        <div className="font-bold">Artist Information</div>
        <div>Name: {artistData?.name}</div>
        <div>Artist Name: {artistData?.artistName}</div>
        <div>Artist Id: {artistData?._id}</div>
        <div>Artist img link: {artistData?.img?.slice(0,30)}</div>
      </div>
      {/* ARTIST SONGS & ALBUMS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 text-sm">
        {/* ARTIST ALBUMS LIST */}
        <div>
          <div className="flex flex-row items-center justify-between mb-4 gap-5">
            <div className="font-bold">Albums:</div>
            <LinkBtn 
              href={`/artists/${artistId}/album-manager`}
            >
                Create Album
            </LinkBtn>
          </div>
          <div className="flex flex-col gap-4">
            {/* ALBUMS LIST */}
            {artistData?.albums && artistData.albums.map((album) => {
              return (
                <AlbumCard key={album._id} album={album}/>
              )
            })}
          </div>
        </div>
        {/* END OF ARTIST ALBUM LIST */}

        {/* ARTIST SINGLES */}
        <div className="flex flex-col">
          <div className="flex flex-row items-center justify-between mb-4 gap-5">
            <div className="font-bold">Singles:</div>
            <LinkBtn 
              href={`/artists/${artistId}/single-manager`}
            >
              Create Single
            </LinkBtn>
          </div>
          {/* SINGLES LIST */}
          <div className="flex flex-col gap-4">
            {artistSingles && artistSingles.map((song) => {
              return (
                <SingleCard key={song._id} song={song}/>
              )
            })}
          </div>
        </div>
        {/* END OF ARTIST SINGLES  */}
      </div>
    </div>
  );
}
