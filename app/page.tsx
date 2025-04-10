import ArtistList from "./components/ArtistList";
import CreateArtistForm from "./components/forms/CreateArtistForm";
import LinkBtn from "./components/buttons/LinkBtn";


export default async function Home() {

  return (
    <div className="flex flex-col justify-between gap-3 ">
      <div className="flex flex-row justify-between items-center">
        <div>Godly Artists</div> 
        <LinkBtn href={"/artists/artist-manager"}>Create Artist</LinkBtn>
      </div>
      <ArtistList/>
    </div>
  );
}
