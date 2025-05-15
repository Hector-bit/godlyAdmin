import ArtistList from "./components/ArtistList";
import LinkBtn from "./components/buttons/LinkBtn";
import Link from "next/link";
export default async function Home() {

  return (
    <div className="flex flex-col justify-between gap-3 ">
      <div className="flex flex-col gap-3 sm:flex-row justify-between items-center">
        <div className="font-bold text-lg">Godly Artists</div> 
        <div className="flex flex-row gap-4 w-full sm:w-fit">
          <LinkBtn href={"/artists/artist-manager"}>Create Artist</LinkBtn>
          <LinkBtn href={"/events"}>Events</LinkBtn>
        </div>
      </div>
      <div className="flex flex-col p-3 border border-black rounded-xl">
        <div>Helpful Resources: </div>
        <div>
          <span>Uploading Image Links: </span>
          <Link className="text-cyan-600" href={'/help/uploadImage'}>Imgur Uploads</Link>
        </div>
      </div>
      <ArtistList/>
    </div>
  );
}
