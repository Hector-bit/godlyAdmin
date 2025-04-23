import { fetchSongBySongId } from "@/app/actions/songActions";
import { PencilSquareIcon } from "@heroicons/react/16/solid";
import LinkBtn from "@/app/components/buttons/LinkBtn";

export default async function SinglesPage(props: { params: Promise<{id: string, singleId: string}> }) {
  const params = await props.params;
  const artistId = params.id
  const singleId = params.singleId

  const singleData = await fetchSongBySongId(singleId)

  console.log('artist info', singleData)

  return (
    <div className="flex flex-col gap-3 min-h-screen">
      {/* ARTIST INFORMATION  */}
      <div className="flex flex-row justify-between items-center">
        <div>Name: {singleData?.songName}</div>
        <LinkBtn href={`/artists/${artistId}/single-manager/${singleId}/edit`}>
          <div className="flex flex-row p-2 gap-2">
            EDIT <PencilSquareIcon className="w-[20px]"/>
          </div>
        </LinkBtn>
      </div>
      <div>Youtbe Link: {singleData?.youtubeLink}</div>
      <div>Spotify Link: {singleData?.spotifyLink}</div>
      <div>SoundCloud Link: {singleData?.soundCloudLink}</div>
    </div>
  );
}
