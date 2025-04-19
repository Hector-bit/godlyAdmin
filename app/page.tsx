import ArtistList from "./components/ArtistList";
import LinkBtn from "./components/buttons/LinkBtn";


export default async function Home() {

  return (
    <div className="flex flex-col justify-between gap-3 ">
      <div className="flex flex-row justify-between items-center">
        <div className="font-bold text-lg">Godly Artists</div> 
        <div className="flex flex-row gap-4">
          <LinkBtn href={"/artists/artist-manager"}>Create Artist</LinkBtn>
          <LinkBtn href={"/events"}>Events</LinkBtn>
        </div>
      </div>
      <ArtistList/>
    </div>
  );
}
