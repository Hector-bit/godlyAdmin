import ArtistList from "./components/ArtistList";
import CreateArtistForm from "./components/forms/CreateArtistForm";



export default async function Home() {

  return (
    <div className="flex flex-row justify-between gap-3 min-h-screen p-8">
      <ArtistList/>
      <CreateArtistForm/>
      <form>

      </form>
    </div>
  );
}
